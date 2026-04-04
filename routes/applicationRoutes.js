const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.post('/submit', applicationController.submitApplication);
router.post('/status', applicationController.checkStatus);

module.exports = router;
