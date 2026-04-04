const mongoose = require('mongoose');

const fellowshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  provider: { type: String, required: true },
  providerType: { type: String, required: true, default: 'Government' },
  category: { type: String, required: true },
  degreeLevel: { type: String, required: true },
  stipend: { type: String, required: true },
  applyUrl: { type: String, required: true }
});

module.exports = mongoose.model('Fellowship', fellowshipSchema);
