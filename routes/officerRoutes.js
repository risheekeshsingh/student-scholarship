const express = require('express');
const router = express.Router();
const { findOfficers } = require('../controllers/officerController');

router.post('/find', findOfficers);

module.exports = router;
