const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
});

module.exports = mongoose.model("User", userSchema);
