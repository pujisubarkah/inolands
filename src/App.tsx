import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css'; // Ensure TailwindCSS is imported
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Beranda from './pages/Beranda';
import LayananInovasi from './pages/Layananinovasi';
import CariInovasi from './pages/Cariinovasi';
import Referensi from './pages/Referensi';
import Pengetahuan from './pages/Pengetahuan';
import Berita from './components/Berita';
import NewsDetail from './components/NewsDetail';
import InovasiDetail from './components/InovasiDetail';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin'; // Import Admin page
import LoadingSpinner from './components/LoadingSpinner';
import Register from './components/Register'; // Import Register component
import Login from './components/Login'; // Import LoginModal component
import { UserProvider } from './context/UserContext';
import Chatbot from './components/Chatbot';
import { supabase } from './supabaseClient'; // Import supabase client
import Pdflist from './pengetahuan/pdflist';
import PdfDetail from './pengetahuan/pdflistdetail';

const App = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null); // User authentication state
  const [isRegister, setIsRegister] = useState(false); // State to toggle between Login and Register
  const [userRole, setUserRole] = useState(null); // Store the user's role

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Check if the user is authenticated
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);

        // Fetch user role (assuming role is stored in a 'users' table, adjust based on your setup)
        const { data, error } = await supabase
          .from('users')
          .select('role_id')
          .eq('id', user.id)
          .single(); // Fetch the role of the user

        if (data) {
          setUserRole(data.role_id);
        }
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Handle login and register toggle
  const handleToggleForm = () => {
    setIsRegister(!isRegister); // Toggle between Login and Register
  };

  return (
    <UserProvider>
      <Router>
        {/* Navbar yang tetap terlihat saat discroll */}
        <div className="sticky top-0 z-50">
          <Navbar user={user} />
        </div>

        <main>
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/layanan" element={<LayananInovasi />} />
            <Route path="/cari" element={<CariInovasi />} />
            <Route path="/referensi" element={<Referensi />} />
            <Route path="/pengetahuan" element={<Pengetahuan />} />
            <Route path="/berita" element={<Berita />} />
            <Route path="/berita/:id" element={<NewsDetail />} />
            <Route path="/inovasi/:id" element={<InovasiDetail />} />
            <Route path="/direktori" element={<Pdflist />} />
            <Route path="/direktori/:id" element={<PdfDetail />} />

            {/* Conditional Route Redirection based on user role */}
            <Route 
              path="/dashboard" 
              element={userRole === 1 ? <Dashboard /> : <Navigate to="/" replace />} 
            />
            {/* Admin page route */}
            <Route 
              path="/admin" 
              element={userRole === 1 ? <Admin /> : <Navigate to="/" replace />}
            />
            <Route 
              path="/beranda" 
              element={userRole === 2 ? <Beranda /> : <Navigate to="/" replace />} 
            />
          </Routes>
        </main>

        <Footer />

        {/* Chatbot tetap muncul di semua halaman */}
        <div className="fixed bottom-5 right-5 z-50">
          <Chatbot isOpen={isChatbotOpen} toggleChatbot={toggleChatbot} />
        </div>

      

        {/* Login or Register Form - Only render modal if it's toggled */}
        {isRegister !== null && (
          <div className="modal-container">
            {isRegister ? (
              <Register closeModal={handleToggleForm} />
            ) : (
              <Login closeModal={handleToggleForm} setUser={setUser} />
            )}
          </div>
        )}
      </Router>
    </UserProvider>
  );
};

export default App;
