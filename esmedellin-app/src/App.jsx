import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AppAppbar from './components/AppAppbar';
import Blog from './components/Blog';
import PostList from './components/PostList';


function App() {
  return (
    <Router>
      <AppAppbar /> {/* Agrega el Header aquí */}
      <PostList/>
      <Routes>
        {/* Ruta para el Login */}
        <Route path="/login" element={<Login />} />

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

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Verifica autenticación
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
