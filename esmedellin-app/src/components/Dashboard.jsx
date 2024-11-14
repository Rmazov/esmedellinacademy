import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Dashboard = () => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Datos del nuevo usuario
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    email: '',
    contraseña: ''
  });

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('https://esmedellin.com/api/auth/usuarios');
        if (!response.ok) {
          throw new Error('Error al obtener la lista de usuarios');
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
        setErrorMessage('Error al obtener la lista de usuarios. Intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  // Manejar el cambio de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar la creación de nuevo usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://esmedellin.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el usuario');
      }

      const data = await response.json();
      alert(data.message); // Notificación de éxito
      setNuevoUsuario({ nombre: '', email: '', contraseña: '' }); // Resetear el formulario
      // Refrescar la lista de usuarios
      await fetchUsuarios();
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      setErrorMessage('Error al crear el usuario. Intenta de nuevo.');
    }
  };

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      {loading && <p>Cargando usuarios...</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.email}>{usuario.nombre} - {usuario.email}</li> // Ajusta la propiedad según tu estructura de datos
        ))}
      </ul>

      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={nuevoUsuario.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={nuevoUsuario.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            value={nuevoUsuario.contraseña}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Crear Usuario</button>
      </form>

      {/* Botón para crear un nuevo post */}
      <button onClick={() => navigate('/create-post')}>Crear Nuevo Post</button>
    </div>
  );
};

export default Dashboard;
