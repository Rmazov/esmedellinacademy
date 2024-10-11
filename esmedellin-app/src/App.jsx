import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import SpeechRecognition from './components/SpeechRecognition';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [count, setCount] = useState(0);
  const [flaskMessage, setFlaskMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un token en localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Actualizar el estado de autenticación

    const fetchFlaskMessage = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Network response was not ok');
        }
        const data = await response.json();
        setFlaskMessage(data.message);
        setErrorMessage('');
      } catch (error) {
        console.error('Error fetching data from Flask:', error);
        setErrorMessage('Error al conectar con Flask');
        setFlaskMessage('');
      } finally {
        setLoading(false);
      }
    };

    fetchFlaskMessage();
  }, []);

  const renderMainContent = () => (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <div className="speech-recognition">
        <h2>Voice Recognition Section</h2>
        <SpeechRecognition />
      </div>

      {loading && <p>Cargando...</p>}
      {flaskMessage && <h1>{flaskMessage}</h1>}
      {errorMessage && (
        <h1 style={{ color: 'red' }}>{errorMessage}</h1>
      )}
    </>
  );

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Ruta para el Login */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        {/* Ruta principal que muestra la interfaz */}
        <Route path="/" element={renderMainContent()} />

        {/* Ruta protegida para el dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard /> {/* Aquí se muestra el contenido del componente Dashboard */}
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
