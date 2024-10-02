import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  const navigate = useNavigate(); // Ganti useHistory dengan useNavigate

  const menu = [
    { name: "Beranda", path: '/' },
    { name: "Layanan Inovasi", path: '/layanan' },
    { name: "Cari Inovasi", path: '/cari' },
    { name: "Referensi", path: '/referensi' }
  ];

  const goToLogin = () => {
    navigate('/login'); // Gunakan navigate untuk berpindah halaman
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
      <button className="masuk" onClick={goToLogin}>Masuk</button>
    </ul>
  </nav>
);
};

export default Navbar;

