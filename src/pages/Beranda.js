import React from 'react';
import './Beranda.css'; // Jika kamu ingin menambahkan styling
import { useTranslation } from 'react-i18next';
import Berita from '../components/Berita';
import Carousel from '../components/Carousel';


const Beranda = () => {
  const { t } = useTranslation(); // Mengambil fungsi t dari useTranslation
  return (
    <div className="Beranda">
   
      <Berita />
      <hr style={{ border: '1px solid #ccc', margin: '20px 0' }} />
      <Carousel />
  
    </div>
  );
};

export default Beranda;
