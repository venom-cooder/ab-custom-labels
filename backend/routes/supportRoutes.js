const express = require('express');
const router = express.Router();
const Support = require('../models/Support'); // Ensure this model exists

// POST support request
router.post('/', async (req, res) => {
  try {
    const newSupport = new Support(req.body);
    await newSupport.save();
    res.status(201).json({ message: 'Support request saved' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;