import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Grid, Typography, IconButton } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';

const CreatePostForm = () => {
  const [postData, setPostData] = useState({
    title: { en: '', es: '' },
    subtitle: { en: '', es: '' },
    description: { en: [''], es: [''] }, // Comenzamos con una descripción por idioma
    images: [''], // Comenzamos con un campo de imagen vacío
    categories: { en: '', es: '' }
  });

  // Maneja el cambio de valores en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, lang, index] = name.split('-');

    if (section === 'description') {
      setPostData((prevState) => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [lang]: prevState[section][lang].map((desc, i) =>
            i === parseInt(index) ? value : desc
          )
        }
      }));
    } else if (section === 'title' || section === 'subtitle' || section === 'categories') {
      setPostData((prevState) => ({
        ...prevState,
        [section]: { ...prevState[section], [lang]: value }
      }));
    } else if (section === 'images') {
      const imageIndex = parseInt(lang); // El índice de las imágenes está en `lang`
      setPostData((prevState) => ({
        ...prevState,
        [section]: prevState[section].map((img, i) => (i === imageIndex ? value : img))
      }));
    }
  };

  // Añadir una nueva descripción
  const addDescriptionField = (lang) => {
    setPostData((prevState) => ({
      ...prevState,
      description: {
        ...prevState.description,
        [lang]: [...prevState.description[lang], '']
      }
    }));
  };

  // Eliminar una descripción
  const removeDescriptionField = (lang, index) => {
    setPostData((prevState) => ({
      ...prevState,
      description: {
        ...prevState.description,
        [lang]: prevState.description[lang].filter((_, i) => i !== index)
      }
    }));
  };

  // Añadir una nueva imagen
  const addImageField = () => {
    setPostData((prevState) => ({
      ...prevState,
      images: [...prevState.images, '']
    }));
  };

  // Eliminar una imagen
  const removeImageField = (index) => {
    setPostData((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index)
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://esmedellin.com/api/posts', postData); // Ajusta la URL según tu configuración
      alert('Post creado exitosamente!');
    } catch (error) {
      console.error('Error creando el post', error);
      alert('Hubo un error al crear el post.');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography variant="h4" gutterBottom>Crea un nuevo post</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Campos de Título */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Título (Inglés)"
              name="title-en"
              value={postData.title.en}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Título (Español)"
              name="title-es"
              value={postData.title.es}
              onChange={handleChange}
            />
          </Grid>

          {/* Campos de Subtítulo */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Subtítulo (Inglés)"
              name="subtitle-en"
              value={postData.subtitle.en}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Subtítulo (Español)"
              name="subtitle-es"
              value={postData.subtitle.es}
              onChange={handleChange}
            />
          </Grid>

          {/* Campos dinámicos para las descripciones */}
          <Grid item xs={12}>
            <Typography variant="h6">Descripciones</Typography>
          </Grid>
          {postData.description.en.map((desc, index) => (
            <React.Fragment key={index}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={`Descripción ${index + 1} (Inglés)`}
                  name={`description-en-${index}`}
                  value={desc}
                  onChange={handleChange}
                />
                <IconButton onClick={() => removeDescriptionField('en', index)} aria-label="remove description">
                  <RemoveCircle />
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={`Descripción ${index + 1} (Español)`}
                  name={`description-es-${index}`}
                  value={postData.description.es[index]}
                  onChange={handleChange}
                />
                <IconButton onClick={() => removeDescriptionField('es', index)} aria-label="remove description">
                  <RemoveCircle />
                </IconButton>
              </Grid>
            </React.Fragment>
          ))}

          {/* Botones para añadir descripciones */}
          <Grid item xs={12}>
            <Button variant="outlined" color="primary" onClick={() => addDescriptionField('en')}>
              Añadir Descripción (Inglés)
              <AddCircle sx={{ ml: 1 }} />
            </Button>
            <Button variant="outlined" color="primary" onClick={() => addDescriptionField('es')}>
              Añadir Descripción (Español)
              <AddCircle sx={{ ml: 1 }} />
            </Button>
          </Grid>

          {/* Campos dinámicos para las imágenes */}
          <Grid item xs={12}>
            <Typography variant="h6">Imágenes</Typography>
          </Grid>
          {postData.images.map((image, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                fullWidth
                label={`URL de la Imagen ${index + 1}`}
                name={`images-${index}`}
                value={image}
                onChange={handleChange}
              />
              <IconButton onClick={() => removeImageField(index)} aria-label="remove image">
                <RemoveCircle />
              </IconButton>
            </Grid>
          ))}

          {/* Botón para añadir una nueva imagen */}
          <Grid item xs={12}>
            <Button variant="outlined" color="primary" onClick={addImageField}>
              Añadir Imagen
              <AddCircle sx={{ ml: 1 }} />
            </Button>
          </Grid>

          {/* Campos de Categorías */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Categorías (Inglés)"
              name="categories-en"
              value={postData.categories.en}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Categorías (Español)"
              name="categories-es"
              value={postData.categories.es}
              onChange={handleChange}
            />
          </Grid>

          {/* Botón de envío */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Crear Post
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreatePostForm;
