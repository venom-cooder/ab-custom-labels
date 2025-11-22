const mongoose = require('mongoose');

const supportSchema = mongoose.Schema({
  type: { type: String, required: true }, // 'Feedback' or 'Help'
  name: { type: String },
  contact: { type: String },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Support', supportSchema);