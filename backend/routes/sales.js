// backend/routes/sales.js
const express = require("express");
const saleController = require("../controllers/saleController");

const router = express.Router();

router.get("/", saleController.getAllSales);
router.get("/:id", saleController.getSaleById);
router.post("/", saleController.createSale);

module.exports = router;
