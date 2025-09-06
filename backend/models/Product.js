const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: "placeholder.jpg" }, // placeholder image
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // seller
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
