const Item = require('../models/Item'); // This should be your Sequelize model

// Get all items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error getting items', error: error.message });
    }
};

//get all items including their category names
exports.getItemsWithCategory = async (req, res) => {
    try {
        const items = await Item.findAll({
            include: 'category'
        });
        //if any items in the list are not categorized, add some defaults
        const updatedItems = items.map(item => {
            const updatedItem = {
                ...item.toJSON(),
                category: item.category || { category_id: 0, name: "Uncategorized", description: "This item has no category defined." },
                group: item.group || { group_id: 0, name: "Ungrouped", description: "This item has no group defined." },
                location: item.location || { location_id: 0, name: "Unlocated", description: "This item has no location defined." }
            };
            return updatedItem;
        });
        res.json(updatedItems);
    } catch (error) {
        res.status(500).json({ message: 'Error getting items', error: error.message });
    }
};
// Get a single item with it's category by ID
exports.getItemWithCategory = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id, {
            include: 'category'
        });
        if (item) {
            if (item.category_id === null) {
                const updatedItem = {
                    ...item.toJSON(),
                    category: { category_id: 0, name: "Uncategorized", description: "This item has no category defined." },
                };
                // if group_id is null then update the group_id to 0
                if (updatedItem.group_id === null) {
                    updatedItem.group_id = 0;
                }
                // if the location_id is null then update the location_id to 0
                if (updatedItem.location_id === null) {
                    updatedItem.location_id = 0;
                }
                res.json(updatedItem);
            } else {
                res.json(item);
            }
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting item', error: error.message });
    }
}


// Get an item by ID
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting item', error: error.message });
    }
};

// Create a new item
exports.createItem = async (req, res) => {
    try {
        const newItem = await Item.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: 'Error creating item', error: error.message });
    }
};

// Update an item
exports.updateItem = async (req, res) => {
    try {
        const updated = await Item.update(req.body, { where: { item_id: req.params.id } });
        if (updated[0] > 0) {
            res.json({ message: 'Item updated' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error: error.message });
    }
};

// Delete an item
exports.deleteItem = async (req, res) => {
    try {
        const deleted = await Item.destroy({ where: { item_id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Item deleted' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error: error.message });
    }
};

// Move an item to a location
exports.moveItem = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (item) {
            item.location_id = req.body.location_id;
            await item.save();
            res.json({ message: 'Item moved', newLocation: item.location_id });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error moving item', error: error.message });
    }
};