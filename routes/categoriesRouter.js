const express = require("express");
const categoriesService = require("../services/categoriesServices");

const router = express.Router();
const service = new categoriesService();

// Obtener todas las categorías
router.get("/", (req, res) => {
  const categories = service.getAll();
  res.status(200).json(categories);
});

// Obtener categoría por ID
router.get("/:id", (req, res) => {
  const category = service.getById(req.params.id);
  if (!category) return res.status(404).json({ message: "Categoría no encontrada" });
  res.json(category);
});

// Crear nueva categoría
router.post("/", (req, res) => {
  const { categoryName, description, active } = req.body;
  if (!categoryName || description === undefined || active === undefined) {
    return res.status(400).json({ message: "Datos incompletos o inválidos" });
  }

  const newCategory = service.create(req.body);
  res.status(201).json(newCategory);
});

// Actualizar categoría por ID (PATCH parcial)
router.patch("/:id", (req, res) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "Nada que actualizar" });
  }

  try {
    const updated = service.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Eliminar categoría por ID
router.delete("/:id", (req, res) => {
  try {
    const result = service.deleteById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
