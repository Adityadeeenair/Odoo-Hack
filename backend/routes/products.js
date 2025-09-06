const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Create new product
router.post("/add", async (req, res) => {
  const { title, description, category, price, image, userId } = req.body;
  const product = new Product({ title, description, category, price, image, userId });
  await product.save();
  res.json({ message: "Product added!", product });
});

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get product by id
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// Get products by category
router.get("/category/:cat", async (req, res) => {
  const products = await Product.find({ category: req.params.cat });
  res.json(products);
});

// Get products by category
router.get("/category/:cat", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.cat });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
router.put("/edit/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json({ message: "Product updated!", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product
router.delete("/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
