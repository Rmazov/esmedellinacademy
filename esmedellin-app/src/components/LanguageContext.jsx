import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const LanguageContext = createContext();

// Proveedor del contexto
export const LanguageProvider = ({ children }) => {
  // Cargar el idioma del localStorage, o establecer 'en' como valor por defecto
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage ? savedLanguage : 'en';
  });

  // Guardar el idioma en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('language', selectedLanguage);
  }, [selectedLanguage]);

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para usar el contexto
export const useLanguage = () => {
  return useContext(LanguageContext);
};
