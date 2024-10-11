// routes/auth.cjs
const express = require('express');
const Usuario = require('../models/Usuario.cjs'); // Importar el modelo de usuario
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Asegúrate de tener este paquete instalado
const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;

    // Validar entrada
    if (!nombre || !email || !contraseña) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Verifica si el usuario ya existe
    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      contraseña
    });

    await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    // Validar entrada
    if (!email || !contraseña) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const esContraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esContraseñaValida) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar un token
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
});
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, '-contraseña'); // Excluir la contraseña de la respuesta
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la lista de usuarios', error });
  }
});

module.exports = router;
