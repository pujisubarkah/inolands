import React, { useState } from 'react'; // Add useContext here
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Login from './Login';
import Register from './Register';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { useUser } from '../context/UserContext'; // Import useUser hook

function Navbar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Menggunakan useTranslation
  const { user, logout } = useUser(); // Use the custom hook to access user and logout function


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

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate('/'); // Redirect to home or login page after logout
  };

  return (
    <nav className="flex justify-between items-center p-5 bg-[#a3002b]">
      <div className="flex items-center">
        <img src="/lanri.png" alt="Logo" className="h-[50px] mr-2" />
        <span className="text-white font-bold text-[2.5rem]">INOLAND</span>
      </div>

      {/* Menu navigation */}
      <ul className="flex gap-5 list-none font-open-sans text-[1.5rem] text-white">
        {menu.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              activeClassName="font-bold text-[#ffcc00]" /* Custom style when active */
              className="no-underline text-white hover:text-[#ffcc00] transition"
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Auth buttons */}
      <div>
        {user ? ( // If user is logged in, show the username
          <span onClick={handleLogout} className="text-white text-[1.5rem] cursor-pointer">
            Selamat Datang, {user.username}! (Logout)   </span>
        ) : (
          <button
            onClick={openLoginModal}
            className="border-2 border-white bg-[#a3002b] text-white py-2 px-4 rounded-lg cursor-pointer text-[1.5rem] hover:bg-[#82001e] transition"
          >
            Masuk
          </button>
        )}
      </div>

      {/* Language translate buttons */}
      <div className="flex gap-2">
        <button onClick={() => changeLanguage('en')} className="bg-transparent border-none cursor-pointer">
          <img src="/uk_flag.png" alt="English" className="border border-gray-300 rounded-md" width="30" height="20" />
        </button>
        <button onClick={() => changeLanguage('id')} className="bg-transparent border-none cursor-pointer">
          <img src="/indonesia_flag.png" alt="Bahasa Indonesia" className="border border-gray-300 rounded-md" width="30" height="20" />
        </button>
      </div>

      {/* Modal for login */}
      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        contentLabel="Login Modal"
        className="bg-white p-5 max-w-[500px] mx-auto rounded-lg shadow-lg animate-fadeIn"
        overlayClassName="fixed inset-0 bg-[rgba(0,0,0,0.75)] flex items-center justify-center"
      >
        <button
          onClick={closeLoginModal}
          className="absolute top-2 right-2 bg-transparent text-[16px] text-gray-800 hover:text-black transition duration-300 cursor-pointer"
        >
          &times;
        </button>
        <Login closeModal={closeLoginModal} openRegisterModal={openRegisterModal} />
      </Modal>

      {/* Modal for register */}
      <Modal
        isOpen={isRegisterModalOpen}
        onRequestClose={closeRegisterModal}
        contentLabel="Register Modal"
        className="bg-white p-5 max-w-[500px] mx-auto rounded-lg shadow-lg animate-fadeIn"
        overlayClassName="fixed inset-0 bg-[rgba(0,0,0,0.75)] flex items-center justify-center"
      >
        <button
          onClick={closeRegisterModal}
          className="absolute top-2 right-2 bg-transparent text-[16px] text-gray-800 hover:text-black transition duration-300 cursor-pointer"
        >
          &times;
        </button>
        <Register closeModal={closeRegisterModal} />
      </Modal>
    </nav>
  );
}

export default Navbar;
