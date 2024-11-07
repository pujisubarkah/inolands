import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; // Pastikan TailwindCSS di-import
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Beranda from './pages/Beranda';
import LayananInovasi from './pages/Layananinovasi';
import CariInovasi from './pages/Cariinovasi';
import Referensi from './pages/Referensi';
import Berita from './components/Berita';
import NewsDetail from './components/NewsDetail';
import Sidebar from './components/Sidebar';
import ChatbotComponent from './components/ChatbotComponent'; // Import Chatbot

// Import UserProvider
import { UserProvider } from './context/UserContext';

const App = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State untuk visibilitas chatbot

  // Fungsi untuk toggle chatbot
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <UserProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/layanan" element={<LayananInovasi />} />
            <Route path="/cari" element={<CariInovasi />} />
            <Route path="/referensi" element={<Referensi />} />
            <Route path="/berita" element={<Berita />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/sidebar" element={<Sidebar />} />
          </Routes>
        </main>
        <Footer />

        {/* Avatar yang selalu muncul di pojok bawah kanan */}
        <div
          className="fixed bottom-4 right-4 w-12 h-12  bg-transparent rounded-full flex items-center justify-center cursor-pointer z-50"
          onClick={toggleChatbot} // Men-toggle chatbot saat avatar diklik
        >
          <img
            src="/ino.png"
            alt="Chatbot Avatar"
            className="w-12 h-12 rounded-full"
          />
        </div>

        {/* Chatbot Component */}
        {isChatbotOpen && <ChatbotComponent closeChatbot={toggleChatbot} />}
      </Router>
    </UserProvider>
  );
};

export default App;
