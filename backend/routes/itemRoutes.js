const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Route to fetch all items
router.get('/', itemController.getAllItems);

// Route to fetch all items with their category names
router.get('/withCategory', itemController.getItemsWithCategory);

// Route to fetch a single item by its ID
router.get('/:id', itemController.getItemById);

// Route to create a new item
router.post('/', itemController.createItem);

// Route to update an existing item by its ID
//router.put('/:id', itemController.updateItem);

// Route to delete an item by its ID
router.delete('/:id', itemController.deleteItem);

// Move item to a new location
router.put('/:id/move', itemController.moveItem);

module.exports = router;
