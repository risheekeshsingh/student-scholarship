const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// POST /api/chat - Simple Chatbot logic
router.post('/chat', chatController.handleChat);

module.exports = router;
