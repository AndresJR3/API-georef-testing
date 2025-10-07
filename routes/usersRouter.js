const express = require('express');
const usersService = require('../services/usersServices'); // Convención: clase -> mayúscula

const router = express.Router();
const services = new usersService();

// Obtener todos los usuarios
router.get('/', (req, res) => {
  const users = services.getAll();
  res.json(users);
});

// Obtener usuario por id
router.get('/:id', (req, res) => {
  const user = services.getById(req.params.id);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(user);
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return res.status(400).json({ message: "Datos incompletos o inválidos" });
  }

  try {
    const newUser = services.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un usuario (PATCH parcial)
router.patch('/:id', (req, res) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "Nada que actualizar" });
  }

  try {
    const updated = services.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
  try {
    const result = services.deleteById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
