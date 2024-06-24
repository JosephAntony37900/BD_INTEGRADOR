const express = require('express');
const router = express.Router();
const comprobantesController = require('../controllers/Comprobantes');

router.get('/', comprobantesController.getAllComprobantes);
router.post('/', comprobantesController.addComprobante);
router.put('/:id', comprobantesController.updateComprobante);
router.delete('/:id', comprobantesController.deleteComprobante);

module.exports = router;
