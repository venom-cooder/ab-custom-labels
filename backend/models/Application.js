const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true }, // e.g., "Social Media Manager"
  cvLink: { type: String, required: true }, // Google Drive/Linktree URL
  whyJoin: { type: String }, // Short text
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);