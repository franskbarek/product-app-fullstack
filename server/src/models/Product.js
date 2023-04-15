const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, reqired: true, unique: true },
    desc: { type: String },
    price: { type: Number, required: true },
    img: { type: String },
    categories: { type: String },
    color: { type: String },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
