const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// GET all applications (For Admin)
router.get('/', async (req, res) => {
  try {
    const apps = await Application.find().sort({ date: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new application (From Career Page)
router.post('/', async (req, res) => {
  const { name, email, role, cvLink, whyJoin } = req.body;
  try {
    const newApp = new Application({ name, email, role, cvLink, whyJoin });
    await newApp.save();
    res.status(201).json(newApp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE application
router.delete('/:id', async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;