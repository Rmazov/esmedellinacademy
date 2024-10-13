import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AppAppbar from './components/AppAppbar';
import PostList from './components/PostList';
import SinglePost from './components/SinglePost'; // Importa el componente SinglePost

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
        
        {/* Ruta para ver un solo post */}
        <Route 
          path="/post/:postId" 
          element={
            <>
              <AppAppbar /> {/* Agrega el Header aquí también si deseas mantenerlo */}
              <SinglePost /> {/* Componente que muestra un solo post */}
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
