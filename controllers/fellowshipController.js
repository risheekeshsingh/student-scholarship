const Fellowship = require('../models/Fellowship');

const getAllFellowships = async (req, res) => {
  try {
    const fellowships = await Fellowship.find();
    res.json(fellowships);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving fellowships', error: error.message });
  }
};

module.exports = { getAllFellowships };
