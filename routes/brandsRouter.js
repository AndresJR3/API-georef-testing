const express = require("express");
const BrandsService = require("../services/brandsService");

const router = express.Router();
const services = new BrandsService();

// Obtener todas las marcas
router.get("/", (req, res) => {
  const brands = services.getAll();
  return res.status(200).json(brands);
});

// Obtener marca por id
router.get("/:id", (req, res) => {
  const brand = services.getById(req.params.id);
  if (!brand) return res.status(404).json({ message: "Brand not found" });
  return res.json(brand);
});

// Crear una nueva marca
router.post("/", (req, res) => {
  const newBrand = services.create(req.body);
  return res.status(201).json(newBrand);
});

// Actualizar una marca
router.patch("/:id", (req, res) => {
  try {
    const updated = services.update(req.params.id, req.body);
    return res.json(updated);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

// Eliminar una marca
router.delete("/:id", (req, res) => {
  try {
    const result = services.delete(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

module.exports = router;
