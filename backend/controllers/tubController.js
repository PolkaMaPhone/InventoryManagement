const Tub = require('../models/Tub');
const Location = require('../models/Location');
const sequelize = require('../config/sequelize');

// Get all tubs
exports.getAllTubs = async (req, res) => {
    try {
        const tubs = await Tub.findAll();
        res.json(tubs);
    } catch (error) {
        res.status(500).json({ message: 'Error getting tubs', error: error.message });
    }
};

// Get a tub by ID
exports.getTubById = async (req, res) => {
    try {
        const tub = await Tub.findByPk(req.params.id);
        if (tub) {
            res.json(tub);
        } else {
            res.status(404).json({ message: 'Tub not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting tub', error: error.message });
    }
};

// Create a new tub
exports.createTub = async (req, res) => {
    const { label, shelf_id } = req.body;
    let transaction;

    try {
        transaction = await sequelize.transaction(); // Start a transaction

        const { shelf_id } = req.body;

        if (!shelf_id || !label) {
            return res.status(400).json({ message: "Shelf ID and Label must be provided" });
        }

        // Step 1: Create the tub
        const newTub = await Tub.create({
            label: req.body.label, // Assuming label is sent in request
            shelf_id: req.body.shelf_id
        }, { transaction });

        // Step 2: Check if a location with this shelf_id and tub_id combination already exists
        let location = await Location.findOne({
            where: { shelf_id, tub_id: newTub.tub_id },
            transaction
        });

        // Step 3: If no location exists, create a new one
        if (!location) {
            location = await Location.create({
                tub_id: newTub.tub_id,
                shelf_id
            }, { transaction });
        }
        // step 4: update the tub with the location_id
        const updatedTub = await Tub.update({
            location_id: location.location_id
        }, {
            where: { tub_id: newTub.tub_id },
            transaction
        });

        // Step 5: Re-Fetch the updated tub to ensure tub includes the latest location_id
        const updatedTubWithLocation = await Tub.findByPk(newTub.tub_id, { transaction });

        await transaction.commit(); // Commit the transaction

        res.status(201).json({
            tub: updatedTubWithLocation,
            location: location
        });
    } catch (error) {
        if (transaction) await transaction.rollback(); // Rollback the transaction on error
        console.error('Error creating tub and checking/creating location:', error);
        res.status(500).json({ message: 'Error creating tub and location', error: error.message });
    }
};

// Update a tub by ID
exports.updateTubById = async (req, res) => {
    try {
        const updated = await Tub.update(req.body, { where: { tub_id: req.params.id } });
        if (updated[0] > 0) {
            res.json({ message: 'Tub updated' });
        } else {
            res.status(404).json({ message: 'Tub not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating tub', error: error.message });
    }
};

// Delete a tub by ID
exports.deleteTubById = async (req, res) => {
    try {
        const deleted = await Tub.destroy({ where: { tub_id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Tub deleted' });
        } else {
            res.status(404).json({ message: 'Tub not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tub', error: error.message });
    }
};

// Get all items in tub by location
exports.getItemsInTub = async (req, res) => {
    try {
        const tub = await Tub.findByPk(req.params.id, { include: 'items' });
        if (tub) {
            res.json(tub.items);
        } else {
            res.status(404).json({ message: 'Tub not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting items in tub', error: error.message });
    }
};

// move tub to a new location based on shelf_id
exports.moveTub = async (req, res) => {
    try {
        const updated = await Tub.update(req.body, { where: { tub_id: req.params.id } });
        if (updated[0] > 0) {
            res.json({ message: 'Tub moved' });
        } else {
            res.status(404).json({ message: 'Tub not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error moving tub', error: error.message });
    }
};