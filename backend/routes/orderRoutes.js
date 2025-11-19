const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @desc    Get all orders (For Admin)
// @route   GET /api/orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 }); // Newest first
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Create a new order (From Home/Gallery Forms)
// @route   POST /api/orders
router.post('/', async (req, res) => {
  const { name, contact, details, type, qty } = req.body;

  try {
    const newOrder = new Order({
      name,
      contact,
      details,
      type,
      qty
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @desc    Delete an order
// @route   DELETE /api/orders/:id
router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;