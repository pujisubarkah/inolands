import { useState, useEffect } from "react";
import './InteractiveMap.css';
import { supabase } from '../supabaseClient';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartOptions } from 'chart.js';

function InteractiveMap() {
  interface Province {
    id_provinsi: number;
    nama: string;
    svg_path: string;
    jumlah_inovasi: number;
  }

  const [provinces, setProvinces] = useState<Province[]>([]);
  interface Kabupaten {
    id_kabkot: number;
    id_provinsi: number;
    nama: string;
    svg_path: string;
    jumlah_inovasi: number;
  }

  const [kabupaten, setKabupaten] = useState<Kabupaten[]>([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState<number | null>(null);
  const [selectedKabkot, setSelectedKabkot] = useState<number | null>(null);
  const [hoveredArea, setHoveredArea] = useState({ visible: false, text: '', x: 0, y: 0 });
  interface Inovasi {
    id: number;
    judul_inovasi: string;
    tahun: number;
    inovator: string;
    deskripsi: string;
    id_kabkot: number;
  }

  const [inovasiKabupaten, setInovasiKabupaten] = useState<Inovasi[]>([]);
  interface IndeksInovasi {
    id_provinsi: number;
    id_kabkot: number;
    indeks_tahun: number;
    nama_kabkot: string;
    nama_prov: string;
    level: string;
    indeks_skor: number; // IID skor
    indeks_predikat: string; //IID predikat
    indeks_level: number; //IID level
    ipp_skor: number; //IPP skor
    ipp_predikat: string; //IPP predikat
    ipp_level: number; //IPP level
    idsd_skor: number; //IDSD skor
    idsd_predikat: string; //IDSD predikat
    idsd_level: number; //IDSD level
    rb_predikat: string; //IDSD predikat
    rb_level: number; //IDSD level
  }
  const [indeksInovasi, setIndeksInovasi] = useState<IndeksInovasi[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const { data: provincesData, error: provincesError } = await supabase
          .from('provinsis')
          .select('*');

        if (provincesError) throw provincesError;

        const provinceIds = provincesData.map((prov: Province) => prov.id_provinsi).filter((id: number) => id);
        const { data: provinsiData, error: provinsiError } = await supabase
          .from('provinsi')
          .select('id_provinsi, jumlah_inovasi')
          .in('id_provinsi', provinceIds);

        if (provinsiError) throw provinsiError;

        const combinedData = provincesData.map((prov: Province) => ({
          ...prov,
          jumlah_inovasi: provinsiData.find((p: Province) => p.id_provinsi === prov.id_provinsi)?.jumlah_inovasi || 0,
        }));

        setProvinces(combinedData);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error fetching provinces:", err.message);
        } else {
          console.error("Error fetching provinces:", err);
        }
        if (err instanceof Error) {
          alert(`Failed to fetch provinces: ${err.message}`);
        } else {
          alert('Failed to fetch provinces');
        }
      }
    };

    fetchProvinces();
  }, []);

  const getChoroplethColor = (jumlah_inovasi: number) => {
    if (jumlah_inovasi > 200) return '#08306b'; // dark blue
    if (jumlah_inovasi > 150) return '#08519c';
    if (jumlah_inovasi > 100) return '#2171b5';
    if (jumlah_inovasi > 50) return '#4292c6';
    if (jumlah_inovasi > 0) return '#6baed6';
    return '#fff'    // '#c6dbef';  lightest blue for no innovation
};

  const loadKabupaten = async (id_provinsi: number) => {
    try {
      const { data: kabupatenData, error: kabupatenError } = await supabase
        .from('kabupaten_maps')
        .select(`id_kabkot, id_provinsi, nama, svg_path`)
        .eq('id_provinsi', id_provinsi);

      if (kabupatenError) throw kabupatenError;

      console.log('kabupatenData:', kabupatenData);

      const kabupatenIds = kabupatenData.map((kab: Kabupaten) => kab.id_kabkot);
      const { data: kabkotData, error: kabkotError } = await supabase
        .from('kabkot') // Using views table 'kabkot'
        .select('id_kabkot, jumlah_inovasi')
        .in('id_kabkot', kabupatenIds);

      if (kabkotError) throw kabkotError;

      const { data: inovasiData, error:inovasiError } = await supabase
      .from('inolands')
      .select('*')
      .eq('id_provinsi', id_provinsi);

      const { data: indeksInovasiData } = await supabase
      .from('indeks_inovasi')
      .select('*')
      .eq('id_provinsi', id_provinsi)
      .eq('level','Provinsi');

      if (inovasiError) {
        console.error("Error fetching inovasi:", inovasiError);
      } else {
        setInovasiKabupaten(inovasiData);
        setIndeksInovasi(indeksInovasiData);
      }

      console.log('kabupatenData:', kabupatenData);

      const combinedKabupaten = kabupatenData.map((kab: Kabupaten) => ({
        ...kab,
        jumlah_inovasi: kabkotData.find((k: Kabupaten) => k.id_kabkot === kab.id_kabkot)?.jumlah_inovasi || 0,
      }));

      setKabupaten(combinedKabupaten);
      setSelectedProvinsi(id_provinsi);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching kabupaten or inovasi:", err.message);
      } else {
        console.error("Error fetching kabupaten or inovasi:", err);
      }
    }
  };

  const loadInovasi = async (id_kabkot: number) => {
    const { data: inovasiData, error: inovasiDataError } = await supabase
      .from('inolands')
      .select('*')
      .eq('id_kabkot', id_kabkot);

    const {data: indeksInovasiData, error: indeksInovasiError} = await supabase
      .from('indeks_inovasi')
      .select('*')
      .eq('id_kabkot', id_kabkot);

    if (inovasiDataError || indeksInovasiError) {
      console.error("Error fetching inovasi:", inovasiDataError);
      console.error("Error fetching indeks inovasi:", indeksInovasiError);
    } else {
      setInovasiKabupaten(inovasiData);
      setIndeksInovasi(indeksInovasiData);
      setSelectedKabkot(id_kabkot);
      setCurrentPage(1);
    }
  };

  const handleMouseEnter = (_: React.MouseEvent<SVGPathElement, MouseEvent>, text: string) => {
    const x = 750; // Adjust this value based on your box width and desired margin
    const y = 20; // Adjust this value based on your desired margin from the top

    setHoveredArea({ visible: true, text, x, y });
  };

  const handleMouseLeave = () => {
    setHoveredArea({ ...hoveredArea, visible: false });
  };

  const totalPages = Math.ceil(inovasiKabupaten.length / itemsPerPage);
  const currentInovasi = inovasiKabupaten.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };


  const [expandedIds, setExpandedIds] = useState<number[]>([]); // State untuk menyimpan ID yang diperluas

  const maxLength = 50; // Batas karakter untuk teks terpotong

  // Fungsi untuk memotong teks jika lebih panjang dari maxLength
  const truncateText = (text: string, id: number) => {
    if (!text) return 'Tidak ada deskripsi'; // Jika deskripsi null atau undefined
    if (text.length > maxLength && !expandedIds.includes(id)) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  // Fungsi untuk toggle tampilan deskripsi
  const toggleExpand = (id: number) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((itemId) => itemId !== id)); // Hapus ID jika sudah diperluas
    } else {
      setExpandedIds([...expandedIds, id]); // Tambahkan ID ke daftar expanded
    }
  };


  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const sortedIndeksInovasi = indeksInovasi.sort((a, b) => a.indeks_tahun - b.indeks_tahun);

  const [selectedIndex, setSelectedIndex] = useState<'indeks_skor' | 'ipp_skor' | 'idsd_skor' | 'rb_predikat'>('indeks_skor');

  const handleIndexChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIndex(event.target.value as 'indeks_skor' | 'ipp_skor' | 'idsd_skor' | 'rb_predikat');
  };

  const getLevelLabel = (level: number, indexType: 'indeks_skor' | 'ipp_skor' | 'idsd_skor' | 'rb_predikat') => {
    if (indexType === 'indeks_skor') {
      switch (level) {
        case 1: return 'Belum Dapat Dinilai';
        case 2: return 'Kurang Inovatif';
        case 3: return 'Inovatif';
        case 4: return 'Sangat Inovatif';
        default: return '';
      }
    } else if (indexType === 'ipp_skor') {
      switch (level) {
        case 1: return 'NA';
        case 2: return 'F';
        case 3: return 'E';
        case 4: return 'D';
        case 5: return 'C-';
        case 6: return 'C';
        case 7: return 'B-';
        case 8: return 'B';
        case 9: return 'A-';
        case 10: return 'A';
        default: return '';
      }
    } else if (indexType === 'idsd_skor') {
      switch (level) {
        case 1: return 'NA';
        case 2: return 'RENDAH';
        case 3: return 'SEDANG';
        case 4: return 'TINGGI';
        case 5: return 'SANGAT TINGGI';
        default: return '';
      }
    } else if (indexType === 'rb_predikat') {
      switch (level) {
        case 1: return 'NA';
        case 2: return 'D';
        case 3: return 'CC';
        case 4: return 'C';
        case 5: return 'BB';
        case 6: return 'B';
        case 7: return 'A';
        default: return '';
      }
  };

  const lineChartData = {
    labels: sortedIndeksInovasi.map((data) => data.indeks_tahun),
    datasets: [
      {
        label: selectedIndex === 'indeks_skor' ? 'Indeks Inovasi Daerah' : selectedIndex === 'ipp_skor' ? 'Indeks Pelayanan Publik' : selectedIndex === 'idsd_skor' ? 'Indeks Daya Saing Daerah' : Indeks Reformasi Birokrasi,
        data: sortedIndeksInovasi.map((data) => data[selectedIndex === 'indeks_skor' ? 'indeks_level' : selectedIndex === 'ipp_skor' ? 'ipp_level' : selectedIndex === 'idsd_skor' ? 'idsd_level : rb_level']),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        min: 1,
        max: selectedIndex === 'indeks_skor' ? 4 : selectedIndex === 'ipp_skor' ? 10 : selectedIndex === 'idsd_skor' ? 5 : 7,
        ticks: {
          callback: function (tickValue: string | number) {
            if (typeof tickValue === 'number' && tickValue % 1 === 0) {
              return getLevelLabel(tickValue, selectedIndex);
            } else {
              return '';
            }
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `INDEKS ${selectedIndex === 'indeks_skor' ? 'INOVASI DAERAH' : selectedIndex === 'ipp_skor' ? 'PELAYANAN PUBLIK' : selectedIndex === 'idsd_skor' ? 'DAYA SAING DAERAH' : 'REFORMASI BIROKRASI'} - ${
          kabupaten.find(kab => kab.id_kabkot === selectedKabkot)?.nama ||
          provinces.find(prov => prov.id_provinsi === selectedProvinsi)?.nama ||
          ''
        }`,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const dataIndex = tooltipItem.dataIndex;
            const dataPoint = sortedIndeksInovasi[dataIndex];

            return [
              `Tahun: ${dataPoint.indeks_tahun}`,
              `Skor: ${dataPoint[selectedIndex]}`,
              `Predikat: ${dataPoint[selectedIndex === 'indeks_skor' ? 'indeks_predikat' : selectedIndex === 'ipp_skor' ? 'ipp_predikat' : selectedIndex === 'idsd_skor' ? 'idsd_predikat' : 'rb_predikat']}`,
            ];
          },
        },
      },
    },
  };

  return (
 <div className="app">
   

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    
      {/* Peta Provinsi */}
      <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '100%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', margin: '20px 0 10px 0' }}>
      SEBARAN LABORATORIUM INOVASI
    </h1>
    <hr style={{ width: '100px', border: 'none', height: '2px', background: 'linear-gradient(to right, #16578d, black, #16578d)', margin: '0 auto 20px auto' }} />
    
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
            ><title>{province.nama}</title></path>
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
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    }}
  >
    {/* Popup Box */}
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '80vw',
        maxWidth: '1000px',
        padding: '20px',
        position: 'relative',
        animation: 'fadeIn 0.3s ease-in-out',
      }}
    >
      {/* Close Button */}
      <button
        onClick={() => setSelectedProvinsi(null)} // Menutup popup
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'transparent',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer',
        }}
      >
        ✖
      </button>

      {/* Judul */}
      <h1
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 'bold',
          fontSize: '2rem',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        Daftar Inovasi di Provinsi {provinces.find((prov) => prov.id_provinsi === selectedProvinsi)?.nama}
      </h1>
      <hr
        style={{
          width: '100px',
          border: 'none',
          height: '2px',
          background: 'linear-gradient(to right, #16578d, black, #16578d)',
          margin: '0 auto 20px auto',
        }}
      />

      {/* Konten Popup */}
      <div style={{ display: 'flex', gap: '20px' }}>
  {/* Bagian Kiri (Peta Kabupaten + Grafik) */}
  <div style={{ width: '45%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
    {/* Peta Kabupaten */}
    <svg
      className="map-kabupaten"
      baseProfile="tiny"
      viewBox="-100 0 1000 600"
      height="250px"
      preserveAspectRatio="xMidYMid meet"
      style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      {kabupaten.map((kab) =>
      kab.svg_path ? (
        <path
        key={kab.id_kabkot}
        d={kab.svg_path.replace(/"/g, '')}
        fill={getChoroplethColor(kab.jumlah_inovasi || 0)}
        stroke="black"
        strokeWidth="1"
        onClick={() => loadInovasi(kab.id_kabkot)}
        >
        <title>{kab.nama}</title>
        </path>
      ) : null
      )}
    </svg>

    {/* Grafik */}
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '10px',
        height: '265px', // Sesuaikan tinggi grafik
      }}
    >
      {/* Dropdown for selecting index */}
      <select 
        value={selectedIndex} 
        onChange={handleIndexChange} 
        style={{
          marginBottom: '10px',
          padding: '8px 12px', // Menambahkan padding agar lebih nyaman dilihat
          fontSize: '14px',    // Mengatur ukuran font agar tidak terlalu besar
          borderRadius: '8px',  // Membuat sudut melengkung
          border: '1px solid #ccc', // Border tipis dengan warna abu-abu
          boxShadow: 'none',   // Menghilangkan shadow default jika ada
          outline: 'none',     // Menghilangkan outline saat dropdown aktif
          width: '100%',       // Membuat lebar dropdown responsif
          maxWidth: '300px',   // Membatasi lebar maksimum agar tidak terlalu besar
          backgroundColor: '#fff', // Warna latar putih
          cursor: 'pointer',   // Mengubah pointer saat hover
          transition: 'border-color 0.3s ease', // Efek transisi halus saat hover
        }}
      >
        <option value="indeks_skor">Indeks Inovasi Daerah</option>
        <option value="ipp_skor">Indeks Pelayanan Publik</option>
        <option value="idsd_skor">Indeks Daya Saing Daerah</option>
      </select>

      <Line data={lineChartData} options={lineChartOptions} />
    </div>
  </div>

  {/* Bagian Kanan (Tabel Daftar Inovasi) */}
  <div style={{ width: '55%' }}>
    {selectedProvinsi && (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', width: '48%', textAlign: 'center' }}>
          <strong>{provinces.find(prov => prov.id_provinsi === selectedProvinsi)?.nama}</strong>
          <br />
          {provinces.find(prov => prov.id_provinsi === selectedProvinsi)?.jumlah_inovasi} inovasi
        </div>
        {(kabupaten.length > 0 && (
          <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', width: '48%', textAlign: 'center' }}>
            <strong>{inovasiKabupaten.length > 0 ? kabupaten.find(kab => kab.id_kabkot === inovasiKabupaten[0].id_kabkot)?.nama : 'NA'}</strong>
            <br />
            {inovasiKabupaten.length > 0 ? kabupaten.find(kab => kab.id_kabkot === inovasiKabupaten[0]?.id_kabkot)?.jumlah_inovasi : 'NA'} inovasi
          </div>
        )) || (kabupaten.length === 0 && (
          <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', width: '45%', textAlign: 'center' }}>
            <strong>{kabupaten.find(kab => kab.id_kabkot === selectedKabkot)?.nama}</strong>
            <br />
            NA
          </div>
        ))}
      </div>
    )}
    {currentInovasi.length > 0 ? (
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          tableLayout: 'fixed', // Memastikan lebar kolom tetap konsisten
          fontSize: '0.8rem',
        }}
        >
        {/* Header */}
        <thead style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
          <tr style={{ backgroundColor: '#444', color: 'white', textAlign: 'left' }}>
          <th style={{ padding: '15px', borderBottom: '1px solid #ddd', width: '30%' }}>Judul Inovasi</th>
          <th style={{ padding: '15px', borderBottom: '1px solid #ddd', width: '15%' }}>Tahun</th>
          <th style={{ padding: '15px', borderBottom: '1px solid #ddd', width: '20%' }}>Inovator</th>
          <th style={{ padding: '15px', borderBottom: '1px solid #ddd', width: '35%' }}>Deskripsi</th>
          </tr>
        </thead>
      
        {/* Body */}
        <tbody
          style={{
          display: 'block', // Membuat tbody dapat di-scroll
          maxHeight: '300px', // Tinggi maksimum tbody
          overflowY: 'auto', // Scroll vertikal
          width: '100%', // Lebar tbody sama dengan tabel
          }}
        >
          {currentInovasi.map((inovasi) => (
          <tr
            key={inovasi.id}
            style={{
            display: 'table', // Memastikan baris tetap seperti tabel
            width: '100%', // Lebar baris sama dengan tabel
            tableLayout: 'fixed', // Menjaga lebar kolom tetap konsisten
            }}
          >
            <td style={{ padding: '15px', width: '30%' }}>{inovasi.judul_inovasi}</td>
            <td style={{ padding: '15px', width: '15%' }}>{inovasi.tahun}</td>
            <td style={{ padding: '15px', width: '20%' }}>{inovasi.inovator}</td>
            <td style={{ padding: '15px', width: '35%' }}>
            <span>{truncateText(inovasi.deskripsi, inovasi.id)}</span>
            {inovasi.deskripsi && inovasi.deskripsi.length > maxLength && (
              <button
              onClick={() => toggleExpand(inovasi.id)}
              style={{
                marginLeft: '5px',
                color: 'blue',
                cursor: 'pointer',
                border: 'none',
                background: 'transparent',
                textDecoration: 'underline',
              }}
              >
              {expandedIds.includes(inovasi.id) ? '[Less]' : '[More]'}
              </button>
            )}
            </td>
          </tr>
          ))}
        </tbody>
        </table>
      </div>
    ) : (
      <p>Tidak dapat ditemukan dalam inoland.</p>
    )}

    {totalPages > 1 && (
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            style={{
              padding: '5px 10px',
              margin: '0 5px',
              border: 'none',
              borderRadius: '3px',
              backgroundColor: '#f9f9f9',
              color: '#000',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            Prev
          </button>
        )}
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const pageNumber = currentPage > 3 ? currentPage - 2 + i : i + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              style={{
                padding: '5px 10px',
                margin: '0 5px',
                border: 'none',
                borderRadius: '3px',
                backgroundColor: currentPage === pageNumber ? '#444' : '#f9f9f9',
                color: currentPage === pageNumber ? '#fff' : '#000',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {pageNumber}
            </button>
          );
        })}
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            style={{
              padding: '5px 10px',
              margin: '0 5px',
              border: 'none',
              borderRadius: '3px',
              backgroundColor: '#f9f9f9',
              color: '#000',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            Next
          </button>
        )}
      </div>
    )}
  </div>
