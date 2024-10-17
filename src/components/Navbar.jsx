import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Login from './Login';
import Register from './Register';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';

function Navbar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user, logout } = useUser();

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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-[darkred] shadow-md">
      <div className="flex items-center">
        <img src="/lanri.png" alt="Logo" className="h-12 mr-3 p-2" />
        <span className="text-white font-bold text-2xl">INOLAND</span>
      </div>

      <ul className="flex gap-6 list-none font-open-sans text-lg text-white">
        {menu.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              activeClassName="font-bold text-white"
              className="no-underline text-white hover:text-[darkred] hover:bg-white transition p-2 rounded"
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {user ? (
          <span onClick={handleLogout} className="text-white text-lg cursor-pointer">
            Selamat Datang, {user.username}! (Logout)
          </span>
        ) : (
          <button
            onClick={openLoginModal}
            className="border-2 border-white bg-[darkred] text-white py-2 px-4 rounded-lg cursor-pointer text-lg hover:bg-white hover:text-[darkred] transition"
          >
            Masuk
          </button>
        )}
        <div className="flex gap-2">
          <button onClick={() => changeLanguage('en')} className="bg-transparent border-none cursor-pointer">
            <img src="/uk_flag.png" alt="English" className="border border-gray-300 rounded-md" width="30" height="20" />
          </button>
          <button onClick={() => changeLanguage('id')} className="bg-transparent border-none cursor-pointer">
            <img src="/indonesia_flag.png" alt="Bahasa Indonesia" className="border border-gray-300 rounded-md" width="30" height="20" />
          </button>
        </div>
      </div>

      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        contentLabel="Login Modal"
        className="bg-white p-5 max-w-md mx-auto rounded-lg shadow-lg animate-fadeIn"
        overlayClassName="fixed inset-0 bg-[rgba(0,0,0,0.75)] flex items-center justify-center"
      >
        <button
          onClick={closeLoginModal}
          className="absolute top-2 right-2 bg-transparent text-lg text-gray-800 hover:text-black transition duration-300 cursor-pointer"
        >
          &times;
        </button>
        <Login closeModal={closeLoginModal} openRegisterModal={openRegisterModal} />
      </Modal>

      <Modal
        isOpen={isRegisterModalOpen}
        onRequestClose={closeRegisterModal}
        contentLabel="Register Modal"
        className="bg-white p-5 max-w-md mx-auto rounded-lg shadow-lg animate-fadeIn"
        overlayClassName="fixed inset-0 bg-[rgba(0,0,0,0.75)] flex items-center justify-center"
      >
        <button
          onClick={closeRegisterModal}
          className="absolute top-2 right-2 bg-transparent text-lg text-gray-800 hover:text-black transition duration-300 cursor-pointer"
        >
          &times;
        </button>
        <Register closeModal={closeRegisterModal} />
      </Modal>
    </nav>
  );
}

export default Navbar;
