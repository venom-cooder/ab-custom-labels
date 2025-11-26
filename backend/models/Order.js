const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  details: { type: String, required: true },
  type: { type: String, required: true }, // e.g. "Home Request", "Gallery Inquiry"
  qty: { type: String }, 
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);