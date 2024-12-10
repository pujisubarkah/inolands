import React, { useEffect } from 'react';
import TambahBerita from '../admin/TambahBerita';
import TambahInovasi from '../admin/TambahInovasi';
import AturRole from '../admin/AturRole';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
  faNewspaper,
  faLightbulb,
  faTerminal,
  faUser
} from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
  const [activeComponent, setActiveComponent] = React.useState('Berita');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
 

 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleBeritaClick = () => {
    setActiveComponent('Berita');
  };

  const handleInovasiClick = () => {
    setActiveComponent('Inovasi');
  };

  const handleRoleClick = () => {
    setActiveComponent('Role');
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div
        style={{
          width: isSidebarOpen ? '250px' : '50px',
          transition: 'width 0.3s',
          overflow: 'hidden',
          backgroundColor: '#333',
          color: '#fff',
          padding: '10px',
        }}
      >
        {/* Toggle Sidebar Button */}
        <button
          onClick={toggleSidebar}
          style={{
            backgroundColor: '#444',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '5px',
            width: '100%',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faChevronLeft : faChevronRight} />
        </button>

        {/* Sidebar Menu */}
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          <li style={{ marginBottom: '10px' }}>
            <button
              onClick={handleBeritaClick}
              style={{
                backgroundColor: '#444',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                cursor: 'pointer',
                borderRadius: '5px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isSidebarOpen ? 'flex-start' : 'center',
              }}
            >
              <FontAwesomeIcon icon={faNewspaper} />
              {isSidebarOpen && <span style={{ marginLeft: '10px' }}>Tambah Berita</span>}
            </button>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <button
              onClick={handleInovasiClick}
              style={{
                backgroundColor: '#444',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                cursor: 'pointer',
                borderRadius: '5px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isSidebarOpen ? 'flex-start' : 'center',
              }}
            >
              <FontAwesomeIcon icon={faLightbulb} />
              {isSidebarOpen && <span style={{ marginLeft: '10px' }}>Tambah Inovasi</span>}
            </button>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <button
              onClick={handleRoleClick}
              style={{
                backgroundColor: '#444',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                cursor: 'pointer',
                borderRadius: '5px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isSidebarOpen ? 'flex-start' : 'center',
              }}
            >
              <FontAwesomeIcon icon={faUser} />
              {isSidebarOpen && <span style={{ marginLeft: '10px' }}>User List</span>}
            </button>
          </li>
        </ul>
      </div>

        {/* Render the active component */}
        {activeComponent === 'Berita' && <TambahBerita />}
        {activeComponent === 'Inovasi' && <TambahInovasi />}
        {activeComponent === 'Role' && <AturRole />}
      </div>

  );
};

export default Admin;
