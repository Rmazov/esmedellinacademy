// PostList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { Box, Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import LanguageSelector from './LanguageSelector';

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
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://esmedellin.com/api/posts'); 
        setPosts(response.data.slice(-2)); 
      } catch (err) {
        setError('Error fetching posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (postId) => {
    // Almacena el idioma en el local storage antes de navegar
    localStorage.setItem('selectedLanguage', selectedLanguage);
    navigate(`/post/${postId}`); 
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={6} key={post._id}>
            <StyledCard onClick={() => handlePostClick(post._id)}>
              <CardMedia
                component="img"
                alt={post.title[selectedLanguage]}
                image={post.images[0]} 
                height="270"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title[selectedLanguage]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.description[selectedLanguage]}
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
