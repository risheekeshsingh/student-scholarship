const Scholarship = require('../models/Scholarship');

const findScholarships = async (req, res) => {
  try {
    const { income, class10Marks, class12Marks, ugMarks, category, state, department, level, disability } = req.body;

    // Fast fail for missing parameters
    if (income === undefined || !category || !state || !department) {
      return res.status(400).json({ message: 'Please provide income, marks, category, state, and department requirements' });
    }

    // NEW: Allow Case-Insensitive Regex matching. Meaning if user inputs "delhi" or "DeLhI", it matches perfectly!
    const stateRegex = new RegExp(`^${state}$`, 'i');

    // Natively analyze academic history picking exactly their maximally viable qualifying mark
    const effectiveMarks = Math.max(Number(class10Marks || 0), Number(class12Marks || 0), Number(ugMarks || 0));

    const finalQuery = {
      $and: [
        { incomeLimit: { $gte: Number(income) } },
        { minMarks: { $lte: effectiveMarks } },
        { category: { $in: [category, 'All'] } },
        { $or: [{ state: stateRegex }, { state: 'All India' }, { state: 'All' }] },
        { $or: [{ department: department }, { department: 'All' }] }
      ]
    };

    if (level && level !== 'All') {
      finalQuery.$and.push({ $or: [{ level: level }, { level: 'All' }] });
    }

    if (disability === 'No') {
      finalQuery.$and.push({ disabilityRequired: false });
    }

    const scholarships = await Scholarship.find(finalQuery);
    res.json(scholarships);

  } catch (error) {
    res.status(500).json({ message: 'Server error while finding scholarships', error: error.message });
  }
};

module.exports = {
  findScholarships
};
