// backend/controllers/saleController.js
const mongoose = require("mongoose");
const Product = require("../models/Product");
const Sale = require("../models/Sale");
const logger = require("../utils/logger");

// Get all sales
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("customer")
      .populate("products.product");
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a sale by ID
exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate("customer")
      .populate("products.product");
    if (!sale) {
      return res.status(404).json({ error: "Sale not found" });
    }
    res.json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new sale
exports.createSale = async (req, res) => {
  const { customer, products, totalAmount } = req.body;

  try {
    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    // Iterate over each product in the sale
    for (let item of products) {
      const { product: productId, quantity } = item;

      // Fetch the product details
      const product = await Product.findById(productId).session(session);

      if (!product) {
        logger.error(`Product not found: ${productId}`);
        await session.abortTransaction();
        return res.status(404).json({ message: "Product not found" });
      }

      // Check if there is enough stock
      if (product.stock < quantity) {
        await session.abortTransaction();
        logger.warn(`Insufficient stock for product: ${product.name}`);
        return res
          .status(400)
          .json({ message: "Insufficient stock for product: " + product.name });
      }

      // Reduce the stock count
      product.stock -= quantity;
      // Update inventory history
      product.inventoryHistory.push({
        quantityChanged: -quantity,
        reason: "Sale",
      });
      await product.save({ session });
    }

    // Create the sale
    const sale = new Sale({ customer, products, totalAmount });
    await sale.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    logger.info(`Sale created successfully: ${sale._id}`);
    res.status(201).json(sale);
  } catch (error) {
    logger.error(`Error creating sale: ${error.message}`, {
      stack: error.stack,
    });
    res.status(500).json({ message: error.message });
  }
};
