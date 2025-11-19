const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Neon Skull"
  category: { type: String, required: true }, // "stickers", "logos", "labels"
  image: { type: String, required: true }, // URL from Cloudinary
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);