import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header'; // Import the Header component
import Login from './components/login';  // Import the Login component
import Sidebar from './pages/sidebar';   // Import the Sidebar component
import Dashboard from './components/dashboard'; // Assuming Dashboard component for main page
import ListUnit from './components/list-unit'; // ListUnit page
import ListAll from './components/list-all-pegawai'; // ListAll page
import Navbar from './components/navbar'; // Import the Navbar component

// Main app component
function AppContent() {
  // Custom hook to get the current route
  const location = useLocation();

  // Define routes where the Sidebar should appear
  const routesWithSidebar = ['/dashboard', '/list-unit', '/list-all-pegawai', '/home'];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Always render Header and Navbar above everything */}
      <Header />
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Conditionally render Sidebar */}
        {routesWithSidebar.includes(location.pathname) && (
          <div className="w-64 bg-blue-800 text-white">
            <Sidebar />
          </div>
        )}

        {/* Main content section that adjusts based on Sidebar presence */}
        <div className="flex-1 p-4 overflow-auto bg-white">
          <Routes>
            {/* Route for Login (homepage) */}
            <Route path="/" element={<Login />} />
            
            {/* Route for Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/list-unit" element={<ListUnit />} />
            <Route path="/list-all-pegawai" element={<ListAll />} />
            <Route path="/home" element={<Dashboard />} />
            
            {/* Add other routes as needed */}
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
