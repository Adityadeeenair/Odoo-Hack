const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const fs = require("fs");

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Read JSON file
const productsData = JSON.parse(fs.readFileSync("database.json", "utf-8"));

// Insert products into DB
const importProducts = async () => {
  try {
    await Product.insertMany(productsData);
    console.log("✅ Products imported successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error importing products:", err);
    process.exit(1);
  }
};

importProducts();
