const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET all categories
router.get('/', categoryController.getAllCategories);

// GET a single category by ID
router.get('/:id', categoryController.getCategoryById);

// POST a new category
router.post('/', categoryController.createCategory);

// PUT update an existing category
router.put('/:id', categoryController.updateCategoryById);

// DELETE a category
router.delete('/:id', categoryController.deleteCategoryById);

module.exports = router;
