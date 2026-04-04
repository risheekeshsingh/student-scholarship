const Alert = require('../models/Alert');

exports.subscribeAlert = async (req, res) => {
  try {
    const { email, scholarshipId, scholarshipName, deadline } = req.body;
    
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const existingAlert = await Alert.findOne({ email, scholarshipId });
    if (existingAlert) {
      return res.status(400).json({ error: 'You are already subscribed to alerts for this scholarship.' });
    }

    const newAlert = new Alert({
      email,
      scholarshipId,
      scholarshipName,
      deadline
    });

    await newAlert.save();
    res.status(201).json({ message: 'Successfully subscribed to deadline alerts!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};
