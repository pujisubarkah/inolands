import { useState, useEffect } from "react";
import './InteractiveMap.css'; // Pastikan untuk membuat file CSS terpisah
import { supabase } from '../supabaseClient'; // Import supabase client

function InteractiveMap() {
  const [provinces, setProvinces] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [hoveredArea, setHoveredArea] = useState({ visible: false, text: '', x: 0, y: 0 });
  const [inovasiKabupaten, setInovasiKabupaten] = useState([]); // Menyimpan inovasi kabupaten
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [itemsPerPage] = useState(5); // Jumlah inovasi per halaman

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const { data: provincesData, error: provincesError } = await supabase
          .from('provinsis')
          .select('*');

        if (provincesError) {
          throw provincesError;
        }

        const provinceIds = provincesData.map(prov => prov.id_provinsi).filter(id => id !== null && id !== undefined);
        const { data: provinsiData, error: provinsiError } = await supabase
          .from('provinsi')
          .select('id_provinsi, jumlah_inovasi')
          .in('id_provinsi', provinceIds);

        if (provinsiError) {
          throw provinsiError;
        }

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

  const getFillGradient = (jumlah_inovasi) => {
    if (jumlah_inovasi < 10) return 'white';
    if (jumlah_inovasi < 20) return 'url(#grad-orange)';
    if (jumlah_inovasi < 30) return 'url(#grad-red)';
    return 'url(#grad-green)';
  };

  const loadKabupaten = async (id_provinsi) => {
    const { data, error } = await supabase
      .from('kabupatens')
      .select('*')
      .eq('id_provinsi', id_provinsi);

    if (error) {
      console.error("Error fetching kabupaten:", error);
    } else {
      setKabupaten(data);
      setSelectedProvinsi(id_provinsi);
    }
  };

  const handleKabupatenHover = async (kabupaten) => {
    const { data: inovasiData, error } = await supabase
      .from('inovasis')
      .select('*')
      .eq('id_kabkot', kabupaten.id);

    if (error) {
      console.error("Error fetching inovasi:", error);
    } else {
      setInovasiKabupaten(inovasiData); // Simpan inovasi kabupaten yang di-hover
      setCurrentPage(1); // Reset halaman saat inovasi dimuat
    }
  };

  const handleMouseEnter = (event, text) => {
    const svgRect = event.target.getBoundingClientRect();
    const x = event.clientX - svgRect.left;
    const y = event.clientY - svgRect.top;
    setHoveredArea({ visible: true, text, x, y });
  };

  const handleMouseLeave = () => {
    setHoveredArea({ ...hoveredArea, visible: false });
  };

  // Pagination Logic
  const totalPages = Math.ceil(inovasiKabupaten.length / itemsPerPage);
  const currentInovasi = inovasiKabupaten.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Peta Provinsi */}
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
            fill={getFillGradient(province.jumlah_inovasi || 0)}
            stroke="black"
            strokeWidth="0.5"
            onClick={() => loadKabupaten(province.id_provinsi)}
            onMouseEnter={(event) => handleMouseEnter(event, province.provinsi?.nama || '')}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </svg>

      {/* Peta Kabupaten */}
      {selectedProvinsi !== null && (
        <div style={{ display: 'flex', width: '100%' }}>
          <svg className="map-kabupaten" baseProfile="tiny" viewBox="0 0 800 600" width="50%" height="auto" preserveAspectRatio="xMidYMid meet">
            {kabupaten.map((kab) => (
              kab.svg_path ? (
                <path 
                  key={kab.id}
                  d={kab.svg_path.replace(/"/g, '')}
                  fill="white"
                  stroke="black"
                  strokeWidth="1"
                  onMouseEnter={(event) => {
                    handleKabupatenHover(kab);
                    handleMouseEnter(event, kab.nama); // Menambahkan nama kabupaten di hover
                  }}
                  onMouseLeave={handleMouseLeave}
                  className="map-path"
                />
              ) : null
            ))}
            {hoveredArea.visible && (
              <text
                x={hoveredArea.x}
                y={hoveredArea.y}
                fill="black"
                fontSize="20px"
                pointerEvents="none"
              >
                {hoveredArea.text}
              </text>
            )}
          </svg>

          {/* Daftar Inovasi */}
          <div style={{ marginLeft: '20px', width: '50%' }}>
            {currentInovasi.length > 0 ? (
              currentInovasi.map((inovasi) => (
                <div key={inovasi.id}>
                  <h4>{inovasi.judul}</h4>
                  <p>{inovasi.deskripsi}</p>
                </div>
              ))
            ) : (
              <p>Tidak ada inovasi yang terdaftar di kabupaten ini.</p>
            )}
            {/* Pagination Controls */}
            <div>
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Sebelumnya</button>
              <span> Halaman {currentPage} dari {totalPages} </span>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Selanjutnya</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InteractiveMap;
