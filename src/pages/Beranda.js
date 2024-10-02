import React from 'react';
import './Beranda.css'; // Jika kamu ingin menambahkan styling
import Berita from '../components/Berita';


const Beranda = () => {
  return (
    <div className="Beranda">
      <h2>Selamat Datang di Inoland</h2>
      <p>
        Ini adalah platform yang mendukung inovasi dan kolaborasi antara berbagai
        pihak untuk menciptakan solusi yang bermanfaat. 
      </p>
      <p>
        Jelajahi layanan inovasi kami, cari inovasi yang relevan, dan temukan
        referensi yang berguna.
      </p>
     <Berita />
    </div>
  );
};

export default Beranda;
