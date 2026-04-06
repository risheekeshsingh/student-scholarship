const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema({
  // Core identity
  name:             { type: String, required: true },
  nirfRanking:      { type: Number, index: true },
  rank:             { type: Number },           // alias kept for compat

  // Location
  location:         { type: String },           // city / display label (kept for compat)
  state:            { type: String, index: true },

  // Institution classification
  instituteType:    { type: String, index: true }, // IIT | NIT | IIM | Deemed University …

  // Academics
  departments:      [{ type: String }],
  courses:          [{ type: String }],         // B.Tech, MBA, Ph.D …
  degrees:          [{ type: String }],         // kept for compat

  // Fees
  annualFee:        { type: Number },           // INR per year (numeric)
  averageFee:       { type: String },           // formatted string kept for compat
  feeAmount:        { type: Number },           // kept for compat
  fees: {
    min:            { type: Number },
    max:            { type: Number },
    currency:       { type: String, default: 'INR' }
  },

  // Placement
  placementRate:    { type: Number },           // 0-100 numeric
  placementPercentage: { type: Number },        // kept for compat

  // External links
  websiteUrl:       { type: String },

  // Rankings / stats
  statistics: {
    world:  { type: Number },
    asia:   { type: Number },
    india:  { type: Number },
    state:  { type: Number }
  },

  // Source metadata
  dataSource:       { type: String, default: 'NIRF 2024-25' }
}, { timestamps: true });

module.exports = mongoose.model('Institution', institutionSchema);
