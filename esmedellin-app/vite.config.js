import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Permite que Vite acepte conexiones externas
    port: 5173        // Define el puerto, puede ser el que prefieras
  }
});
