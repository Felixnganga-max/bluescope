const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  category: { type: String, required: true },
  subcategory: { type: String, required: false },
  images: [{ type: String }], // Array of image URLs
  price: { type: Number },
  stock: { type: Number, default: 0 },
  dimensions: { type: String },
  material: { type: String },
  customizable: { type: Boolean, default: false },
  turnaround_time: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