</div>
    </div>
  </div>
)}
     <div className="legend" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginTop: '20px', width: '50%', justifyContent: 'center' }}>
  <h3 style={{ marginRight: '20px' }}>LEGENDA</h3>
  <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
    <div className="legend-color" style={{ backgroundColor: '#c6dbef', width: '20px', height: '20px', borderRadius: '3px', marginRight: '5px' }}></div>
    <span>0</span>
  </div>
  <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
    <div className="legend-color" style={{ backgroundColor: '#6baed6', width: '20px', height: '20px', borderRadius: '3px', marginRight: '5px' }}></div>
    <span>1-50</span>
  </div>
  <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
    <div className="legend-color" style={{ backgroundColor: '#4191cb', width: '20px', height: '20px', borderRadius: '3px', marginRight: '5px' }}></div>
    <span>51-100</span>
  </div>
  <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
    <div className="legend-color" style={{ backgroundColor: '#2171b5', width: '20px', height: '20px', borderRadius: '3px', marginRight: '5px' }}></div>
    <span>101-150</span>
  </div>
  <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
    <div className="legend-color" style={{ backgroundColor: '#08519c', width: '20px', height: '20px', borderRadius: '3px', marginRight: '5px' }}></div>
    <span>151-200</span>
  </div>
  <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
    <div className="legend-color" style={{ backgroundColor: '#08306b', width: '20px', height: '20px', borderRadius: '3px', marginRight: '5px' }}></div>
    <span>200+</span>
  </div>
</div>
      </div>
    </div>
  );
  }


export default InteractiveMap;
