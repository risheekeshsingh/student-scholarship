const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  incomeLimit: {
    type: Number,
    required: true
  },
  minMarks: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['General', 'OBC', 'SC', 'ST', 'All']
  },
  state: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  department: {
    type: String,
    required: true,
    default: 'All'
  },
  providerType: {
    type: String,
    default: 'State Government'
  },
  level: {
    type: String,
    default: 'All'
  },
  disabilityRequired: {
    type: Boolean,
    default: false
  },
  applyUrl: {
    type: String,
    required: true,
    default: 'https://scholarships.gov.in/'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Scholarship', scholarshipSchema);
