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
      <div style={styles.modalContainer}>
        {/* Tombol Close */}
        <button
          onClick={closeModal}
          style={styles.closeButton}
        >
          &times;
        </button>
  
        <div style={styles.container}>
          {/* Bagian kiri: Gambar */}
          <div style={styles.leftPane}>
            <img src="/ino.png" alt="Logo" style={styles.logo} />
            <h2 style={styles.logoText}>Ino</h2>
          </div>
  
          {/* Bagian kanan: Form */}
          <div style={styles.rightPane}>
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
          </div>
        </div>
      </div>
    );
};

// CSS-in-JS Styles
const styles = {
  modalContainer: {
    position: 'relative',
    maxWidth: '600px',
    margin: ' auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fffff',
    display: 'flex',
    flexDirection: 'column',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  leftPane: {
    backgroundColor: 'transparent',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    borderRadius: '8px 0 0 8px',
  },
  logo: {
    width: '200px',
    height: "auto",
    marginBottom: '15px',
  
  },
  subtitle: {
    color: '#fff',
    textAlign: 'center',
  },
  rightPane: {
    padding: '30px',
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },

};


export default Login;