import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AppAppbar from './components/AppAppbar';
import PostList from './components/PostList';
import SinglePost from './components/SinglePost'; 
import CreatePost from './components/CreatePost'; 
import MainBanner from './components/MainBanner';
import { LanguageProvider } from './components/LanguageContext'; 
import ImageGallery from './components/ImageGallery';
import Footer from './components/Footer';
import Flipcard from './components/Flipcard';
import AboutUs from './components/AboutUs';
import Testspeech from './components/Testspeech';
import RentaMed from './components/RentaMed';
import CommunitySelector from './components/CommunitySelector';



const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <AppAppbar /> {/* Mueve el AppAppbar aquí para que aparezca en todas las páginas */}

        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route 
            path="/" 
            element={
              <>
                <MainBanner /> {/* Solo aparecerá en la página principal */}
                <CommunitySelector />
                <AboutUs />
                
                <RentaMed/>
                <Flipcard />
                
              </>
            } 
          />
          
          <Route path="/:slug" element={<SinglePost />} /> {/* Cambiado aquí */}

          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/create-post" 
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            } 
          />
        </Routes>

         {/* Footer al final para que se muestre en todas las páginas */}
      </Router>
    </LanguageProvider>
  );
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('token'); 
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
