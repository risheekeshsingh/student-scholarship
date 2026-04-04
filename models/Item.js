const mongoose = require('mongoose');

// Define a simple schema for an Item
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: 'No description provided'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the Item model to use elsewhere
module.exports = mongoose.model('Item', itemSchema);
