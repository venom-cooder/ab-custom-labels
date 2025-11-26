const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  cvLink: { type: String, required: true },
  whyJoin: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);