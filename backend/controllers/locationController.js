const Location = require('../models/Location'); // This should be your Sequelize model

// Get all locations
exports.getAllLocations = async (req, res) => {
    try {
        const locations = await Location.findAll();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Error getting locations', error: error.message });
    }
};

// Get a location by ID
exports.getLocationById = async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (location) {
            res.json(location);
        } else {
            res.status(404).json({ message: 'Location not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting location', error: error.message });
    }
};

// Create a new location
exports.createLocation = async (req, res) => {
    try {
        const newLocation = await Location.create(req.body);
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(400).json({ message: 'Error creating location', error: error.message });
    }
};

// Update a location
exports.updateLocationById = async (req, res) => {
    try {
        const updated = await Location.update(req.body, { where: { location_id: req.params.id } });
        if (updated[0] > 0) {
            res.json({ message: 'Location updated' });
        } else {
            res.status(404).json({ message: 'Location not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating location', error: error.message });
    }
};

// Delete a location
exports.deleteLocationById = async (req, res) => {
    try {
        const deleted = await Location.destroy({ where: { location_id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Location deleted' });
        } else {
            res.status(404).json({ message: 'Location not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting location', error: error.message });
    }
};
// get all items at this location
exports.getItemsAtLocation = async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (location) {
            const items = await location.getItems();
            res.json(items);
        } else {
            res.status(404).json({ message: 'Location not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting items', error: error.message });
    }
};
// get all tubs at this location
exports.getTubsAtLocation = async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (location) {
            const tubs = await location.getTubs();
            res.json(tubs);
        } else {
            res.status(404).json({ message: 'Location not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting tubs', error: error.message });
    }
};
// get all shelves at this location
exports.getShelvesAtLocation = async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (location) {
            const shelves = await location.getShelves();
            res.json(shelves);
        } else {
            res.status(404).json({ message: 'Location not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting shelves', error: error.message });
    }
};

// check for new locations by looking at tubs and shelves. Any unique combination of tub_id and shelf_id that doesn't exist in the locations table should be returned as a list of new locations.
/*
exports.getNewLocations = async (req, res) => {
    try {
        const newLocations = await sequelize.query(`
            SELECT s.shelf_id, t.tub_id
            FROM shelves s
            CROSS JOIN tubs t
            LEFT JOIN locations l ON l.shelf_id = s.shelf_id AND l.tub_id = t.tub_id
            WHERE l.location_id IS NULL
        `, {
            type: sequelize.QueryTypes.SELECT
        });

        if (newLocations.length > 0) {
            res.json(newLocations);
        } else {
            res.json({ message: 'No new locations detected. Everything is up to date!' });
        }
    } catch (error) {
        console.error('Error getting new locations:', error);
        res.status(500).json({ message: 'Error getting new locations', error: error.message });
    }
};
*/