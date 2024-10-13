import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import './i18n'; // Import konfigurasi i18n
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Beranda from './pages/Beranda';
import LayananInovasi from './pages/Layananinovasi';
import CariInovasi from './pages/Cariinovasi';
import Referensi from './pages/Referensi';
import Berita from './components/Berita';
import NewsDetail from './components/NewsDetail';

// Import UserProvider
import { UserProvider } from './context/UserContext'; // Ensure this is the correct path

const App = () => {
  const { t, i18n } = useTranslation(); // Gunakan useTranslation untuk mengakses fungsi t dan i18n

  // Fungsi untuk mengubah bahasa
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <UserProvider> {/* Wrap your components with UserProvider */}
      <Router>
        <Navbar />
        <div>
          {/* Tambahkan tombol untuk mengganti bahasa */}
          <button onClick={() => changeLanguage('en')}>English</button>
          <button onClick={() => changeLanguage('id')}>Bahasa Indonesia</button>
        </div>
        <main>
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/layanan" element={<LayananInovasi />} />
            <Route path="/cari" element={<CariInovasi />} />
            <Route path="/referensi" element={<Referensi />} />
            <Route path="/berita" element={<Berita />} />
            <Route path="/news/:id" element={<NewsDetail />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </UserProvider> 
  );
};

export default App;
