const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.cjs'); // Rutas de autenticación
const postRoutes = require('./routes/postRoutes.cjs'); // Rutas de posts
const protectedRoutes = require('./routes/protected.cjs'); // Rutas protegidas
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar a MongoDB', err));

// Importar rutas
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api/posts', postRoutes); // Rutas de posts
app.use('/api/protected', protectedRoutes); // Rutas protegidas

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
