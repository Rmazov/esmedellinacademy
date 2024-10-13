// SinglePost.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Select, MenuItem, Typography, Box } from '@mui/material';

const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en'); // Lee el idioma desde el local storage

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://esmedellin.com/api/posts/${postId}`);
        setPost(response.data);
      } catch (err) {
        setError('Error fetching post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    localStorage.setItem('selectedLanguage', event.target.value); // Actualiza el local storage al cambiar el idioma
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Select value={selectedLanguage} onChange={handleLanguageChange} variant="outlined">
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Español</MenuItem>
      </Select>

      <Typography variant="h1">{post.title[selectedLanguage]}</Typography>
      <img src={post.images[0]} alt={post.title[selectedLanguage]} />
      <Typography variant="body1">{post.description[selectedLanguage]}</Typography>
    </Box>
  );
};

export default SinglePost;
