import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header'; // Import the Header component
import Login from './components/login';  // Import the Login component
import Sidebar from './pages/sidebar';   // Import the Sidebar component
import Dashboard from './components/dashboard'; // Assuming Dashboard component for main page
import ListUnit from './components/list-unit';

function App() {
  // Custom hook to get the current route
  const location = useLocation();
  
  // Define routes where the Sidebar should not appear
  const noSidebarRoutes = ['/'];

  return (
    <div>
      <Header />  {/* Header component visible across all pages */}
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

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
