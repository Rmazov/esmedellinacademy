import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  margin: '16px',
  height: '100%',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://esmedellin.com/api/posts'); // Ajusta la URL según tu configuración
        // Solo toma los últimos 2 posts
        setPosts(response.data.slice(-2)); // Usa slice para obtener solo los últimos 2
      } catch (err) {
        setError('Error fetching posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={6} key={post._id}>
            <StyledCard>
              <CardMedia
                component="img"
                alt={post.title.en}
                image={post.images[0]} // Asumimos que tomas la primera imagen del array
                height="270"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title.en}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.description.en}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PostList;
