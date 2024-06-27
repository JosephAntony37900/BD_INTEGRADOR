const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas');

// Rutas para los endpoints CRUD
router.get('/', ventasController.getAllVentas);
router.post('/', ventasController.addVenta);


module.exports = router;
