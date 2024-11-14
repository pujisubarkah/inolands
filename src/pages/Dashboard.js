// src/components/dashboard.jsx
import React, { useState } from 'react';
import Diagnose from '../dashboard/Diagnose';
import Ide from '../dashboard/Ide';
import Rencana from '../dashboard/Rencana';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faTableCells } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = React.useState('IdeInovasi');


  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: 'flex' }}>


<div style={{ 
        width: isSidebarOpen ? '250px' : '50px', 
        transition: 'width 0.3s', 
        overflow: 'hidden', 
        backgroundColor: '#333', 
        color: '#fff', 
        padding: '10px' 
      }}>
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
            zIndex: '1000',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faChevronLeft : faChevronRight} />
        </button>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          <li style={{ marginBottom: '10px' }}>
            <button 
              onClick={() => setActiveComponent('IdeInovasi')} 
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
                justifyContent: isSidebarOpen ? 'flex-start' : 'center'
              }}
            >
              <FontAwesomeIcon icon={faTableCells} />
              {isSidebarOpen && <span style={{ marginLeft: '10px' }}>Ide Inovasi</span>}
            </button>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <button 
              onClick={() => setActiveComponent('Diagnose')} 
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
                justifyContent: isSidebarOpen ? 'flex-start' : 'center'
              }}
            >
              <FontAwesomeIcon icon={faTableCells} />
              {isSidebarOpen && <span style={{ marginLeft: '10px' }}>Diagnose Inovasi</span>}
            </button>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <button 
              onClick={() => setActiveComponent('RencanaAksi')} 
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
                justifyContent: isSidebarOpen ? 'flex-start' : 'center'
              }}
            >
              <FontAwesomeIcon icon={faTableCells} />
              {isSidebarOpen && <span style={{ marginLeft: '10px' }}>Rencana Aksi Inovasi</span>}
            </button>
          </li>
        </ul>
      </div>
      <div style={{ flex: 1, padding: '10px' }}>
        {activeComponent === 'Diagnose' && <Diagnose />}
        {activeComponent === 'IdeInovasi' && <Ide />}
        {activeComponent === 'RencanaAksi' && <Rencana />}
      </div>

    </div>
  );
};

export default Dashboard;
