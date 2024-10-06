import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Modal from 'react-modal';
import Login from './Login';
import Register from './Register';




function Navbar() {
  const navigate = useNavigate(); // Ganti useHistory dengan useNavigate

  const menu = [
    { name: "Beranda", path: '/' },
    { name: "Layanan Inovasi", path: '/layanan' },
    { name: "Cari Inovasi", path: '/cari' },
    { name: "Referensi", path: '/referensi' }
  ];

  // Atur root element modal
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
        <button onClick={openLoginModal}>Masuk</button> {/* Tombol untuk membuka modal login */}
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