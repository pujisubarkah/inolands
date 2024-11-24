// layouts/AdminLayout.jsx
import React from 'react';
import SidebarAdmin from '../components/sidebar';
import Navbar from '../components/navbar';
import Header from '../components/header';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header dan Navbar */}
      <Header />
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-blue-800 text-white">
          <SidebarAdmin />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 overflow-auto bg-white">
          {children} {/* Konten halaman yang dirender */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

