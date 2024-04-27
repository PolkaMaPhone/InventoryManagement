const Shelf = require('../models/Shelf'); 
const Location = require('../models/Location');
// define sequelize
const sequelize = require('../config/sequelize');

// Get all shelves
exports.getAllShelves = async (req, res) => {
    try {
        const shelves = await Shelf.findAll();
        res.json(shelves);
    } catch (error) {
        res.status(500).json({ message: 'Error getting shelves', error: error.message });
    }
};

// Get a shelf by ID
exports.getShelfById = async (req, res) => {
    try {
        const shelf = await Shelf.findByPk(req.params.id);
        if (shelf) {
            res.json(shelf);
        } else {
            res.status(404).json({ message: 'Shelf not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting shelf', error: error.message });
    }
};

// Create a new shelf
/*
exports.createShelf = async (req, res) => {
    try {
        const newShelf = await Shelf.create(req.body);
        res.json(newShelf);
    } catch (error) {
        res.status(500).json({ message: 'Error creating shelf', error: error.message });
    }
};
*/
exports.createShelf = async (req, res) => {
    let transaction;

    try {
        transaction = await sequelize.transaction(); // Start a transaction

        // Step 1: Create the location first, since shelf_id is not immediately required
        const newLocation = await Location.create({
            tub_id: null, // This can be null initially
            // Do not set shelf_id yet since the shelf doesn't exist
        }, { transaction });

        // Step 2: Create the shelf with the newly created location_id
        const newShelf = await Shelf.create({
            ...req.body,
            location_id: newLocation.location_id // Assign the location ID to the shelf
        }, { transaction });

        // Step 3: Now update the location with the new shelf's ID if necessary
        await Location.update({
            shelf_id: newShelf.shelf_id // Update location with the new shelf_id
        }, {
            where: { location_id: newLocation.location_id },
            transaction
        });

        // Step 4: Re-fetch the updated location to ensure it includes the latest shelf_id
        const updatedLocation = await Location.findByPk(newLocation.location_id, { transaction });

        await transaction.commit(); // Commit the transaction

        res.status(201).json({
            shelf: newShelf,
            location: updatedLocation
        });
    } catch (error) {
        if (transaction) await transaction.rollback(); // Rollback the transaction on error
        console.error('Error creating shelf and location:', error);
        res.status(500).json({ message: 'Error creating shelf and location', error: error.message });
    }
};


// Update a shelf by ID
exports.updateShelfById = async (req, res) => {
    try {
        const updated = await Shelf.update(req.body, { where: { shelf_id: req.params.id } });
        if (updated[0] > 0) {
            res.json({ message: 'Shelf updated' });
        } else {
            res.status(404).json({ message: 'Shelf not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating shelf', error: error.message });
    }
};

// Delete a shelf by ID
exports.deleteShelfById = async (req, res) => {
    try {
        const deleted = await Shelf.destroy({ where: { shelf_id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Shelf deleted' });
        } else {
            res.status(404).json({ message: 'Shelf not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting shelf', error: error.message });
    }
};
// get all tubs on this shelf
exports.getTubsByShelfId = async (req, res) => {
    try {
        const shelf = await Shelf.findByPk(req.params.id, { include: 'tubs' });
        if (shelf) {
            res.json(shelf.tubs);
        } else {
            res.status(404).json({ message: 'Shelf not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting tubs', error: error.message });
    }
};