import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-transparent p-0">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Divider */}
        <hr className="border-t-2 bg-[#a3002b] h-px m-0 p-0" />

        {/* Footer Top */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-0">
          <img src="ino.png" alt="INO Logo" className="w-[150px] h-auto mb-4 md:mb-0" />
          <div className="stakeholders">
            <h4 className="text-2xl mb-4">Pemangku Kepentingan INOLAND</h4>
            <div className="flex items-center space-x-5">
              <a href="https://lan.go.id/"><img src="/lanri.png" alt="lanri Logo" className="max-h-[80px]" /></a>
              <a href="https://menpan.go.id/"><img src="/panrb.png" alt="panrb Logo" className="max-h-[80px]" /></a>
              <a href="https://kemendagri.go.id/"><img src="/kemendagri.png" alt="kemendagri Logo" className="max-h-[80px]" /></a>
            </div>
          </div>
        </div>
        <br></br>
        {/* Footer Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Section 1: Tentang Kami */}
          <div className="footer-section">
            <h4 className="text-2xl font-poppins mb-4"><b>Tentang Kami</b></h4>
            <ul className="list-none p-0">
              <li className="mb-2"><a href="https://tuxedovation.inovasi.litbang.kemendagri.go.id/" className="text-gray-800 hover:underline">Kementerian Dalam Negeri</a></li>
              <li className="mb-2"><a href="https://jippnas.menpan.go.id/" className="text-gray-800 hover:underline">Kementerian PANRB</a></li>
              <li className="mb-2"><a href="https://inoland.lan.go.id" className="text-gray-800 hover:underline">Lembaga Administrasi Negara</a></li>
            </ul>
          </div>

          {/* Section 2: Jelajahi */}
          <div className="footer-section">
            <h4 className="text-2xl font-poppins mb-4"><b>Jelajahi</b></h4>
            <ul className="list-none p-0">
              <li className="mb-2"><a href="/" className="text-gray-800 hover:underline">Beranda</a></li>
              <li className="mb-2"><a href="/layanan" className="text-gray-800 hover:underline">Layanan Inovasi</a></li>
              <li className="mb-2"><a href="/cari" className="text-gray-800 hover:underline">Cari Inovasi</a></li>
              <li className="mb-2"><a href="/referensi" className="text-gray-800 hover:underline">Referensi Inovasi</a></li>
            </ul>
          </div>

          {/* Section 3: Hubungi Kami */}
          <div className="footer-section">
            <h4 className="text-2xl font-poppins mb-4"><b>Hubungi Kami</b></h4>
            <ul className="list-none p-0">
              <li className="mb-2"><FontAwesomeIcon icon={faPhone} /> (+6221) 3828601 - 89</li>
              <li className="mb-2"><FontAwesomeIcon icon={faMailBulk} /> pian@lan.go.id</li>
              <li className="mb-2"><FontAwesomeIcon icon={faLocation} /> Jl. Veteran No 10 Jakarta Pusat - 10110</li>
            </ul>
          </div>

          {/* Section 4: Ikuti Kami */}
          <div className="footer-section">
            <h4 className="text-2xl font-poppins mb-4"><b>Ikuti Kami</b></h4>
            <ul className="list-none p-0">
            <li className="mb-2">
            <a href="https://www.youtube.com/@InovasiLANRI" target='_blank' rel='noreferrer'>
              <img src="/youtube-icon.png" alt="YouTube Icon" className="max-h-[30px]" />
              <p>Inovasi LANRI</p>
            </a>
            </li>
            <li className="mb-2">
            <a href="https://www.instagram.com/pian_lanri" target='_blank' rel='noreferrer'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png" alt="Instagram Icon" className="max-h-[30px]" />
              <p>@pian_lanri</p>
            </a>
            </li>
            </ul>
          </div>
        </div>
      </div>
      <br></br>
      {/* Footer Copyright */}
      <div className="text-center bg-[darkred] text-[#f7f4f4] text-lg border-2 py-0.5 w-full m-0 font-poppins">
        <p>&copy; 2024 - Pusat Inovasi Administrasi Negara LANRI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
