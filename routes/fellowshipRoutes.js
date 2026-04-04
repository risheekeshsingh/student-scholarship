const express = require('express');
const router = express.Router();
const { getAllFellowships } = require('../controllers/fellowshipController');

router.get('/', getAllFellowships);

module.exports = router;
