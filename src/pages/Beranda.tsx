import ProperExpo from '../components/Properexpo';
import StatsGrid from '../components/Statgrid';
import MyMap from '../components/Mymap';

const Beranda = () => {

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center bg-gray-100 pt-40">
      {/* Teletext berjalan sebelum peta */}
      <div className="absolute top-5 left-0 w-full overflow-hidden z-20">
        <div className="whitespace-nowrap animate-marquee text-2xl md:text-3xl font-bold text-white drop-shadow-[2px_2px_0px_#0000ff] py-2">
          Everyone Can Innovate &nbsp; • &nbsp; Everyone Can Innovate &nbsp; • &nbsp; Everyone Can Innovate &nbsp; • &nbsp;
        </div>
      </div>

      {/* Peta sebagai latar belakang */}
      <div className="absolute inset-0 w-full h-screen z-0">
        <MyMap />
      </div>

      {/* Overlay untuk tulisan INOLAND di pojok kanan atas */}
      <div className="absolute top-10 right-10 z-10 text-right bg-black bg-opacity-50 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-lg animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
          INOLAND
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mt-3 leading-relaxed">
          INOLAND adalah web informasi oleh <span className="font-semibold text-white">Pusat Inovasi Administrasi Negara</span> yang juga merupakan sistem integrasi
          untuk penguatan kapasitas berinovasi, terdiri dari berbagai program advokasi pembelajaran inovasi.
        </p>
      </div>

      {/* Section untuk StatsGrid dan ProperExpo agar tidak tertimpa oleh peta */}
      <div className="relative w-full max-w-6xl mt-[40vh] px-4 z-10">
        <StatsGrid />
      </div>

      <div className="relative w-full max-w-6xl py-10 px-4 z-10">
        <ProperExpo />
      </div>

      <div className="py-10"></div>
    </div>
  );
};

export default Beranda;
