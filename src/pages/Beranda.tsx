import ProperExpo from '../components/Properexpo';
import StatsGrid from '../components/Statgrid';
import MyMap from '../components/Mymap';
import VideoBeranda from '../components/video_beranda';

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

     

       {/* Section untuk StatsGrid dan ProperExpo agar tidak tertimpa oleh peta */}
      <div className="relative w-full max-w-6xl mt-[40vh] px-4 z-10">
        <VideoBeranda />
      </div>

      {/* Section untuk StatsGrid dan ProperExpo agar tidak tertimpa oleh peta */}
      <div className="relative w-full max-w-6xl px-4 z-10">
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
