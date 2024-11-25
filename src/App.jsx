import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout'; // Import UserLayout
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import ListUnit from './components/list_unit';
import ListAll from './components/list_all_pegawai';
import Pensiun from './pegawai_inaktif/pensiun';
import MENINGGAL from './pegawai_inaktif/meninggal';
import PINDAH from './pegawai_inaktif/pindah';
import UserDashboard from './pages/user_dashboard'; // Import placeholder

function AppContent() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Layout */}
        <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/list_unit" element={<AdminLayout><ListUnit /></AdminLayout>} />
        <Route path="/list_all_pegawai" element={<AdminLayout><ListAll /></AdminLayout>} />
        <Route path="/pegawai_inaktif/pensiun" element={<AdminLayout><Pensiun /></AdminLayout>} />
        <Route path="/pegawai_inaktif/meninggal" element={<AdminLayout><MENINGGAL /></AdminLayout>} />
        <Route path="/pegawai_inaktif/pindah" element={<AdminLayout><PINDAH /></AdminLayout>} />

        {/* User Layout */}
        <Route path="/user/dashboard" element={<UserLayout><UserDashboard /></UserLayout>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
