import React from 'react';
import { Box, Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const blogData = [
  {
    img: 'https://picsum.photos/800/450?random=1',
    title: 'Exploring the New Features of React',
    description: 'A deep dive into the latest features of React and how they can improve your development experience.',
    date: 'October 10, 2023',
  },
  {
    img: 'https://picsum.photos/800/450?random=2',
    title: 'Understanding JavaScript Closures',
    description: 'A comprehensive guide to closures in JavaScript and their practical uses.',
    date: 'September 20, 2023',
  },
  // Agrega más artículos según sea necesario
];

const StyledCard = styled(Card)(({ theme }) => ({
  // Ajustamos el ancho máximo y otros estilos
  width: '100%', // Para que ocupe el 100% del contenedor
  margin: '16px',
  height: '100%',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const Blog = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {blogData.map((post, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <StyledCard>
              <CardMedia
                component="img"
                alt={post.title}
                image={post.img}
                height="270"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {post.date}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Blog;
