const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Add a product (For Admin)
// @route   POST /api/products
router.post('/', async (req, res) => {
  const { title, category, image } = req.body;
  
  try {
    const newProduct = new Product({ title, category, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;