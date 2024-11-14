import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: { en: '', es: '' },
    subtitle: { en: '', es: '' },
    description: { en: '', es: '' },
    images: ['', ''],
    categories: { en: [''], es: [''] },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('title')) {
      const lang = name.split('-')[1];
      setPostData((prev) => ({
        ...prev,
        title: { ...prev.title, [lang]: value },
      }));
    } else if (name.startsWith('subtitle')) {
      const lang = name.split('-')[1];
      setPostData((prev) => ({
        ...prev,
        subtitle: { ...prev.subtitle, [lang]: value },
      }));
    } else if (name.startsWith('description')) {
      const lang = name.split('-')[1];
      setPostData((prev) => ({
        ...prev,
        description: { ...prev.description, [lang]: value },
      }));
    } else if (name.startsWith('image')) {
      const index = name.split('-')[1];
      const updatedImages = [...postData.images];
      updatedImages[index] = value;

      setPostData((prev) => ({
        ...prev,
        images: updatedImages,
      }));
    } else if (name.startsWith('category')) {
      const lang = name.split('-')[1];
      const index = name.split('-')[2];
      const updatedCategories = [...postData.categories[lang]];
      updatedCategories[index] = value;

      setPostData((prev) => ({
        ...prev,
        categories: { ...prev.categories, [lang]: updatedCategories },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://esmedellin.com/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el post');
      }

      const data = await response.json();
      alert('Post creado exitosamente: ' + data.title.en);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al crear el post:', error);
      alert('Error al crear el post. Intenta de nuevo.');
    }
  };

  return (
    <div>
      <h1>Crear Nuevo Post</h1>
      <form onSubmit={handleSubmit}>
        <h2>Título</h2>
        <div>
          <label>Inglés:</label>
          <input
            type="text"
            name="title-en"
            value={postData.title.en}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Español:</label>
          <input
            type="text"
            name="title-es"
            value={postData.title.es}
            onChange={handleChange}
            required
          />
        </div>

        <h2>Subtítulo</h2>
        <div>
          <label>Inglés:</label>
          <input
            type="text"
            name="subtitle-en"
            value={postData.subtitle.en}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Español:</label>
          <input
            type="text"
            name="subtitle-es"
            value={postData.subtitle.es}
            onChange={handleChange}
            required
          />
        </div>

        <h2>Descripción</h2>
        <div>
          <label>Inglés:</label>
          <textarea
            name="description-en"
            value={postData.description.en}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Español:</label>
          <textarea
            name="description-es"
            value={postData.description.es}
            onChange={handleChange}
            required
          />
        </div>

        <h2>Imágenes</h2>
        <div>
          <label>Imagen 1:</label>
          <input
            type="url"
            name="image-0"
            value={postData.images[0]}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Imagen 2:</label>
          <input
            type="url"
            name="image-1"
            value={postData.images[1]}
            onChange={handleChange}
            required
          />
        </div>

        <h2>Categorías</h2>
        <div>
          <label>Inglés:</label>
          <input
            type="text"
            name="category-en-0"
            value={postData.categories.en[0]}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Español:</label>
          <input
            type="text"
            name="category-es-0"
            value={postData.categories.es[0]}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Crear Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
