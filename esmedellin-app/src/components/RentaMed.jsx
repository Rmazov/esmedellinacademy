import React, { useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Modal, Box } from '@mui/material';

// Lista de propiedades
const properties = [
  { id: 1, title: "Property 1", image: "https://esmedellin.com/images/esmedellin20.jpg", description: "Beautiful apartment in El Poblado" },
  { id: 2, title: "Property 2", image: "https://esmedellin.com/images/esmedellin.jpg", description: "Spacious house in Laureles" },
  { id: 3, title: "Property 3", image: "https://esmedellin.com/images/esmedellin2.jpg", description: "Modern apartment in Envigado" },
  { id: 4, title: "Property 4", image: "https://esmedellin.com/images/esmedellin3.jpg", description: "Cozy home in Sabaneta" },
  // Agrega más propiedades aquí...
];

const PropertiesPage = () => {
  const [open, setOpen] = useState(false); // Estado para abrir/cerrar el modal
  const [selectedImage, setSelectedImage] = useState(""); // Estado para almacenar la imagen seleccionada

  const handleImageClick = (image) => {
    setSelectedImage(image); // Asignar la imagen seleccionada
    setOpen(true); // Abrir el modal
  };

  const handleClose = () => {
    setOpen(false); // Cerrar el modal
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Properties for Rent in Medellin
      </Typography>
      <Grid container spacing={2}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={property.image}
                alt={property.title}
                onClick={() => handleImageClick(property.image)} // Al hacer clic, abrir el modal
              />
              <CardContent>
                <Typography variant="h6">{property.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {property.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal para mostrar la imagen en grande */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '800px',
            backgroundColor: 'white',
            boxShadow: 24,
            p: 4,
            textAlign: 'center'
          }}
        >
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
          <button onClick={handleClose} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
            Close
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default PropertiesPage;
