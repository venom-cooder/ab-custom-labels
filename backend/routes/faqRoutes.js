const express = require('express');
const router = express.Router();
const FAQ = require('../models/FAQ'); // Ensure backend/models/FAQ.js exists

// GET all FAQs
router.get('/', async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new FAQ (Admin)
router.post('/', async (req, res) => {
  try {
    const newFaq = new FAQ(req.body);
    await newFaq.save();
    res.status(201).json(newFaq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE FAQ
router.delete('/:id', async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;