const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const GalleryItem = require('../models/GalleryItem');

// Cloudinary Config
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
router.get('/', async (req, res) => {
  try {
    const { category, subcategory } = req.query;
    let query = {};
    if (category) query.category = category;
    if (subcategory && subcategory !== 'all') query.subcategory = subcategory;
    const items = await GalleryItem.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Add new item (UPDATED)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    // ✅ Extract new fields here
    const { title, category, subcategory, description, material, idealFor } = req.body;
    
    if (!req.file) return res.status(400).json({ message: 'Image required' });

    const newItem = new GalleryItem({
      title,
      category,
      subcategory: subcategory || 'general',
      description,
      material, // ✅ Save Material
      idealFor, // ✅ Save IdealFor
      imageUrl: req.file.path
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Update item (UPDATED)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, category, subcategory, description, material, idealFor } = req.body;
    
    let product = await GalleryItem.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    // Update Text Fields
    product.title = title || product.title;
    product.category = category || product.category;
    product.subcategory = subcategory || product.subcategory;
    product.description = description || product.description;
    
    // ✅ Update New Fields
    product.material = material || product.material;
    product.idealFor = idealFor || product.idealFor;

    // Update Image if new one exists
    if (req.file) {
      product.imageUrl = req.file.path;
    }

    await product.save();
    res.json(product);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await GalleryItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;