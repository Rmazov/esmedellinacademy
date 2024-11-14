import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useLanguage } from './LanguageContext'; // Asegúrate de tener el contexto de idioma importado

const HeroSection = () => {
  const { selectedLanguage } = useLanguage(); // Obtener el idioma seleccionado del contexto

  // Define el contenido en diferentes idiomas
  const titles = {
    en: "esmedellin",
    es: "esmedellin",
  };

  const subtitles = {
    en: "Discover Medellín, learn Spanish: Experience the paisa spirit.",
    es: "Explora Medellín, aprende español: Vive la esencia paisa.",
  };

  const buttonLabels = {
    en: "Get Started",
    es: "Comenzar",
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '300px', md: '500px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        backgroundImage: 'url(https://esmedellin.com/images/panoramica-medellin.jpeg)', // O usa la imagen local
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1, px: 2 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '3rem' } }}>
          {titles[selectedLanguage]} {/* Usar el idioma seleccionado */}
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontSize: { xs: '1rem', md: '2rem' } }}>
          {subtitles[selectedLanguage]} {/* Usar el idioma seleccionado */}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ backgroundColor: 'darkorange', mt: 2 }}
        >
          {buttonLabels[selectedLanguage]} {/* Usar el idioma seleccionado */}
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
