const express = require('express');
const router = express.Router();
const Career = require('../models/Career'); // Ensure backend/models/Career.js exists

// GET all Job Listings
router.get('/', async (req, res) => {
  try {
    const jobs = await Career.find().sort({ date: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new Job Listing (Admin)
router.post('/', async (req, res) => {
  try {
    const newJob = new Career(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE Job Listing
router.delete('/:id', async (req, res) => {
  try {
    await Career.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;