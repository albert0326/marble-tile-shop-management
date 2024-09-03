// backend/controllers/productController.js
const Product = require("../models/Product");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const {
      search,
      sort,
      type,
      size,
      color,
      category,
      minPrice,
      maxPrice,
      minStock,
      maxStock,
      page = 1,
      limit = 10,
    } = req.query;

    // Building the filter object
    let filter = {};

    // Adding search functionality
    if (search) {
      filter.name = { $regex: search, $options: "i" }; // Case-insensitive search on the name field
    }

    // Adding filtering functionality
    if (type) filter.type = type;
    if (size) filter.size = size;
    if (color) filter.color = color;
    if (category) filter.category = category;
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    if (minStock) filter.stock = { ...filter.stock, $gte: Number(minStock) };
    if (maxStock) filter.stock = { ...filter.stock, $lte: Number(maxStock) };

    // Adding sorting functionality
    let sortOption = {};
    if (sort) {
      const [field, order] = sort.split(":");
      sortOption[field] = order === "desc" ? -1 : 1;
    } else {
      sortOption.createdAt = -1; // Default sort by creation date descending
    }

    // Pagination setup
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;

    // Fetching products with filter, sort, and pagination
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize)
      .populate("category");

    // Get total count for pagination
    const totalCount = await Product.countDocuments(filter);

    // Sending response with products and pagination data
    res.status(200).json({
      products,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: pageNumber,
      totalProducts: totalCount,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
