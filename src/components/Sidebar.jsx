// src/components/Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';


function Sidebar() {
  return (
    <div className="sidebar">
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

export default Sidebar;
