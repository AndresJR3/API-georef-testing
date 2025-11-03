const express = require('express');
const productsService = require('../services/productsService');

const router = express.Router();
const services = new productsService();

router.get('/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const products = await services.getAll();
  const filtered = products.filter(p => p.categoryId === parseInt(categoryId, 10));

  if (!filtered.length) {
    return res.status(404).json({ message: "No se encontraron productos para esta categoría" });
  }

  res.json(filtered);
});

router.get('/brand/:brandId', async (req, res) => {
  const { brandId } = req.params;
  const products = await services.getAll();
  const filtered = products.filter(p => p.brandId === parseInt(brandId, 10));

  if (!filtered.length) {
    return res.status(404).json({ message: "No se encontraron productos para esta marca" });
  }

  res.json(filtered);
});

// Obtener todos los productos
/**
* @swagger
* /products:
*   get:
*     summary: Obtener todos los productos en una lista
*     responses:
*       '200':
*         description: Lista de productos
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                   image:
*                     type: string
*                   productName:
*                     type: string
*                   description:
*                     type: string
*                   price:
*                     type: number
*                   stock:
*                     type: integer
*                   categoryId:
*                     type: integer
*                   brandId:
*                     type: integer
*/
router.get('/', async (req, res) => {
  const products = await services.getAll();
  res.json(products);
});

// Obtener producto por id
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Detalles del producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 image:
 *                   type: string
 *                 productName:
 *                   type: string
 *                 price:
 *                   type: number
 *                 description:
 *                   type: string
 *                 stock:
 *                   type: integer
 *                 categoryId:
 *                   type: integer
 *                 brandId:
 *                   type: integer
*/
router.get('/:id', async (req, res, next) => {
  try{
    const product = await services.getById(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch(error){
    next(error);
  }
});

// Crear un nuevo producto
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *               brandId:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Producto creado exitosamente
*/
router.post('/', async (req, res) => {
  const newProduct = await services.create(req.body);
  res.status(201).json(newProduct);
});

// Actualizar un producto
/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Actualizar un producto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *               brandId:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Producto actualizado exitosamente
 */
router.patch('/:id', async (req, res) => {
  try {
    const updated = await services.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Eliminar un producto
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Producto eliminado exitosamente
 */
router.delete('/:id', async (req, res) => {
  try {
    const result = await services.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
