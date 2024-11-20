import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header'; // Import the Header component
import Login from './components/login';  // Import the Login component
import Sidebar from './pages/sidebar';   // Import the Sidebar component
import Dashboard from './components/dashboard'; // Assuming Dashboard component for main page
import ListUnit from './components/list-unit'; // ListUnit page
import Navbar from './components/navbar'; // Import the Navbar component

// Main app component
function AppContent() {
  // Custom hook to get the current route
  const location = useLocation();
  
  // Define routes where the Sidebar or Navbar should not appear
  const noSidebarRoutes = ['/'];
  const noNavbarRoutes = ['/'];

  return (
    <div>
      <Header /> {/* Header component visible across all pages */}
      {/* Conditionally render Navbar */}
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      
      <div className="flex">
        {/* Conditionally render Sidebar */}
        {!noSidebarRoutes.includes(location.pathname) && <Sidebar />}
        
        {/* Content section */}
        <div className="flex-grow p-4">
          <Routes>
            {/* Route for Login (homepage) */}
            <Route path="/" element={<Login />} />
            
            {/* Route for Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/list-unit" element={<ListUnit />} />
            
            {/* Add other pages if needed */}
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
