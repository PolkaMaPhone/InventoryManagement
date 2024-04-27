const express = require('express');
const shelfController = require('../controllers/shelfController');
const { assignNewLocationToShelf } = require('../controllers/shelfController');


const router = express.Router();

router.get('/', shelfController.getAllShelves);
router.get('/:id', shelfController.getShelfById);
router.post('/', shelfController.createShelf);
router.put('/:id', shelfController.updateShelfById);
router.delete('/:id', shelfController.deleteShelfById);
// get all tubs on this shelf
router.get('/:id/tubs', shelfController.getTubsByShelfId);

module.exports = router;