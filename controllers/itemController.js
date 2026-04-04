const Item = require('../models/Item');

// Get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving items', error: error.message });
  }
};

// Get a single item by its ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error finding item', error: error.message });
  }
};

// Create a new item
const createItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Create new item in memory
    const newItem = new Item({
      name,
      description
    });

    // Save item to the database
    const savedItem = await newItem.save();
    res.status(201).json(savedItem); // 201 indicates "Created"
  } catch (error) {
    res.status(400).json({ message: 'Error creating item', error: error.message });
  }
};

// Update an existing item
const updateItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Find item by ID and update it
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id, 
      { name, description }, 
      { new: true, runValidators: true } // Return updated doc and validate fields
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating item', error: error.message });
  }
};

// Delete an item
const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item removed successfully', item: deletedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};
