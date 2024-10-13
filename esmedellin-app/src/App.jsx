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
      <Routes>
        {/* Ruta para el Login (solo muestra Login) */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta pública para el Home (donde se muestra AppAppbar y PostList) */}
        <Route 
          path="/" 
          element={
            <>
              <AppAppbar /> {/* Agrega el Header aquí */}
              <PostList /> {/* Aquí puedes incluir lo que desees mostrar */}
            </>
          } 
        />
        
        {/* Ruta protegida para el Dashboard */}
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
  const isAuthenticated = sessionStorage.getItem('token'); // Verifica autenticación
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
