import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header'; // Import the Header component
import Login from './components/login';  // Import the Login component
import Sidebar from './pages/sidebar';   // Import the Sidebar component
import Dashboard from './components/dashboard'; // Assuming Dashboard component for main page
import ListUnit from './components/list-unit'; // ListUnit page
import ListAll from './components/list-all-pegawai'; // ListAll page
import Pensiun from './pegawai_inaktif/pensiun'; // Pensiun page
import Navbar from './components/navbar'; // Import the Navbar component

// Main app component
function AppContent() {
  const location = useLocation();

  // Definisikan rute yang memerlukan Sidebar, Header, dan Navbar
  const routesWithSidebar = [
    '/dashboard', 
    '/list-unit', 
    '/list-all-pegawai', 
    '/home', 
    '/pegawai_inaktif/pensiun'
  ];

  // Definisikan rute yang memerlukan Header dan Navbar
  const routesWithHeaderNavbar = routesWithSidebar;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header dan Navbar hanya muncul di halaman tertentu */}
      {routesWithHeaderNavbar.includes(location.pathname) && (
        <>
          <Header />
          <Navbar />
        </>
      )}
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar hanya muncul di halaman tertentu */}
        {routesWithSidebar.includes(location.pathname) && (
          <div className="w-64 bg-blue-800 text-white">
            <Sidebar />
          </div>
        )}

        {/* Main content section */}
        <div className="flex-1 p-4 overflow-auto bg-white">
          <Routes>
            {/* Route untuk Login */}
            <Route path="/" element={<Login />} />

            {/* Route untuk Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/list-unit" element={<ListUnit />} />
            <Route path="/list-all-pegawai" element={<ListAll />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/pegawai_inaktif/pensiun" element={<Pensiun />} />

            {/* Tambahkan rute lainnya */}
          </Routes>
        </div>
      </div>
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
