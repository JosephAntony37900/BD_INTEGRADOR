const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas');

// Rutas para los endpoints CRUD
router.get('/', ventasController.getAllVentas);
router.post('/', ventasController.addVenta);
router.put('/:id', ventasController.updateVenta);
router.delete('/:id', ventasController.deleteVenta);

module.exports = router;
