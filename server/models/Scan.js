const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema(
  {
    userId: String,
    imageUrl: String,
    condition: String,
    confidence: Number,
    severity: String,
    affectedPercentage: Number,
    suggestions: [String],
    products: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scan", scanSchema);