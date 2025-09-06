const express = require("express");
const router = express.Router();
const Purchase = require("../models/Purchase");

// Add a new purchase
router.post("/add", async (req, res) => {
  const { userId, products, totalAmount } = req.body;
  try {
    const purchase = new Purchase({ userId, products, totalAmount });
    await purchase.save();
    res.json({ message: "Purchase recorded!", purchase });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's previous purchases
router.get("/:userId", async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.params.userId }).populate("products.productId");
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
