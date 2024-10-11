const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
});

// Método para encriptar la contraseña antes de guardar
UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  this.contraseña = await bcrypt.hash(this.contraseña, 10);
  next();
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
