import React from 'react';


const Footer = () => {
  return (
<footer className="bg-transparent p-0">
  <div className="max-w-[1200px] mx-auto">
    
    {/* Divider */}
    <hr className="border-t-2 bg-[#a3002b] h-px m-0 p-0" />

    {/* Footer Top */}
    <div className="flex justify-between items-center mb-0">
      <img src="ino.png" alt="INO Logo" className="w-[150px] h-auto" />
      <div className="stakeholders">
        <h3 className="mb-4">Pemangku Kepentingan INOLAND</h3>
        <div className="flex items-center space-x-5">
          <img src="/lanri.png" alt="lanri Logo" className="max-h-[80px]" />
          <img src="/panrb.png" alt="panrb Logo" className="max-h-[80px]" />
          <img src="/kemendagri.png" alt="kemendagri Logo" className="max-h-[80px]" />
        </div>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="grid grid-cols-4 gap-8">
      {/* Section 1: Tentang Kami */}
      <div className="footer-section">
        <h4 className="text-2xl font-roboto mb-4">Tentang Kami</h4>
        <ul className="list-none p-0">
          <li className="mb-2">Kementerian Dalam Negeri</li>
          <li className="mb-2">Kementerian Pendayagunaan Aparatur Negara</li>
          <li className="mb-2">Lembaga Administrasi Negara</li>
        </ul>
      </div>

      {/* Section 2: Jelajahi */}
      <div className="footer-section">
        <h4 className="text-2xl font-roboto mb-4">Jelajahi</h4>
        <ul className="list-none p-0">
          <li className="mb-2"><a href="/" className="text-gray-800 hover:underline">Beranda</a></li>
          <li className="mb-2"><a href="/layanan" className="text-gray-800 hover:underline">Layanan Inovasi</a></li>
          <li className="mb-2"><a href="/cari" className="text-gray-800 hover:underline">Cari Inovasi</a></li>
          <li className="mb-2"><a href="/referensi" className="text-gray-800 hover:underline">Referensi Inovasi</a></li>
        </ul>
      </div>

      {/* Section 3: Hubungi Kami */}
      <div className="footer-section">
        <h4 className="text-2xl font-roboto mb-4">Hubungi Kami</h4>
        <ul className="list-none p-0">
          <li className="mb-2">📞 (+6221) 3828601 - 89</li>
          <li className="mb-2">✉️ pian.lan.go.id</li>
          <li className="mb-2">📍Jl. Veteran No 10 Jakarta Pusat - 10110</li>
        </ul>
      </div>

      {/* Section 4: Ikuti Kami */}
      <div className="footer-section">
        <h4 className="text-2xl font-roboto mb-4">Ikuti Kami</h4>
        <a href="https://www.youtube.com">
          <img src="/youtube-icon.png" alt="YouTube Icon" className="max-h-[40px]" />
        </a>
      </div>
    </div>
  </div>

  {/* Footer Copyright */}
  <div className="text-center bg-[#a3002b] text-[#f7f4f4] text-lg border-2 py-0.5 w-full m-0">
    <p>&copy; 2024 Pusat Inovasi Administrasi Negara. All rights reserved.</p>
  </div>
</footer>

  );
};

export default Footer;


