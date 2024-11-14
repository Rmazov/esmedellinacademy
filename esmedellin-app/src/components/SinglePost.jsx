import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Divider } from '@mui/material';
import { useLanguage } from './LanguageContext'; // Import your language context

const SinglePost = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const { selectedLanguage } = useLanguage(); // Get the selected language from context
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://esmedellin.com/api/posts/slug/${slug}`); // Use 'slug' here
        if (response.data) {
          setPost(response.data);
        } else {
          setError('Post not found.');
        }
      } catch (err) {
        setError(`Error fetching post: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPost();
  }, [slug]); // Watch for changes to 'slug'

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Check if post data is valid before rendering
  if (!post) {
    return <div>No post found.</div>;
  }

  return (
    <Box 
      sx={{ 
        maxWidth: '800px',
        margin: '0 auto', 
        padding: 4, 
        backgroundColor: '#f9f9f9', 
        borderRadius: '10px', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        marginTop: '80px',
      }}
    >
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 2, color: '#333' }}
      >
        {post.title[selectedLanguage]}
      </Typography>

      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom 
        sx={{ fontWeight: 'medium', textAlign: 'center', marginBottom: 3, color: '#666' }}
      >
        {post.subtitle[selectedLanguage]}
      </Typography>

      <Divider sx={{ marginBottom: 3 }} />

      <Box
        component="img"
        src={post.images[0] || ''}
        alt={post.title[selectedLanguage]}
        sx={{ width: '100%', borderRadius: '8px', marginBottom: 3, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
      />

      <Divider sx={{ marginBottom: 3 }} />

      <Typography 
        variant="body1" 
        sx={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: 2, color: '#444' }}
      >
        {post.description[selectedLanguage]}
      </Typography>
      <Box
        component="img"
        src={post.images[1] || ''}
        alt={post.title[selectedLanguage]}
        sx={{ width: '100%', borderRadius: '8px', marginBottom: 3, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
      />
      <Typography 
        variant="body1" 
        sx={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: 2, color: '#444' }}
      >
        {post.description2[selectedLanguage]}
      </Typography>

      <Divider sx={{ marginTop: 4 }} />
    </Box>
  );
};

export default SinglePost;
