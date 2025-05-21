// src/pages/Cariinovasi.js

import React from 'react';
import InteractiveMap from '../components/InteractiveMap';
import ListInovasi from '../components/ListInovasi';
import DashboardInovasi from '../components/DashboardInovasi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faTable, faGlobe, faChartBar } from '@fortawesome/free-solid-svg-icons';

const Cariinovasi = () => {
  const [activeComponent, setActiveComponent] = React.useState('SebaranInovasi');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleSebaranInovasiClick = () => {
    setActiveComponent('SebaranInovasi');
  };

  const handleListInovasiClick = () => {
    setActiveComponent('ListInovasi');
  };

  const handleDashboardInovasiClick = () => {
    setActiveComponent('DashboardInovasi');
  };

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
              onClick={handleSebaranInovasiClick} 
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
              <FontAwesomeIcon icon={faGlobe} />
              {isSidebarOpen && <span style={{ marginLeft: '10px' }}>Sebaran Inovasi</span>}
            </button>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <button 
              onClick={handleListInovasiClick} 
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
              <FontAwesomeIcon icon={faTable} />
              {isSidebarOpen && <span style={{ marginLeft: '10px' }}>Daftar Inovasi</span>}
            </button>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <button 
              onClick={handleDashboardInovasiClick} 
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
              <FontAwesomeIcon icon={faChartBar} />
              {isSidebarOpen && <span style={{ marginLeft: '10px' }}>Dashboard Inovasi</span>}
            </button>
          </li>
        </ul>
      </div>
      <div style={{ flex: 1, padding: '10px' }}>
        {activeComponent === 'SebaranInovasi' && <InteractiveMap />}
        {activeComponent === 'ListInovasi' && <ListInovasi />}
        {activeComponent === 'DashboardInovasi' && <DashboardInovasi />}
      </div>
    </div>
  );
};

export default Cariinovasi;
