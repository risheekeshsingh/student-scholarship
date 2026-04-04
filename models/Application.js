const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  scholarshipId: { type: String, required: true },
  documents: { type: Array, default: [] },
  status: { type: String, default: 'Submitted' }, // Submitted, Under Review, Approved, Rejected
  submittedAt: { type: Date, default: Date.now },
  applicationId: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Application', applicationSchema);
