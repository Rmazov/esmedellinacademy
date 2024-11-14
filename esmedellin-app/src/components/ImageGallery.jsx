import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const images = [
  { src: 'https://esmedellin.com/images/metro-gratis-elecciones-2023.jpg', title: 'Metro Gratis Elecciones 2023' },
  { src: 'https://esmedellin.com/images/metro1.jpg', title: 'Metro de Medellín' },
  { src: 'https://esmedellin.com/images/guayacanes.jpg', title: 'Guayacanes en Flor' },
  
];

// Efecto de fade-in al aparecer
const StyledCard = styled(Card)(({ theme }) => ({
  opacity: 0,
  transform: 'translateY(20px)',
  animation: 'fadeIn 1s forwards ease-in-out',
  '@keyframes fadeIn': {
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const ImageGallery = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard>
              <CardMedia
                component="img"
                image={image.src}
                alt={`Image ${index + 1}`}
                sx={{ height: 250 }} // Ajusta la altura de las imágenes
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  {image.title}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageGallery;
