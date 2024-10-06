import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Beranda from './pages/Beranda';
import LayananInovasi from './pages/Layananinovasi'; // Tambahkan ini jika belum ada
import CariInovasi from './pages/Cariinovasi';
import Referensi from './pages/Referensi';
import Berita from './components/Berita';
import NewsDetail from './components/NewsDetail'; // Misalnya untuk menampilkan detail berita



const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/layanan" element={<LayananInovasi />} />
          <Route path="/cari" element={<CariInovasi />} />
          <Route path="/referensi" element={<Referensi />} />
          <Route path="/berita" element={<Berita />} /> {/* Tambahkan rute untuk Berita */}
          <Route path="/news/:id" element={<NewsDetail />} /> {/* Rute ke halaman detail berita */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;