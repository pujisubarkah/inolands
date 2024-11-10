import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Register = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    instansi: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Bersihkan pesan error sebelumnya

    // Mendaftar pengguna ke Supabase Auth
    const { user, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (authError || !user) {
      setErrorMessage(authError ? authError.message : 'Sign-up failed');
      return;
    }

    // Setelah pengguna berhasil mendaftar, masukkan data ke tabel 'users'
    const { data, error: dbError } = await supabase
      .from('users') // Pastikan 'users' adalah nama tabel yang benar
      .insert([
        {
          auth_id: user.id, // Menggunakan auth_id sebagai foreign key
          username: formData.username, // Username dari form
          email: formData.email, // Email yang terdaftar di Auth
          instansi: formData.instansi, // Data instansi dari form
        },
      ]);

    if (dbError) {
      setErrorMessage(dbError.message);
      return;
    }

    // Jika sukses, tutup modal dan beri tahu pengguna
    closeModal();
    alert('Registrasi berhasil!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 z-10 max-w-lg w-full mx-4">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 m-4 text-gray-600 text-2xl hover:text-gray-800"
        >
          &times;
        </button>

        <form onSubmit={handleRegister} className="w-full">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Daftar</h2>

          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Instansi</label>
            <input
              type="text"
              name="instansi"
              value={formData.instansi}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Masukkan instansi Anda"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Daftar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
