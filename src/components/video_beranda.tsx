
const VideoSection = () => {
    return (
      <div className="flex flex-col md:flex-row items-center bg-[#1C2F5D] text-white p-6 md:p-10 rounded-xl shadow-lg relative">
        {/* Video Google Drive */}
        <div className="relative w-full md:w-1/2">
          <iframe
            className="w-full h-64 md:h-80 rounded-lg shadow-md"
            src="https://drive.google.com/file/d/1-siJEmmRhyvu6-EiBxD932-NeyaQm8kD/preview"
            title="Google Drive Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
  
          {/* Tulisan samping (vertical text) */}
          <div className="absolute left-[-140px] top-1/2 -translate-y-1/2 rotate-90 text-xs md:text-sm tracking-wider text-gray-300">
            KOLABORASI UNTUK PERUBAHAN
          </div>
        </div>
  
        {/* Deskripsi */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-10">
          {/* Garis dekoratif */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-10 h-1 bg-white"></div>
            <div className="w-4 h-1 bg-white"></div>
          </div>
  
          <h3 className="text-2xl font-bold leading-tight">
            Kreativitas dan Kolaborasi Bersatu di INOLAND untuk Menciptakan Inovasi yang Berarti.
          </h3>
          <p className="text-gray-300 text-sm mt-4">
            "Inovasi dapat dicapai oleh siapa saja melalui kreativitas dan kolaborasi, 
            di mana beragam ide saling dibagikan untuk menciptakan dampak yang berarti. 
            INOLAND, sebagai platform informasi dari Pusat Inovasi Administrasi Negara, 
            berfungsi sebagai sistem integrasi untuk memperkuat kapasitas inovasi melalui 
            berbagai program advokasi pembelajaran yang inspiratif."
          </p>
        </div>
      </div>
    );
  };
  
  export default VideoSection;
