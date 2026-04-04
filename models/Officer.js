const mongoose = require('mongoose');

const officerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  ministry: { type: String, required: true },
  scheme: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  zone: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true }
});

module.exports = mongoose.model('Officer', officerSchema);
