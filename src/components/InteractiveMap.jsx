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

  // Memuat data provinsi saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchProvinces = async () => {
      const { data, error } = await supabase
        .from('provinsis') // Gantilah dengan nama tabel provinsi Anda
        .select('*'); // Mengambil semua kolom dari tabel provinsi

      if (error) {
        console.error("Error fetching provinsi:", error);
      } else {
        setProvinces(data); // Simpan data provinsi
      }
    };

    fetchProvinces();
  }, []);

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
      {/* Render peta berdasarkan apakah provinsi dipilih */}
      {selectedProvinsi === null ? (
        <svg baseProfile="tiny" viewBox="0 0 981.98602 441.06508" width="100%" height="auto" preserveAspectRatio="xMidYMid meet">
          {provinces.map((province) => (
            <path
              key={province.id}
              d={province.svg_path ? province.svg_path.replace(/"/g, '') : ''} // Pastikan svg_path tidak null
              fill="white"
              stroke="black"
              strokeWidth="0.5"
              onClick={() => loadKabupaten(province.id_provinsi)} // Muat kabupaten saat provinsi diklik
              onMouseEnter={(event) => handleMouseEnter(event, province.nama)}
              onMouseLeave={handleMouseLeave}
              className="map-path" />
          ))}
        </svg>
      ) : (

        <svg className="map-kabupaten" baseProfile="tiny" viewBox="0 0 800 600" width="50%" height="auto" height="auto" preserveAspectRatio="xMidYMid meet">
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
                className="map-path" />
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
      <div  div style={{ position: 'absolute', top: '200px', left: '20px', background: 'white', padding: '5px', borderRadius: '5px' }}>
      <button onClick={goBackToProvinsi} style={{ background: 'none', border: 'none' }}>
      <FontAwesomeIcon icon={faArrowLeft} size="2x" color="black" />
      </button>
    </div>
      )}
    </div>
  );
}


export default InteractiveMap;