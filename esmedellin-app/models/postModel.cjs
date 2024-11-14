const mongoose = require('mongoose');
const slugify = require('slugify'); // Importar slugify

const postSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    es: { type: String, required: true }
  },
  slug: {
    type: String,
    unique: true, // Asegúrate de que sea único
    required: true
  },
  subtitle: {
    en: { type: String, required: true },
    es: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    es: { type: String, required: true }
  },
  description2: {
    en: { type: String, required: true },
    es: { type: String, required: true }
  },
  images: [{ 
    type: String,
    required: true
  }],
  categories: {
    en: [{ type: String, required: true }],
    es: [{ type: String, required: true }]
  }
}, { timestamps: true });

// Middleware para generar el slug automáticamente antes de guardar
postSchema.pre('validate', function(next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title.en, { lower: true, strict: true });
  }
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
