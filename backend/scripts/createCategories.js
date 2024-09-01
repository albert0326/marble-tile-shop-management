// scripts/createCategories.js

const mongoose = require("mongoose");
const Category = require("../models/Category");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createCategories = async () => {
  try {
    await Category.insertMany([
      { name: "Bathroom Tile", description: "Tiles suitable for bathroom use" },
      { name: "Floor Tile", description: "Tiles designed for flooring" },
      {
        name: "Elevation Tile",
        description: "Tiles used for building elevation",
      },
      { name: "Kitchen Tile", description: "Tiles designed for kitchen use" },
      {
        name: "Other Tile",
        description: "Tiles designed for others like God Photos, etc",
      },
      // Add more categories as needed
    ]);

    console.log("Categories created successfully!");
  } catch (error) {
    console.error("Error creating categories:", error);
  } finally {
    mongoose.connection.close();
  }
};

createCategories();
