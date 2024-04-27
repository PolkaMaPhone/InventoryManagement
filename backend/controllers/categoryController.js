const Category = require('../models/Category');  // Ensure you have a Category model defined

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            res.json(category);
        } else {
            res.status(404).send('Category not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Example controller function for creating a category
exports.createCategory = async (req, res) => {
    try {
        console.log(req.body); // Log the incoming request body
        const { name, description } = req.body;
        const newCategory = await Category.create({ name, description });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error(error); // Log the error
        res.status(400).json({ message: 'Error processing request', error: error.message });
    }
};


// Update a category by ID
exports.updateCategoryById = async (req, res) => {
    try {
        const updated = await Category.update(req.body, { where: { category_id: req.params.id } });
        if (updated[0] > 0) {
            res.json({ message: 'Category updated' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error: error.message });
    }
};

// Delete a category by ID
exports.deleteCategoryById = async (req, res) => {
    try {
        const deleted = await Category.destroy({ where: { category_id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Category deleted' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};
