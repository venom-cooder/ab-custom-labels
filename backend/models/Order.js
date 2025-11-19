const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  details: { type: String, required: true }, // Description or Custom Changes
  type: { type: String, required: true }, // "Sticker", "Logo", "Home Inquiry"
  qty: { type: Number }, // Optional
  status: { type: String, default: 'Pending' }, // Pending, Completed
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);