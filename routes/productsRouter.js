const express = require('express');
const productsService = require('../services/productsService');

const router = express.Router();
const services = new productsService();

// Obtener productos por categoría
router.get('/category/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const filtered = services.getAll().filter(p => p.categoryId === parseInt(categoryId, 10));
  res.json(filtered);
});

// Obtener productos por marca
router.get('/brand/:brandId', (req, res) => {
  const { brandId } = req.params;
  const filtered = services.getAll().filter(p => p.brandId === parseInt(brandId, 10));
  res.json(filtered);
});

// Obtener todos los productos
router.get('/', (req, res) => {
  const products = services.getAll();
  res.json(products);
});

// Obtener producto por id
router.get('/:id', (req, res) => {
  const product = services.getById(req.params.id);
  if (!product) return res.status(404).json({ message: "Producto no encontrado" });
  res.json(product);
});

// Crear un nuevo producto
router.post('/', (req, res) => {
  const newProduct = services.create(req.body);
  res.status(201).json(newProduct);
});

// Actualizar un producto
router.patch('/:id', (req, res) => {
  try {
    const updated = services.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Eliminar un producto
router.delete('/:id', (req, res) => {
  try {
    const result = services.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
