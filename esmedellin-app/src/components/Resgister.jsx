import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      alert('Usuario registrado exitosamente');
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Nombre de usuario" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default Register;
