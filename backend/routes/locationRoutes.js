const express = require('express');
const locationController = require('../controllers/locationController');

const router = express.Router();

router.get('/', locationController.getAllLocations);
router.get('/:id', locationController.getLocationById);
router.post('/', locationController.createLocation);
router.put('/:id', locationController.updateLocationById);
router.delete('/:id', locationController.deleteLocationById);
// add a route to get all items at a location
router.get('/:id/items', locationController.getItemsAtLocation);
// add a route to get all tubs at a location
router.get('/:id/tubs', locationController.getTubsAtLocation);
// add a route to get all shelves at a location
router.get('/:id/shelves', locationController.getShelvesAtLocation);
// add a route to check for new locations
//router.get('/new', locationController.getNewLocations);

module.exports = router;
