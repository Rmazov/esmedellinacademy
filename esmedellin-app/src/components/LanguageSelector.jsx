import React, { useState } from 'react';
import { FormControl, Select, MenuItem, ListItemIcon } from '@mui/material';
import { useLanguage } from './LanguageContext';

const LanguageSelector = () => {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const [open, setOpen] = useState(false); // Estado para controlar el hover

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <FormControl
      fullWidth
      variant="standard"
     
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Select
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        value={selectedLanguage}
        onChange={handleLanguageChange}
        displayEmpty
        renderValue={() => (
          <ListItemIcon>
            {selectedLanguage === 'en' ? (
              <img src="https://flagcdn.com/gb.svg" alt="English" width="25" />
            ) : (
              <img src="https://flagcdn.com/es.svg" alt="Spanish" width="25" />
            )}
          </ListItemIcon>
        )}
        sx={{
          '& .MuiSelect-select': { paddingLeft: '8px' },
        }}
      >
        <MenuItem value="en">
          <ListItemIcon>
            <img src="https://flagcdn.com/gb.svg" alt="English" width="25" />
          </ListItemIcon>
        </MenuItem>
        <MenuItem value="es">
          <ListItemIcon>
            <img src="https://flagcdn.com/es.svg" alt="Spanish" width="25" />
          </ListItemIcon>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
