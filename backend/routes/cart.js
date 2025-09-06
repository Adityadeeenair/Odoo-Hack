const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Add product to cart
router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [{ productId, quantity }] });
    } else {
      // check if product already exists
      const index = cart.products.findIndex(p => p.productId.toString() === productId);
      if (index > -1) {
        cart.products[index].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("products.productId");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove product from cart
router.delete("/remove/:userId/:productId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.products = cart.products.filter(p => p.productId.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
