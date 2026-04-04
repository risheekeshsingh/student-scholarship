const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Define API routes and link them to the controller functions
router.get('/', itemController.getItems);         // Get all items
router.post('/', itemController.createItem);      // Create a new item
router.get('/:id', itemController.getItemById);   // Get one item
router.put('/:id', itemController.updateItem);    // Update an item
router.delete('/:id', itemController.deleteItem); // Delete an item

module.exports = router;
