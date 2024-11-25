import React from 'react';
import NavbarUser from '../pegawai/NavbarUser'; // Pastikan path-nya benar
import Navbar from '../components/navbar';
import Header from '../components/header';

function UserLayout({ children }) {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
    {/* Header dan Navbar */}
    <Header />
    <Navbar />

      <NavbarUser />

      {/* Konten Utama */}
      <main className="p-4">
        {children}
      </main>

      {/* Contoh Footer */}
      <footer className="bg-gray-200 text-center p-2">User Footer</footer>
    </div>
  );
}

export default UserLayout;
