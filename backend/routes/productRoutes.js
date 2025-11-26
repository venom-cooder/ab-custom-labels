const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const GalleryItem = require('../models/GalleryItem');

// Cloudinary Setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ab-custom-labels',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});
const upload = multer({ storage: storage });

// GET: Fetch filtered items
// Example: /api/products?category=stickers
router.get('/', async (req, res) => {
  try {
    const { category, subcategory } = req.query;
    let query = {};

    // ✅ STRICT BACKEND FILTERING
    // If a category is requested (e.g. 'stickers'), only return those items.
    if (category) query.category = category;
    
    // If a subcategory is requested (and isn't 'all'), filter by that too.
    if (subcategory && subcategory !== 'all') query.subcategory = subcategory;

    const items = await GalleryItem.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Add new item (Admin Upload)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, category, subcategory, description } = req.body;
    
    if (!req.file) return res.status(400).json({ message: 'Image required' });

    const newItem = new GalleryItem({
      title,
      category,
      subcategory: subcategory || 'general',
      description,
      imageUrl: req.file.path
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Remove item
router.delete('/:id', async (req, res) => {
  try {
    await GalleryItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;