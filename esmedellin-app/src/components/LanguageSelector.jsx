// LanguageSelector.js
import React from 'react';
import { Select, MenuItem } from '@mui/material';

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <Select value={selectedLanguage} onChange={onLanguageChange} variant="outlined">
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="es">Español</MenuItem>
    </Select>
  );
};

export default LanguageSelector;
