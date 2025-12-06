const mongoose = require('mongoose');

const galleryItemSchema = mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true, 
    // ✅ FIX 1: Added 'posters' and 'banners' to the allowed list
    enum: ['stickers', 'logos', 'cards', 'labels', 'posters', 'banners'] 
  },
  subcategory: { 
    type: String, 
    // ✅ FIX 2: Removed 'enum' restriction. 
    // This allows you to save 'outdoor', 'event', 'standee' etc. without errors.
    default: 'general'
  },
  description: { 
    type: String, 
    required: true 
  },
  imageUrl: { 
    type: String, 
    required: true 
  }, 
  // ✅ FIX 3: Added fields to match your Admin.jsx inputs
  material: { 
    type: String, 
    default: '' 
  },
  idealFor: { 
    type: String, 
    default: '' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('GalleryItem', galleryItemSchema);