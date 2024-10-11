// server.cjs
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.cjs'); // Asegúrate de que este archivo existe
const cors = require('cors'); // Asegúrate de instalarlo si lo usas
// const protectedRoutes = require('./routes/protectedRoutes.cjs'); // Si tienes rutas protegidas, importa aquí

dotenv.config();

const app = express();
app.use(express.json()); // Para parsear JSON
app.use(cors()); // Permitir solicitudes de diferentes orígenes

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar a MongoDB', err));

// Importar rutas
app.use('/api/auth', authRoutes); // Asegúrate de que este es el correcto

// Si tienes rutas protegidas, las agregarías aquí
// app.use('/api/protected', protectedRoutes);

// Middleware de manejo de errores (opcional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
