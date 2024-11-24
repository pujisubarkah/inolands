// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';  // Import AdminLayout
import Login from './pages/login';  // Import the Login component
import Dashboard from './pages/dashboard'; // Assuming Dashboard component for main page
import ListUnit from './components/list_unit'; // ListUnit page
import ListAll from './components/list_all_pegawai'; // ListAll page
import Pensiun from './pegawai_inaktif/pensiun'; // Pensiun page
import MENINGGAL from './pegawai_inaktif/meninggal';
import PINDAH from './pegawai_inaktif/pindah';

// Main app component
function AppContent() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Routes>
        {/* Route untuk Login tanpa layout */}
        <Route path="/" element={<Login />} />

        {/* Semua route yang memerlukan Sidebar, Header, dan Navbar dibungkus dalam AdminLayout */}
        <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/list_unit" element={<AdminLayout><ListUnit /></AdminLayout>} />
        <Route path="/list_all_pegawai" element={<AdminLayout><ListAll /></AdminLayout>} />
        <Route path="/list_all_pegawai/:unit_kerja_id" element={<AdminLayout><ListAll /></AdminLayout>} />
        <Route path="/home" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/pegawai_inaktif/pensiun" element={<AdminLayout><Pensiun /></AdminLayout>} />
        <Route path="/pegawai_inaktif/meninggal" element={<AdminLayout><MENINGGAL /></AdminLayout>} />
        <Route path="/pegawai_inaktif/pindah" element={<AdminLayout><PINDAH /></AdminLayout>} />

        {/* Rute lainnya bisa ditambahkan */}
      </Routes>
    </div>
  );
}

// Wrapper component for BrowserRouter
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
