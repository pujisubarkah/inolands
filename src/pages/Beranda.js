import React from 'react';
import './Beranda.css'; // Jika kamu ingin menambahkan styling
import Berita from '../components/Berita';
import Carousel from '../components/Carousel';


const Beranda = () => {
  return (
    <div className="Beranda">
     
      <Berita />
      <Carousel />
  
    </div>
  );
};

export default Beranda;
