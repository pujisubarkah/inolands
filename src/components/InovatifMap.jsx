import { useState, useEffect } from "react";

import { supabase } from '../supabaseClient';

function InovatifMap() {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [hoveredArea, setHoveredArea] = useState({ visible: false, text: '', x: 0, y: 0 });
  const [selectedYear, setSelectedYear] = useState('Tahun_2019'); // Default to 2019

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const { data: provincesData, error: provincesError } = await supabase
          .from('provinsis')
          .select('*'); // Only fetch from 'provinsis'

        if (provincesError) throw provincesError;

        setProvinces(provincesData);
      } catch (err) {
        console.error("Error fetching provinces:", err.message);
        alert(`Failed to fetch provinces: ${err.message}`);
      }
    };

    fetchProvinces();
  }, []); // Runs only once when component mounts

  // Function to return choropleth color based on the selected year and its value
  const getChoroplethColor = (innovationValue) => {
    if (innovationValue === 'Belum Mengisi Data') return '#800026'; // Red for "No Data"
    if (innovationValue === 'Sangat Inovatif') return '#006400'; // Dark Green
    if (innovationValue === 'Kurang Inovatif') return '#FFCC00'; // Yellow
    if (innovationValue === 'Inovatif') return '#32CD32'; // Light Green
    if (innovationValue === 'Tidak Dapat Dinilai') return '#8B0000'; // Dark Red
    return '#FFEDA0'; // Lightest color for undefined values
  };

  const handleMouseEnter = (event, text) => {
    const x = 750; // Adjust this value based on your box width and desired margin
    const y = 20; // Adjust this value based on your desired margin from the top

    setHoveredArea({ visible: true, text, x, y });
  };

  const handleMouseLeave = () => {
    setHoveredArea({ ...hoveredArea, visible: false });
  };

  // Function to handle year button click
  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className="app">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Year Buttons */}
        <div style={{ marginBottom: '20px' }}>
          {['Tahun_2019', 'Tahun_2020', 'Tahun_2021', 'Tahun_2022', 'Tahun_2023'].map((year) => (
            <button
              key={year}
              onClick={() => handleYearClick(year)}
              style={{
                padding: '10px',
                margin: '0 5px',
                backgroundColor: selectedYear === year ? '#8B0000' : '#8B0000', // Dark red when selected, light grey otherwise
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {year.split('_')[1]} {/* Show the year part */}
            </button>
          ))}
        </div>

        {/* Peta Provinsi */}
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '100%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', margin: '20px 0 10px 0' }}>
            PETA INDEKS INOVASI DAERAH
          </h1>
          <hr style={{ width: '100px', border: 'none', height: '2px', background: 'linear-gradient(to right, red, black, red)', margin: '0 auto 20px auto' }} />
          
          <svg baseProfile="tiny" viewBox="0 0 981.98602 441.06508" width="100%" height="auto" preserveAspectRatio="xMidYMid meet">
            {provinces.map((province) => {
              const innovationValue = province[selectedYear] || 'Belum Mengisi Data'; // Get innovation value based on selected year
              return (
                <path
                  key={province.id_provinsi}
                  d={province.svg_path ? province.svg_path.replace(/"/g, '') : ''}
                  fill={getChoroplethColor(innovationValue)}
                  stroke="black"
                  strokeWidth="0.5"
                  onClick={() => setSelectedProvinsi(province.id_provinsi)}
                  onMouseEnter={(event) => handleMouseEnter(event, `${province.nama || ''}  ${innovationValue}`)}
                  onMouseLeave={handleMouseLeave}
                >
                  <title>{province.nama}</title>
                </path>
              );
            })}
          </svg>
        </div>
{/* Legend */}
<div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ margin: '0 15px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#006400', marginRight: '10px' }}></div>
            <span>Sangat Inovatif</span>
          </div>
          <div style={{ margin: '0 15px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#66CDAA', marginRight: '10px' }}></div>
            <span>Inovatif</span>
          </div>
          <div style={{ margin: '0 15px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#FFD700', marginRight: '10px' }}></div>
            <span>Kurang Inovatif</span>
          </div>
          <div style={{ margin: '0 15px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#FF6347', marginRight: '10px' }}></div>
            <span>Belum Mengisi Data</span>
          </div>
          <div style={{ margin: '0 15px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#8B0000', marginRight: '10px' }}></div>
            <span>Tidak Dapat Dinilai</span>
          </div>
        </div>
      </div>
    </div>
  );
}
    

export default InovatifMap;
