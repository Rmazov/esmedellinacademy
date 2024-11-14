import React from 'react';
import { Box, Button, Typography, Chip } from '@mui/material';

const CommunityComponent = () => {
  return (
    <Box textAlign="center" sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Find Your Community
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
        <Chip
          label="Mujeres Group"
          sx={{ backgroundColor: '#FFD700', color: '#000', fontWeight: 'bold' }}
        />
        <Chip
          label="Cooking Club"
          sx={{ backgroundColor: '#B0C4DE', color: '#000', fontWeight: 'bold' }}
        />
        <Chip
          label="Hiking"
          sx={{ backgroundColor: '#98FB98', color: '#000', fontWeight: 'bold' }}
        />
        <Chip
          label="Arts & Culture Club"
          sx={{ backgroundColor: '#AFEEEE', color: '#000', fontWeight: 'bold' }}
        />
        <Chip
          label="Writing Club"
          sx={{ backgroundColor: '#FFC0CB', color: '#000', fontWeight: 'bold' }}
        />
        <Chip
          label="Pride Zone"
          sx={{ backgroundColor: '#FFB6C1', color: '#000', fontWeight: 'bold' }}
        />
        <Chip
          label="Women Over 50"
          sx={{ backgroundColor: '#F5DEB3', color: '#000', fontWeight: 'bold' }}
        />
        <Chip
          label="Cycling Club"
          sx={{ backgroundColor: '#DDA0DD', color: '#000', fontWeight: 'bold' }}
        />
      </Box>
      <Button variant="contained" color="primary" sx={{ marginTop: 3 }}>
        Explore All 50+ Communities
      </Button>
    </Box>
  );
};

export default CommunityComponent;
