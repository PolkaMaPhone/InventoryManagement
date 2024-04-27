const Group = require('../models/Group');

// Get all groups
exports.getAllGroups = async (req, res) => {
    try {
        const groups = await Group.findAll();
        res.json(groups);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Get a group by ID
exports.getGroupById = async (req, res) => {
    try {
        const group = await Group.getGroupById(req.params.id);
        if (group) {
            res.json(group);
        } else {
            res.status(404).send('Group not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Create a new group
exports.createGroup = async (req, res) => {
    try {
        const newGroup = await Group.create(req.body);
        res.status(201).json(newGroup);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error processing request', error: error.message });
    }
};

// Update a group by ID
exports.updateGroupById = async (req, res) => {
    try {
        const updated = await Group.update(req.body, { where: { group_id: req.params.id } });
        if (updated[0] > 0) {
            res.json({ message: 'Group updated' });
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating group', error: error.message });
    }
};

// Delete a group by ID
exports.deleteGroupById = async (req, res) => {
    try {
        const deleted = await Group.destroy({ where: { group_id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Group deleted' });
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting group', error: error.message });
    }
};