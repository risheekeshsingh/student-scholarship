const Officer = require('../models/Officer');

const findOfficers = async (req, res) => {
  try {
    const { ministry, scheme, state, district, zone } = req.body;
    
    // Dynamic Querying matching empty filters perfectly.
    let query = {};
    if (ministry && ministry !== 'Choose your option') query.ministry = new RegExp(`^${ministry}$`, 'i');
    if (scheme && scheme !== 'Choose your option') query.scheme = new RegExp(`^${scheme}$`, 'i');
    if (state && state !== 'Choose your option') query.state = new RegExp(`^${state}$`, 'i');
    if (district && district !== 'Choose your option') query.district = new RegExp(`^${district}$`, 'i');
    if (zone && zone !== 'Choose your option') query.zone = new RegExp(`^${zone}$`, 'i');

    const officers = await Officer.find(query);
    res.json(officers);

  } catch (error) {
    res.status(500).json({ message: 'Error retrieving officers', error: error.message });
  }
};

module.exports = { findOfficers };
