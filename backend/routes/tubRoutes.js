const express = require('express');
const tubController = require('../controllers/tubController');

const router = express.Router();

router.get('/', tubController.getAllTubs);
router.get('/:id', tubController.getTubById);
router.post('/', tubController.createTub);
router.put('/:id', tubController.updateTubById);
router.delete('/:id', tubController.deleteTubById);
router.get('/tubItems/:id', tubController.getItemsInTub)
router.put('/moveTub/:id', tubController.moveTub)

module.exports = router;