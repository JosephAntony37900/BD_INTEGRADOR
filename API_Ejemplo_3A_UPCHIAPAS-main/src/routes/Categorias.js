const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/Categorias');

router.get('/', categoriasController.getAllCategorias);
router.post('/', categoriasController.addCategoria);
router.put('/:id', categoriasController.updateCategoria);
router.delete('/:id', categoriasController.deleteCategoria);

module.exports = router;
