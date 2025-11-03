const express = require("express");
const BrandsService = require("../services/brandsService");
const ProductsService = require("../services/productsService");

const router = express.Router();
const services = new BrandsService();

//anadimos la relación de productos con las marcas
const productsService = new ProductsService();

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Endpoints para gestionar marcas
 */

// Obtener todas las marcas
/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Obtener todas las marcas
 *     tags: [Brands]
 *     responses:
 *       '200':
 *         description: Lista de marcas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   brandName:
 *                     type: string
 *                   description:
 *                     type: string
 *                   active:
 *                     type: boolean
 */
router.get("/", async (req, res) => {
  const brands = await services.getAll();
  res.status(200).json(brands);
});

// Obtener marca por id
/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Obtener una marca por su ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la marca
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Marca encontrada
 *       '404':
 *         description: Marca no encontrada
 */
router.get("/:id", async (req, res) => {
  const brand = await services.getById(req.params.id);
  if (!brand) return res.status(404).json({ message: "Marca no encontrada" });
  res.json(brand);
});

// Crear una nueva marca
/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Crear una nueva marca
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Marca creada exitosamente
 */
router.post("/", async (req, res) => {
  const newBrand = await services.create(req.body);
  res.status(201).json(newBrand);
});

// Actualizar una marca
/**
 * @swagger
 * /brands/{id}:
 *   patch:
 *     summary: Actualizar una marca existente
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Marca actualizada
 *       '404':
 *         description: Marca no encontrada
 */
router.patch("/:id", async (req, res) => {
  try {
    const updated = await services.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Eliminar una marca (validando que no tenga productos asociados)
/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Eliminar una marca (solo si no tiene productos asociados)
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Marca eliminada
 *       '400':
 *         description: No se puede eliminar, hay productos asociados
 *       '404':
 *         description: Marca no encontrada
 */
router.delete("/:id", async (req, res) => {
  try {
    const brandId = parseInt(req.params.id, 10);
    const products = await productsService.getAll();
    const linkedProducts = products.filter(p => p.brandId === brandId);

    if (linkedProducts.length > 0) {
      return res.status(400).json({
        message: "No se puede eliminar la marca, hay productos asociados.",
      });
    }

    const result = await services.delete(brandId);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
