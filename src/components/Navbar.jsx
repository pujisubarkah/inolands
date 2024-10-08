import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Modal from 'react-modal';
import Login from './Login';
import Register from './Register';
import { useTranslation } from 'react-i18next'; // Import useTranslation

function Navbar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Menggunakan useTranslation

  const menu = [
    { name: t('Beranda'), path: '/' },
    { name: t('Layanan Inovasi'), path: '/layanan' },
    { name: t('Cari Inovasi'), path: '/cari' },
    { name: t('Referensi'), path: '/referensi' }
  ];

  Modal.setAppElement('#root');
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  // Fungsi untuk mengganti bahasa
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/lanri.png" alt="Logo" />
        <span>INOLAND</span>
      </div>
      <ul className="menu">
        {menu.map((item) => (
          <li key={item.name}>
            <NavLink to={item.path} activeClassName="active">
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <ul className="auth-buttons">
        <button onClick={openLoginModal}>Masuk</button>
      </ul>

      {/* Tombol translate dengan icon bendera */}
      <ul className="translate-buttons">
        <button onClick={() => changeLanguage('en')}>
          <img src="/icons/uk-flag.png" alt="English" width="30" height="20" />
        </button>
        <button onClick={() => changeLanguage('id')}>
          <img src="/icons/indonesia-flag.png" alt="Bahasa Indonesia" width="30" height="20" />
        </button>
      </ul>

      {/* Modal login */}
      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        contentLabel="Login Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <button onClick={closeLoginModal} className="close-button">X</button>
        <Login closeModal={closeLoginModal} openRegisterModal={openRegisterModal} />
      </Modal>

      {/* Register Modal */}
      <Modal
        isOpen={isRegisterModalOpen}
        onRequestClose={closeRegisterModal}
        contentLabel="Register Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <button onClick={closeRegisterModal} className="close-button">X</button>
        <Register closeModal={closeRegisterModal} />
      </Modal>
    </nav>
  );
}

export default Navbar;
