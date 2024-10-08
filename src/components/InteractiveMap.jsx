import { useState, useEffect } from "react";
import './InteractiveMap.css'; // Pastikan untuk membuat file CSS terpisah
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../supabaseClient'; // Import supabase client

// Function to get the gradient color based on jumlah_inovasi
const getFillGradient = (jumlah_inovasi) => {
  if (jumlah_inovasi === 0) return 'white'; // White color if no innovations
  if (jumlah_inovasi < 10) return 'url(#grad-green)'; // Green gradient
  if (jumlah_inovasi < 20) return 'url(#grad-yellow)'; // Yellow gradient
  if (jumlah_inovasi < 30) return 'url(#grad-orange)'; // Orange gradient
  return 'url(#grad-red)'; // Red gradient for the highest number of innovations
};
function InteractiveMap() {
  const [provinces, setProvinces] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [hoveredArea, setHoveredArea] = useState({ visible: false, text: '', x: 0, y: 0 });

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        // Fetch provinces from the provinsis table
        const { data: provincesData, error: provincesError } = await supabase
          .from('provinsis')
          .select('*');
  
        if (provincesError) {
          throw provincesError;
        }
  
        // Fetch jumlah_inovasi from the provinsi view for the fetched provinces
        const provinceIds = provincesData.map(prov => prov.id_provinsi).filter(id => id !== null && id !== undefined);
        const { data: provinsiData, error: provinsiError } = await supabase
          .from('provinsi')
          .select('id_provinsi, jumlah_inovasi')
          .in('id_provinsi', provinceIds); // Use the `in` operator to filter
  
        if (provinsiError) {
          throw provinsiError;
        }
  
        // Combine the two datasets
        const combinedData = provincesData.map(prov => ({
          ...prov,
          jumlah_inovasi: provinsiData.find(p => p.id_provinsi === prov.id_provinsi)?.jumlah_inovasi || 0,
        }));
  
        console.log("Fetched combined provinces:", combinedData);
        setProvinces(combinedData);
      } catch (err) {
        console.error("Error fetching provinces:", err.message);
        alert(`Failed to fetch provinces: ${err.message}`);
      }
    };
  
    fetchProvinces();
  }, []);
  

  // Fungsi untuk mendapatkan ID gradien berdasarkan jumlah inovasi
  const getFillGradient = (jumlah_inovasi) => {
    if (jumlah_inovasi < 10) return 'white'; // Warna putih
    if (jumlah_inovasi < 20) return 'url(#grad-yellow)'; // Gradien kuning
    if (jumlah_inovasi < 30) return 'url(#grad-orange)'; // Gradien oranye
    return 'url(#grad-red)'; // Gradien merah
  };
  

  // Fungsi untuk memuat data kabupaten berdasarkan id_provinsi
  const loadKabupaten = async (id_provinsi) => {
    const { data, error } = await supabase
      .from('kabupatens') // Gantilah dengan nama tabel kabupaten Anda
      .select('*')
      .eq('id_provinsi', id_provinsi); // Menggunakan eq() untuk filter

    if (error) {
      console.error("Error fetching kabupaten:", error);
    } else {
      setKabupaten(data); // Simpan data kabupaten
      setSelectedProvinsi(id_provinsi); // Set provinsi yang dipilih
    }
  };

  // Fungsi untuk kembali ke peta provinsi
  const goBackToProvinsi = () => {
    setSelectedProvinsi(null); // Reset selectedProvinsi untuk kembali ke peta provinsi
    setKabupaten([]); // Kosongkan data kabupaten
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

  return (
    <div>
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
          <linearGradient id="grad-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ffff00', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#ffffcc', stopOpacity: 1 }} />
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
            fill={getFillGradient(province.jumlah_inovasi || 0)} // Pastikan untuk menghindari null
            stroke="black"
            strokeWidth="0.5"
            onClick={() => loadKabupaten(province.id_provinsi)} // Memuat kabupaten saat klik
            onMouseEnter={(event) => handleMouseEnter(event, province.nama)} // Menambahkan event mouse enter
            onMouseLeave={handleMouseLeave} // Menambahkan event mouse leave
          />
        ))}
      </svg>

      {/* Peta Kabupaten */}
      {selectedProvinsi !== null && (
        <svg className="map-kabupaten" baseProfile="tiny" viewBox="0 0 800 600" width="50%" height="auto" preserveAspectRatio="xMidYMid meet">
          {kabupaten.map((kab) => (
            // Pastikan kab.svg_path tersedia sebelum diakses
            kab.svg_path ? (
              <path
                key={kab.id_kabupaten}
                d={kab.svg_path.replace(/"/g, '')} // Menghapus tanda kutip
                fill="white"
                stroke="black"
                strokeWidth="1"
                onMouseEnter={(event) => handleMouseEnter(event, kab.nama)}
                onMouseLeave={handleMouseLeave}
                className="map-path"
              />
            ) : null // Jika tidak ada svg_path, tidak merender apa pun
          ))}
          {/* Render label saat di-hover */}
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
      )}

      {/* Tambahan: tombol untuk kembali ke peta provinsi */}
      {selectedProvinsi !== null && (
        <div style={{ position: 'absolute', top: '200px', left: '20px', background: 'white', padding: '5px', borderRadius: '5px' }}>
          <button onClick={goBackToProvinsi} style={{ background: 'none', border: 'none' }}>
            <FontAwesomeIcon icon={faArrowLeft} size="2x" color="black" />
          </button>
        </div>
      )}
    </div>
  );
}

export default InteractiveMap; 