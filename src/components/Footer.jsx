import React from 'react';
import './Footer.css'; // Pastikan untuk membuat file CSS terpisah

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <hr className="divider" />
        <div className="footer-top">
          <img src="ino.png" alt="INO Logo" className="logo" />
          <div className="stakeholders">
            <h3>Pemangku Kepentingan INOLAND</h3>
            <div className="stakeholders-logos">
              <img src="/lanri.png" alt="lanri Logo" />
              <img src="/panrb.png" alt="panrb Logo" />
              <img src="/kemendagri.png" alt="kemendagri Logo" />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-section">
            <h4>Tentang Kami</h4>
            <ul>
              <li>Kementerian Dalam Negeri</li>
              <li>Kementerian Pendayagunaan Aparatur Negara</li>
              <li>Lembaga Administrasi Negara</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Jelajahi</h4>
            <ul>
              <li><a href="/">Beranda</a></li>
              <li><a href="/layanan">Layanan Inovasi</a></li>
              <li><a href="/cari">Cari Inovasi</a></li>
              <li><a href="/referensi">Referensi Inovasi</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Hubungi Kami</h4>
            <ul>
              <li>📞 (+6221) 3828601 - 89</li>
              <li>✉️ pian.lan.go.id</li>
              <li>📍Jl. Veteran No 10 Jakarta Pusat - 10110</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Ikuti Kami</h4>
            <a href="#"><img src="/youtube-icon.png" alt="Youtube Icon" /></a>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <p>&copy; 2024 Pusat Inovasi Administrasi Negara. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;


