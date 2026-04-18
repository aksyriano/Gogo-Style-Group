const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], // URLs to images
  sizes: [{ type: String }], // e.g. 'S', 'M', 'L'
  colors: [{ type: String }], // e.g. '#000000', 'Black'
  stock: { type: Number, required: true, default: 0 },
  category: { type: String, required: true, default: 'Evening Dresses' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
