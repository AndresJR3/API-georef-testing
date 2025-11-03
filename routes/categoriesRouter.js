const express = require("express");
const CategoriesService = require("../services/categoriesServices");
const ProductsService = require("../services/productsService");

const router = express.Router();
const service = new CategoriesService();
const productsService = new ProductsService();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints para gestionar categorías
 */

// Obtener todas las categorías
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categories]
 *     responses:
 *       '200':
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   categoryName:
 *                     type: string
 *                   description:
 *                     type: string
 *                   active:
 *                     type: boolean
 */
router.get("/", async (req, res) => {
  const categories = await service.getAll();
  res.status(200).json(categories);
});

// Obtener categoría por ID
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtener una categoría por su ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Categoría encontrada
 *       '404':
 *         description: Categoría no encontrada
 */
router.get("/:id", async (req, res) => {
  const category = await service.getById(req.params.id);
  if (!category) return res.status(404).json({ message: "Categoría no encontrada" });
  res.json(category);
});

// Crear nueva categoría
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Categoría creada exitosamente
 *       '400':
 *         description: Datos incompletos o inválidos
 */
router.post("/", async (req, res) => {
  const { categoryName, description, active } = req.body;
  if (!categoryName || description === undefined || active === undefined) {
    return res.status(400).json({ message: "Datos incompletos o inválidos" });
  }
  const newCategory = await service.create(req.body);
  res.status(201).json(newCategory);
});

// Actualizar categoría (PATCH parcial)
/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Actualizar una categoría existente
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Categoría actualizada
 *       '400':
 *         description: Nada que actualizar
 *       '404':
 *         description: Categoría no encontrada
 */
router.patch("/:id", async (req, res) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "Nada que actualizar" });
  }
  try {
    const updated = await service.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Eliminar categoría por ID (validando relación con productos)
/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Eliminar una categoría (solo si no tiene productos asociados)
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Categoría eliminada
 *       '400':
 *         description: No se puede eliminar, hay productos asociados
 *       '404':
 *         description: Categoría no encontrada
 */
router.delete("/:id", async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id, 10);
    const products = await productsService.getAll();
    const linkedProducts = products.filter(p => p.categoryId === categoryId);

    if (linkedProducts.length > 0) {
      return res.status(400).json({
        message: "No se puede eliminar la categoría, hay productos asociados.",
      });
    }

    const result = await service.deleteById(categoryId);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
