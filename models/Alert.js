const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  email: { type: String, required: true },
  scholarshipId: { type: String, required: true },
  scholarshipName: { type: String, required: true },
  deadline: { type: Date, required: true },
  notified: { type: Boolean, default: false }
});

module.exports = mongoose.model('Alert', alertSchema);
