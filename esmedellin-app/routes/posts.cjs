// routes/posts.cjs
const express = require('express');
const router = express.Router();

// Obtener publicaciones
router.get('/', (req, res) => {
  res.send('Obteniendo publicaciones');
});

module.exports = router;
