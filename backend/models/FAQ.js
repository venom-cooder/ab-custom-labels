const mongoose = require('mongoose');

const faqSchema = mongoose.Schema({
  question: { type: String, required: true }, // e.g. "Do you ship pan-India?"
  answer: { type: String, required: true },   // e.g. "Yes, via premium couriers."
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FAQ', faqSchema);