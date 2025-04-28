import React from 'react';
import Infografis from '../components/Carousel';
import Berita from '../components/Berita';
import Tuxedovation from '../components/Tuxedovation';
import ProperExpo from '../components/Properexpo';
import Jippnas from '../components/Jippnas';
import InovasiLAN from '../components/InovasiLAN';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faChartPie, faNewspaper, faVideo, faTableCells } from '@fortawesome/free-solid-svg-icons';

const Referensi = () => {
  const [activeComponent, setActiveComponent] = React.useState('List Inovasi');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { label: 'List Inovasi', icon: faTableCells, component: 'List Inovasi' },
    { label: 'Berita Inovasi', icon: faNewspaper, component: 'Berita' },
    { label: 'Infografis Inovasi', icon: faChartPie, component: 'Infografis' },
    { label: 'Proyek Perubahan', icon: faVideo, component: 'Proyek Perubahan' },
    { label: 'Tuxedovation', icon: faVideo, component: 'Tuxedovation' },
    { label: 'Etalase Jippnas', icon: faVideo, component: 'Jippnas' },
  ];

  const SidebarButton = ({ item }) => (
    <li style={{ marginBottom: '10px' }}>
      <button
        onClick={() => setActiveComponent(item.component)}
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
        <FontAwesomeIcon icon={item.icon} />
        {isSidebarOpen && <span style={{ marginLeft: '10px' }}>{item.label}</span>}
      </button>
    </li>
  );

  return (
    <div style={{ display: 'flex' }}>
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
            justifyContent: 'center',
          }}
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faChevronLeft : faChevronRight} />
        </button>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {menuItems.map((item, index) => (
            <SidebarButton key={index} item={item} />
          ))}
        </ul>
      </div>

      <div style={{ flex: 1, padding: '10px' }}>
        {activeComponent === 'List Inovasi' && <InovasiLAN />}
        {activeComponent === 'Berita' && <Berita />}
        {activeComponent === 'Infografis' && <Infografis />}
        {activeComponent === 'Proyek Perubahan' && <ProperExpo />}
        {activeComponent === 'Tuxedovation' && <Tuxedovation />}
        {activeComponent === 'Jippnas' && <Jippnas />}
      </div>
    </div>
  );
};

export default Referensi;
