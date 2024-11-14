import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';

const Footer = () => {
  // Configura la animación
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={fadeIn}>
      <Box
        sx={{
          position: 'relative',
          height: '200px',
          backgroundImage: 'url(https://esmedellin.com/images/metro1-1-scaled-11.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center',
          
          width: '100%',
          overflow: 'hidden', // Previene el overflow
          margin: 0,
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, maxWidth: '100%' }}>
          Stay Connected with esmedellin.com
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, maxWidth: '100%' }}>
          Master Spanish and English with cultural tips and exclusive tools.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: 'darkorange', mt: 2 }}
        >
          Contact Us
        </Button>
      </Box>
    </animated.div>
  );
};

export default Footer;
