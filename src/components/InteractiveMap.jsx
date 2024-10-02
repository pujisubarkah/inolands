import { useState, useEffect } from "react";
import './InteractiveMap.css'; // Pastikan untuk membuat file CSS terpisah
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const InteractiveMap = () => {
  const [provinces, setProvinces] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [hoveredArea, setHoveredArea] = useState({ visible: false, text: '', x: 0, y: 0 });

  // Memuat data provinsi saat komponen pertama kali dimuat
  useEffect(() => {
    fetch("http://localhost:1337/api/provinsis?pagination[page]=1&pagination[pageSize]=38")
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data.data); // Simpan data provinsi
      })
      .catch((error) => console.error("Error fetching provinsi:", error));
  }, []);

  // Fungsi untuk memuat data kabupaten berdasarkan id_provinsi
  const loadKabupaten = (id_provinsi) => {
    fetch(`http://localhost:1337/api/Kabupaten-kotas?filters[id_provinsi]=${id_provinsi}`)
      .then((response) => response.json())
      .then((data) => {
        setKabupaten(data.data); // Simpan data kabupaten
        setSelectedProvinsi(id_provinsi); // Set provinsi yang dipilih
      })
      .catch((error) => console.error("Error fetching kabupaten:", error));
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
              d={province.svg_path.replace(/"/g, '')}// Menghapus tanda kutip
              fill="white"
              stroke="black"
              strokeWidth="0.5"
              onClick={() => loadKabupaten(province.id_provinsi)} // Muat kabupaten saat provinsi diklik
              onMouseEnter={(event) => handleMouseEnter(event, province.nama)}
              onMouseLeave={handleMouseLeave}
              className="map-path"
            />
          ))}
        </svg>
      ) : (
      
        <svg className="map-kabupaten" baseProfile="tiny" viewBox = "80 80 800 600" width='300%' height="auto" preserveAspectRatio="xMidYMid meet">
          {kabupaten.map((kab) => (
            // Pastikan kab.SVG_path tersedia sebelum diakses
            kab.SVG_path ? (
              <path
                key={kab.id}
                d={kab.SVG_path.replace(/"/g, '')}
                fill="white"
                stroke="black"
                strokeWidth="0.3"
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
              fontSize="10px"
              pointerEvents="none"
            >
              {hoveredArea.text}
            </text>
          )}
        </svg>
      )}

      {/* Tambahan: tombol untuk kembali ke peta provinsi */}
      {selectedProvinsi !== null && (
        <div style={{ position: 'absolute', top: '200px', left: '20px' }}>
        <button onClick={goBackToProvinsi} style={{ background: 'none', border: 'none' }}>
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </button>
        </div>
      )}
    </div>
  );
};


export default InteractiveMap;