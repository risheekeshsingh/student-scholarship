const Application = require('../models/Application');
const crypto = require('crypto');

// Submit a new application
exports.submitApplication = async (req, res) => {
  try {
    const { name, email, phone, scholarshipId, documents } = req.body;
    
    // Generate a unique application ID
    const applicationId = 'APP-' + crypto.randomBytes(4).toString('hex').toUpperCase();

    const application = new Application({
      name,
      email,
      phone,
      scholarshipId,
      documents,
      applicationId
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully', applicationId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit application: ' + error.message });
  }
};

// Check application status securely
exports.checkStatus = async (req, res) => {
  try {
    const { applicationId, email } = req.body;
    
    const application = await Application.findOne({ applicationId, email });
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found. Please verify your Application ID and Email.' });
    }
    
    res.json({
      applicationId: application.applicationId,
      name: application.name,
      scholarshipId: application.scholarshipId,
      status: application.status,
      submittedAt: application.submittedAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching application status' });
  }
};
