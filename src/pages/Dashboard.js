// src/components/dashboard.jsx
import React, { useState, useEffect } from 'react';
import Diagnose from '../dashboard/Diagnose';
import Ide from '../dashboard/Ide';
import Rencana from '../dashboard/Rencana';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar or dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.sidebar') && !e.target.closest('.dropdown')) {
      setIsSidebarOpen(false);
      setIsDropdownOpen(false);
    }
  };

  // Add event listener for clicks outside
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Render the selected form component
  const renderForm = () => {
    if (selectedForm === 'Diagnose') {
      return <Diagnose />;
    }
    if (selectedForm === 'IdeInovasi') {
      return <Ide />;
    }
    if (selectedForm === 'RencanaAksi') {
      return <Rencana />;
    }
    return null;
  };

  return (
    <div className="md:flex flex-col md:flex-row md:min-h-screen w-full">
      {/* Sidebar */}
      <div className={`sidebar flex flex-col w-full md:w-64 text-gray-700 bg-white dark:bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-lg ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
          <button className="text-lg font-semibold tracking-widest text-gray-900 uppercase dark:text-white">
            Form Inovasi
          </button>
          <button onClick={toggleSidebar} className="rounded-lg md:hidden focus:outline-none">
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              <path d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 5h14a1 1 0 110 2H3a1 1 0 110-2z" />
            </svg>
          </button>
        </div>
        <nav className="px-4 pb-4 md:pb-0 md:overflow-y-auto">
          <button onClick={() => setSelectedForm('IdeInovasi')} className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg">
            Form Ide Inovasi
          </button>
          <button onClick={() => setSelectedForm('Diagnose')} className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg hover:bg-gray-200">
            Form Diagnose Inovasi
          </button>
          <button onClick={() => setSelectedForm('RencanaAksi')} className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg hover:bg-gray-200">
            Form Rencana Aksi Inovasi
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4">
        {renderForm()}
      </div>
    </div>
  );
};

export default Dashboard;
