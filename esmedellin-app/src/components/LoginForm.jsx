// components/LoginForm.jsx
import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reiniciar el error

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, contraseña }),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const data = await response.json();
      console.log('Token:', data.token);
      // Aquí puedes guardar el token en el almacenamiento local o en el estado de la aplicación
      localStorage.setItem('token', data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;
