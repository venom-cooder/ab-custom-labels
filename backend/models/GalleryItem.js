const mongoose = require('mongoose');

const galleryItemSchema = mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['stickers', 'logos', 'cards', 'labels'] 
  },
  // Specific subcategories for Labels
  subcategory: { 
    type: String, 
    enum: ['circle', 'oval', 'bottle', 'rounded', 'jar', 'general'],
    default: 'general'
  },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }, // URL from Cloudinary
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GalleryItem', galleryItemSchema);