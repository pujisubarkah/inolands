// src/pages/Login.js
import React, { useState } from 'react';

const Login = ({ closeModal, openRegisterModal }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tambahkan logika login di sini
    console.log(formData);
    closeModal(); // Tutup modal setelah login berhasil
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Masuk</button>

      {/* Tambahkan link atau tombol untuk membuka modal register */}
      <p>
        Belum punya akun?{' '}
        <button type="button" onClick={() => {
          closeModal(); // Tutup modal login
          openRegisterModal(); // Buka modal register
        }} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
          Daftar di sini
        </button>
      </p>
    </form>
  );
};

export default Login;
