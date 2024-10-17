import { useState, useEffect } from "react";
import './InteractiveMap.css';
import { supabase } from '../supabaseClient';

function InteractiveMap() {
  const [provinces, setProvinces] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [hoveredArea, setHoveredArea] = useState({ visible: false, text: '', x: 0, y: 0 });
  const [inovasiKabupaten, setInovasiKabupaten] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const { data: provincesData, error: provincesError } = await supabase
          .from('provinsis')
          .select('*');

        if (provincesError) throw provincesError;

        const provinceIds = provincesData.map(prov => prov.id_provinsi).filter(id => id);
        const { data: provinsiData, error: provinsiError } = await supabase
          .from('provinsi')
          .select('id_provinsi, jumlah_inovasi')
          .in('id_provinsi', provinceIds);

        if (provinsiError) throw provinsiError;

        const combinedData = provincesData.map(prov => ({
          ...prov,
          jumlah_inovasi: provinsiData.find(p => p.id_provinsi === prov.id_provinsi)?.jumlah_inovasi || 0,
        }));

        setProvinces(combinedData);
      } catch (err) {
        console.error("Error fetching provinces:", err.message);
        alert(`Failed to fetch provinces: ${err.message}`);
      }
    };

    fetchProvinces();
  }, []);

  const getChoroplethColor = (jumlah_inovasi) => {
    if (jumlah_inovasi > 200) return '#800026'; // dark red
    if (jumlah_inovasi > 150) return '#BD0026';
    if (jumlah_inovasi > 100) return '#E31A1C';
    if (jumlah_inovasi > 50) return '#FC4E2A';
    if (jumlah_inovasi > 0) return '#FD8D3C';
    return '#FFEDA0'; // lightest color for no innovation
  
  };

  const loadKabupaten = async (id_provinsi) => {
    try {
      const { data: kabupatenData, error: kabupatenError } = await supabase
        .from('kabupatens')
        .select('*')
        .eq('id_provinsi', id_provinsi);

      if (kabupatenError) throw kabupatenError;

      const kabupatenIds = kabupatenData.map(kab => kab.id);
      const { data: kabkotData, error: kabkotError } = await supabase
        .from('kabupaten') // Using views table 'kabkot'
        .select('id_kabkot, jumlah_inovasi')
        .in('id_kabkot', kabupatenIds);

      if (kabkotError) throw kabkotError;

      const combinedKabupaten = kabupatenData.map(kab => ({
        ...kab,
        jumlah_inovasi: kabkotData.find(k => k.id_kabkot === kab.id)?.jumlah_inovasi || 0,
      }));

      setKabupaten(combinedKabupaten);
      setSelectedProvinsi(id_provinsi);
    } catch (err) {
      console.error("Error fetching kabupaten or inovasi:", err.message);
    }
  };

  const handleKabupatenHover = async (kabupaten) => {
    const { data: inovasiData, error } = await supabase
      .from('inolands')
      .select('*')
      .eq('id_kabkot', kabupaten.id_kabkot);

    if (error) {
      console.error("Error fetching inovasi:", error);
    } else {
      setInovasiKabupaten(inovasiData);
      setCurrentPage(1);
    }
  };

  const handleMouseEnter = (event, text) => {
    const x = 750; // Adjust this value based on your box width and desired margin
    const y = 20; // Adjust this value based on your desired margin from the top

    setHoveredArea({ visible: true, text, x, y });
  };

  const handleMouseLeave = () => {
    setHoveredArea({ ...hoveredArea, visible: false });
  };

  const totalPages = Math.ceil(inovasiKabupaten.length / itemsPerPage);
  const currentInovasi = inovasiKabupaten.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Peta Provinsi */}
      <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '100%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <svg baseProfile="tiny" viewBox="0 0 981.98602 441.06508" width="100%" height="auto" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="grad-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ff0000', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ffcccc', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="grad-orange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ff9900', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ffe5b5', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#00ff00', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ccffcc', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          {provinces.map((province) => (
            <path
              key={province.id_provinsi}
              d={province.svg_path ? province.svg_path.replace(/"/g, '') : ''}
              fill={getChoroplethColor(province.jumlah_inovasi || 0)}
              stroke="black"
              strokeWidth="0.5"
              onClick={() => loadKabupaten(province.id_provinsi)}
              onMouseEnter={(event) => handleMouseEnter(event, `${province.nama || ''}  ${province.jumlah_inovasi} inovasi`)}
              onMouseLeave={handleMouseLeave}
            />
          ))}

          {hoveredArea.visible && (
            <foreignObject x={hoveredArea.x} y={hoveredArea.y} width="200" height="75">
              <div style={{ background: 'white', border: 'solid #ccc', borderRadius: '5px', padding: '5px' }}>
                <strong>{hoveredArea.text.split('  ')[0]}</strong>
                <br />
                {hoveredArea.text.split('  ')[1]}
                <br/>
              </div>
            </foreignObject>
          )}
        </svg>
      </div>
      {selectedProvinsi !== null && (
        <div style={{ display: 'flex', width: '100%' }}>
          <svg className="map-kabupaten" baseProfile="tiny" viewBox="0 0 800 600" width="50%" height="auto" preserveAspectRatio="xMidYMid meet">
            {kabupaten.map((kab) => (
              kab.svg_path ? (
                <path 
                  key={kab.id}
                  d={kab.svg_path.replace(/"/g, '')}
                  fill={getChoroplethColor(kab.jumlah_inovasi || 0)}
                  stroke="black"
                  strokeWidth="1"
                  onMouseEnter={(event) => {
                    handleKabupatenHover(kab);
                    handleMouseEnter(event, kab.nama);
                  }}
                  onMouseLeave={handleMouseLeave}
                  className="map-path"
                />
              ) : null
            ))}
          </svg>

          <div style={{ marginLeft: '20px', width: '50%' }}>
            {currentInovasi.length > 0 ? (
              currentInovasi.map((inovasi) => (
                <div key={inovasi.id}>
                  <h4>{inovasi.judul_inovasi}</h4>
                  <p>{inovasi.urusan}</p>
                </div>
              ))
            ) : (
              <p>Tidak ada inovasi untuk kabupaten ini.</p>
            )}

            {totalPages > 1 && (
              <div>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} onClick={() => handlePageChange(i + 1)}>
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

{/* Legend */}
      <div className="legend" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginTop: '20px', width: '40%', justifyContent: 'center' }}>
        <h3 style={{ marginRight: '20px' }}>LEGENDA</h3>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <div className="legend-color" style={{ backgroundColor: '#FFEDA0', width: '20px', height: '20px', borderRadius: '3px', marginRight: '5px' }}></div>
          <span>0</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <div className="legend-color" style={{ backgroundColor: '#FD8D3C', width: '20px', height: '20px', borderRadius: '3px', marginRight: '5px' }}></div>
          <span>1-50</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <div className="legend-color" style={{ backgroundColor: '#FC4E2A', width: '20px', height: '20px', borderRadius: '3px', marginRight: '5px' }}></div>
          <span>51-100</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <div className="legend-color" style={{ backgroundColor: '#E31A1C', width: '20px', height: '20px', borderRadius: '3px', marginRight: '5px' }}></div>
          <span>101-150</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <div className="legend-color" style={{ backgroundColor: '#BD0026', width: '20px', height: '20px', borderRadius: '3px', marginRight: '5px' }}></div>
          <span>151-200</span>
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <div className="legend-color" style={{ backgroundColor: '#800026', width: '20px', height: '20px', borderRadius: '3px', marginRight: '5px' }}></div>
          <span>200+</span>
        </div>
      </div>
      </div>
    );
  }


export default InteractiveMap;

