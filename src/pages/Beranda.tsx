import React from 'react';
import { useTranslation } from 'react-i18next';
import Berita from '../components/Berita';
import Carousel from '../components/Carousel';
import ProperExpo from '../components/Properexpo';
import { useNavigate } from 'react-router-dom';


const Beranda = () => {
  const navigate = useNavigate();

  const { t } = useTranslation(); // Mengambil fungsi t dari useTranslation
  const handleSelengkapnyaClick = () => {
    navigate(`/cari`);
  };
  const handleTontonVideoClick = () => {
    navigate(`/layanan`);
  };

  return (
    <div className="Beranda">
      <main className="flex flex-col items-center text-center py-12 px-4" style={{ backgroundColor: '#16578d' }}>
        <div className="flex flex-col md:flex-row items-center justify-center bg-darkred text-white py-12 px-6 rounded-lg" style={{ margin: '20px', padding: '20px' }}>
          <img src="https://lnauvznspseugfqxpwjc.supabase.co/storage/v1/object/public/assets/hero-img.png" alt="Illustration of people interacting with technology" className="w-full md:w-2/5 max-w-md mr-0 md:mr-6 mb-6 md:mb-0"/>
          <div className="text-left w-full md:w-3/5">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">INOLAND</h1>
            <p className="text-sm md:text-base mb-6">
              INOLAND adalah web informasi oleh Pusat Inovasi Administrasi Negara yang juga merupakan sistem integrasi
              untuk penguatan kapasitas berinovasi terdiri dari berbagai program advokasi pembelajaran inovasi
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
                <button className="bg-gray-100 text-[#243a55] px-4 py-2 rounded font-bold" onClick={handleSelengkapnyaClick}>Selengkapnya</button>
              <button className="flex items-center space-x-2" onClick={handleTontonVideoClick}>
                <i className="fas fa-play-circle text-white"></i>
                <span>Tonton Video</span>
              </button>
            </div>
            <section className="text-blue-900 py-4">
              <div className="container mx-auto flex flex-wrap justify-around space-y-4 md:space-y-0 md:space-x-2">
                <div className="text-center p-4 bg-gray-100 rounded-lg shadow-md w-full md:w-auto">
                  <div className="bg-blue-600 text-white text-lg font-bold py-2 px-4 rounded">IDE INOVASI</div>
                  <div className="text-2xl font-bold py-2">13.329</div>
                </div>
                <div className="text-center p-4 bg-gray-100 rounded-lg shadow-md w-full md:w-auto">
                  <div className="bg-green-600 text-white text-lg font-bold py-2 px-4 rounded">PEMERINTAH DAERAH</div>
                  <div className="text-2xl font-bold py-2">120</div>
                </div>
                <div className="text-center p-4 bg-gray-100 rounded-lg shadow-md w-full md:w-auto">
                  <div className="bg-teal-600 text-white text-lg font-bold py-2 px-4 rounded">ALUMNI WCI</div>
                  <div className="text-2xl font-bold py-2">1.025</div>
                </div>
                <div className="text-center p-4 bg-gray-100 rounded-lg shadow-md w-full md:w-auto">
                  <div className="bg-yellow-500 text-white text-lg font-bold py-2 px-4 rounded">LAUNCHING</div>
                  <div className="text-2xl font-bold py-2">9.325</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Berita />
      <hr style={{ border: '1px solid #ccc', margin: '20px 0' }} />
      <Carousel />
      <hr style={{ border: '1px solid #ccc', margin: '20px 0' }} />
      <ProperExpo />
      <br/>
      <br/>
      
    </div>
  );
};

export default Beranda;
