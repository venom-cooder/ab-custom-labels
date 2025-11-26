const mongoose = require('mongoose');

const careerSchema = mongoose.Schema({
  title: { type: String, required: true }, // e.g. "Graphic Designer"
  location: { type: String, required: true }, // e.g. "Katni / Remote"
  description: { type: String, required: true }, // Full job details
  isOpen: { type: Boolean, default: true }, // Is the job still active?
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Career', careerSchema);