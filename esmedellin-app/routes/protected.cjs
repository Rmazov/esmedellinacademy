const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.cjs');
const router = express.Router();

// Ruta protegida para el perfil
router.get('/perfil', authMiddleware, (req, res) => {
  res.json({ message: 'Bienvenido a tu perfil', user: req.user });
});

// Ruta protegida para el dashboard
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Bienvenido al Dashboard', user: req.user });
});

module.exports = router;
