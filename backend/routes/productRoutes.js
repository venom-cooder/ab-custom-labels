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
    console.error("GET Error:", err);
    res.status(500).json({ message: err.message });
  }
});

// POST: Add new item (UPDATED)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, category, subcategory, description, material, idealFor } = req.body;
    
    if (!req.file) {
      console.error("POST Error: No Image Uploaded");
      return res.status(400).json({ message: 'Image required' });
    }

    const newItem = new GalleryItem({
      title,
      category,
      subcategory: subcategory || 'general',
      description,
      material: material || '', // ✅ Safe default
      idealFor: idealFor || '', // ✅ Safe default
      imageUrl: req.file.path
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error("POST Error (Check Model Schema):", err.message); // ✅ Logs exact error
    res.status(400).json({ message: err.message });
  }
});

// PUT: Update item (UPDATED)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, category, subcategory, description, material, idealFor } = req.body;
    
    let product = await GalleryItem.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    // Update Fields
    product.title = title || product.title;
    product.category = category || product.category;
    product.subcategory = subcategory || product.subcategory;
    product.description = description || product.description;
    product.material = material || product.material; // ✅ Update
    product.idealFor = idealFor || product.idealFor; // ✅ Update

    // Update Image if new one exists
    if (req.file) {
      product.imageUrl = req.file.path;
    }

    await product.save();
    res.json(product);

  } catch (err) {
    console.error("PUT Error:", err.message);
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