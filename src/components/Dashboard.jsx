// src/components/Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';


function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Menu</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/innovation-form">Form Inovasi</Link>
        </li>
        {/* Add more menu items as needed */}
      </ul>
    </div>
  );
}

export default Dashboard;
