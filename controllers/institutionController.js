const Institution = require('../models/Institution');

const getAllInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find().sort({ nirfRanking: 1 });
    res.json(institutions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving institutions', error: error.message });
  }
};

module.exports = { getAllInstitutions };
