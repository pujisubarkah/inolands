import { useState, useEffect } from "react";
import './InteractiveMap.css'; // Pastikan untuk membuat file CSS terpisah
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../supabaseClient'; // Import supabase client


function InteractiveMap() {
  const [provinces, setProvinces] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [hoveredArea, setHoveredArea] = useState({ visible: false, text: '', x: 0, y: 0 });

  const fetchProvinces = async () => {
    const { data, error } = await supabase
      .from('provinsis')
      .select(`id_provinsi, svg_path, provinsi(jumlah_inovasi)`)
      .eq('id_provinsi', 'id_provinsi::text'); // Use type conversion to match id_provinsi types
  
    if (error) {
      console.error("Error fetching provinsi:", error);
    } else {
      console.log(data); // Verifikasi data yang diambil
      setProvinces(data);
    }
  };


  // Fungsi untuk mendapatkan ID gradien berdasarkan jumlah inovasi
  const getFillGradient = (jumlah_inovasi) => {
    if (jumlah_inovasi < 10) return 'url(#grad-red)'; // Gradien merah
    if (jumlah_inovasi < 20) return 'url(#grad-orange)'; // Gradien oranye
    if (jumlah_inovasi < 30) return 'url(#grad-yellow)'; // Gradien kuning
    return 'url(#grad-green)'; // Gradien hijau
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
        d={province.svg_path ? province.svg_path.replace(/"/g, '') : ''} // Pastikan d-value valid
        fill={getFillGradient(province.provinsi.jumlah_inovasi)} // Isi dengan warna gradien berdasarkan jumlah inovasi
        stroke="black"
        strokeWidth="0.5"
        onClick={() => loadKabupaten(province.id_provinsi)} // Memuat kabupaten saat klik
        onMouseEnter={(event) => handleMouseEnter(event, province.provinsi.nama)} // Event mouse enter
        onMouseLeave={handleMouseLeave} // Event mouse leave
        />
        ))}
      </svg>

      {/* Peta Kabupaten */}
      {selectedProvinsi !== null && (
        <svg className="map-kabupaten" baseProfile="tiny" viewBox="0 0 800 600" width="50%" height="auto" preserveAspectRatio="xMidYMid meet">
          {kabupaten.map((kab) => (
            // Pastikan kab.SVG_path tersedia sebelum diakses
            kab.svg_path ? (
              <path
                key={kab.id}
                d={kab.svg_path.replace(/"/g, '')} // Menghapus tanda kutip
                fill="white"
                stroke="black"
                strokeWidth="1"
                onMouseEnter={(event) => handleMouseEnter(event, kab.nama)}
                onMouseLeave={handleMouseLeave}
                className="map-path"
              />
            ) : null // Jika tidak ada SVG_path, tidak merender apa pun
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
