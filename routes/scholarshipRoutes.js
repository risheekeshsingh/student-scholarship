const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');

// POST /api/find - Search eligible scholarships
router.post('/find', scholarshipController.findScholarships);

module.exports = router;
