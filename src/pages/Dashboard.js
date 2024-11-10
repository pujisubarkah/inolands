// src/components/dashboard.jsx


import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white p-6 w-64 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}
      >
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <ul>
          <li>
            <Link to="/" className="block py-2 hover:bg-gray-700 px-2 rounded">
              Home
            </Link>
          </li>
          <li>
            <Link to="/innovation-form" className="block py-2 hover:bg-gray-700 px-2 rounded">
              Form Inovasi
            </Link>
          </li>
          {/* Add more menu items as needed */}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <button
          onClick={toggleSidebar}
          className="md:hidden mb-4 p-2 bg-blue-500 text-white rounded-md"
        >
          {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
        </button>

        <div>
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p>Welcome to the dashboard!</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
