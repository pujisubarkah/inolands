import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css'; // Ensure TailwindCSS is imported
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Beranda from './pages/Beranda';
import LayananInovasi from './pages/Layananinovasi';
import CariInovasi from './pages/Cariinovasi';
import Referensi from './pages/Referensi';
import Berita from './components/Berita';
import NewsDetail from './components/NewsDetail';
import Dashboard from './components/Dashboard';
import LoadingSpinner from './components/LoadingSpinner';
import Register from './components/Register'; // Import Register component
import Login from './components/Login'; // Import LoginModal component
import { UserProvider } from './context/UserContext';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './chatbot/config';
import MessageParser from './chatbot/MessageParser';
import ActionProvider from './chatbot/ActionProvider';
import { supabase } from './supabaseClient'; // Import supabase client

const App = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null); // User authentication state
  const [isRegister, setIsRegister] = useState(false); // State to toggle between Login and Register

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
      setUser(user);
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
        <Navbar user={user} />
        <main>
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/layanan" element={<LayananInovasi />} />
            <Route path="/cari" element={<CariInovasi />} />
            <Route path="/referensi" element={<Referensi />} />
            <Route path="/berita" element={<Berita />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard /> : <Navigate to="/" />} 
            />
          </Routes>
        </main>
        <Footer />

        {/* Chatbot Button */}
        <img
          src="/ino.png"
          alt="Chatbot Icon"
          onClick={toggleChatbot}
          className="fixed bottom-4 right-4 w-20 h-20 cursor-pointer"
        />

        {/* Chatbot */}
        {isChatbotOpen && (
          <div className="fixed bottom-20 right-4 bg-white shadow-lg rounded-lg overflow-hidden">
            <button
              onClick={toggleChatbot}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
            <button 
              onClick={toggleChatbot} 
              className="absolute top-0 right-0 p-2 text-white bg-red-800 rounded"
            >
              ▼
            </button>
          </div>
        )}

        {/* Login or Register Form */}
        <div className="modal-container">
          {isRegister ? (
            <Register closeModal={handleToggleForm} />
          ) : (
            <Login closeModal={handleToggleForm} setUser={setUser} />
          )}
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
