const express = require('express');
const router = express.Router();
const { getAllInstitutions } = require('../controllers/institutionController');

router.get('/', getAllInstitutions);

module.exports = router;
