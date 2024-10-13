const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    es: { type: String, required: true }
  },
  subtitle: {
    en: { type: String, required: true },
    es: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    es: { type: String, required: true }
  },
  images: [{ // Cambiado a un arreglo para múltiples imágenes
    type: String,
    required: true
  }],
  categories: {
    en: [{ type: String, required: true }],
    es: [{ type: String, required: true }]
  }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
