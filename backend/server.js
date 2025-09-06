// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Routes
const authRoute = require("./routes/auth");
const productRoute = require("./routes/products");
const cartRoute = require("./routes/cart");

dotenv.config();

const app = express();

// Middleware
app.use(cors());               // Cross-origin requests allow
app.use(express.json());       // Parse JSON bodies

// Routes
app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
