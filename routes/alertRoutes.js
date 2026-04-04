const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');

router.post('/subscribe', alertController.subscribeAlert);

module.exports = router;
