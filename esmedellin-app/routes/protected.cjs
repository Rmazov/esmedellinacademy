// routes/protected.cjs
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.cjs');
const router = express.Router();

// Ruta protegida
router.get('/perfil', authMiddleware, (req, res) => {
  res.json({ message: 'Bienvenido a tu perfil', user: req.user });
});

module.exports = router;
