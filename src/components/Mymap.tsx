import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Import Leaflet untuk custom icon
import { useState } from "react";

// Custom icons berdasarkan tahun dengan ikon berbeda
const icons: { [key: number]: L.Icon } = {
  2015: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32], className: "icon-2015" }),
  2016: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32], className: "icon-2016" }),
  2017: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32], className: "icon-2017" }),
  2018: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32], className: "icon-2018" }),
  2019: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32], className: "icon-2019" }),
  2020: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32], className: "icon-2020" }),
  2021: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32], className: "icon-2021" }),
  2022: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32], className: "icon-2022" }),
  2023: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32], className: "icon-2023" }),
  2024: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32], className: "icon-2024" }),
};

// CSS untuk warna berbeda berdasarkan tahun
const style = document.createElement("style");
style.innerHTML = `
  .icon-2015 { filter: hue-rotate(0deg) brightness(1.1); } /* Merah lembut */
  .icon-2016 { filter: hue-rotate(40deg) brightness(1.1); } /* Kuning keemasan */
  .icon-2017 { filter: hue-rotate(120deg) brightness(1.1); } /* Hijau segar */
  .icon-2018 { filter: hue-rotate(200deg) brightness(1.1); } /* Biru lembut */
  .icon-2019 { filter: hue-rotate(280deg) brightness(1.1); } /* Ungu pastel */
  .icon-2020 { filter: hue-rotate(320deg) brightness(1.1); } /* Oranye lembut */
  .icon-2021 { filter: hue-rotate(340deg) brightness(1.1); } /* Pink lembut */
  .icon-2022 { filter: hue-rotate(340deg) brightness(1.3); } /* Pink terang */
  .icon-2023 { filter: grayscale(100%) brightness(0.7); } /* Abu-abu gelap */
  .icon-2024 { filter: grayscale(100%) brightness(0.9); } /* Abu-abu terang */
`;
document.head.appendChild(style);
  

// Data lokasi dengan tahun
const locations = [
  { lat: -7.8013672, lng: 110.3647568, name: "KOTA YOGYAKARTA", year: 2015 },
  { lat: -6.7790605, lng: 108.2852049, name: "KAB. MAJALENGKA", year: 2015 },
  { lat: -3.7114163, lng: 104.0072348, name: "KAB. MUARA ENIM", year: 2015 },
  { lat: -7.3320773, lng: 108.3492543, name: "KAB. CIAMIS", year: 2015 },
  { lat: -10.1771997, lng: 123.6070329, name: "KOTA KUPANG", year: 2016 },
  { lat: -7.6680559, lng: 109.6524575, name: "KAB. KEBUMEN", year: 2016 },
  { lat: 2.5135376, lng: 98.2212979, name: "KAB. PAKPAK BHARAT", year: 2016 },
  { lat: -0.0263303, lng: 109.3425039, name: "KOTA PONTIANAK", year: 2016 },
  { lat: 3.3273599, lng: 117.5785049, name: "KAB. TARAKAN", year: 2016 },
  { lat: 2.9397267, lng: 98.5093057, name: "KAB. KARO", year: 2016 },
  { lat: -7.3058578, lng: 109.4259114, name: "KAB. PURBALINGGA", year: 2016 },
  { lat: -0.1336655, lng: 116.6081653, name: "KAB. KUTAI KARTANEGARA", year: 2016 },
  { lat: -6.7726186, lng: 110.8791343, name: "KAB. KUDUS", year: 2016 },
  { lat: -7.5012204, lng: 107.763621, name: "KAB. GARUT", year: 2016 },
  { lat: -5.507078, lng: 122.596901, name: "KAB. BAU-BAU", year: 2016 },
  { lat: -0.4948232, lng: 117.1436154, name: "KOTA SAMARINDA", year: 2016 },
  { lat: -0.9758379, lng: 112.8105512, name: "KAB. KATINGAN", year: 2016 },
  { lat: -7.43027, lng: 111.0091855, name: "KAB. SRAGEN", year: 2017 },
  { lat: -4.8008086, lng: 105.3131185, name: "KAB. LAMPUNG TENGAH", year: 2017 },
  { lat: -0.7885335, lng: 100.6549823, name: "KOTA SOLOK", year: 2017 },
  { lat: -4.7443383, lng: 120.0665236, name: "KAB. BONE", year: 2017 },
  { lat: -4.901629, lng: 122.6277455, name: "KAB. MUNA", year: 2017 },
  { lat: -7.5754887, lng: 110.8243272, name: "KOTA SURAKARTA", year: 2017 },
  { lat: -7.4832133, lng: 109.140438, name: "KAB. BANYUMAS", year: 2017 },
  { lat: -3.3200228, lng: 114.9991464, name: "KAB. BANJAR", year: 2017 },
  { lat: 3.0730929, lng: 116.0413889, name: "PROV KALTARA", year: 2017 },
  { lat: -3.6553932, lng: 128.1907723, name: "KOTA AMBON", year: 2017 },
  { lat: -8.091221, lng: 111.9641728, name: "KOTA TULUNGAGUNG", year: 2017 },
  { lat: -7.9190169, lng: 110.3785438, name: "KAB. BANTUL", year: 2017 },
  { lat: -5.554579, lng: 119.6730939, name: "KAB. JENEPONTO", year: 2017 },
  { lat: -4.0096221, lng: 119.6290617, name: "KOTA PAREPARE", year: 2017 },
  { lat: 4.0809649, lng: 116.6081653, name: "KAB. NUNUKAN", year: 2017 },
  { lat: 2.2791966, lng: 118.0908588, name: "KAB. BERAU", year: 2017 },
  { lat: 4.2328871, lng: 98.0028892, name: "KAB. ACEH TAMIANG", year: 2017 },
  { lat: 5.8926053, lng: 95.3237608, name: "KOTA SABANG", year: 2017 },
  { lat: -7.6513306, lng: 108.1428669, name: "KAB. TASIKMALAYA", year: 2017 },
  { lat: -6.4024844, lng: 106.7942405, name: "KOTA DEPOK", year: 2017 },
  { lat: -2.5916025, lng: 140.6689995, name: "KOTA JAYAPURA", year: 2018 },
  { lat: -0.8761629, lng: 131.255828, name: "KOTA SORONG", year: 2018 },
  { lat: -9.1538978, lng: 124.906551, name: "KAB. BELU", year: 2018 },
  { lat: 0.5060207, lng: 127.681228, name: "KAB. TIDORE KEPULAUAN", year: 2018 },
  { lat: -6.1946502, lng: 134.5501935, name: "KAB. KEPULAUAN ARU", year: 2018 },
  { lat: -8.5363958, lng: 118.3461948, name: "KAB. DOMPU", year: 2018 },
  { lat: -5.67046665, lng: 123.7939457, name: "KAB. WAKATOBI", year: 2018 },
  { lat: 1.5327973, lng: 124.994751, name: "KAB. MINAHASA UTARA", year: 2018 },
  { lat: -3.4512244, lng: 115.5681084, name: "KAB. TANAH BUMBU", year: 2018 },
  { lat: -2.1225475, lng: 112.8105512, name: "KAB. KOTAWARINGIN TIMUR", year: 2018 },
  { lat: -1.426001, lng: 98.9245343, name: "KAB. MENTAWAI", year: 2018 },
  { lat: -7.3305234, lng: 110.5084366, name: "KOTA SALATIGA", year: 2018 },
  { lat: 0.1460923, lng: 102.2547919, name: "KAB. PELALAWAN", year: 2018 },
  { lat: -7.4704747, lng: 112.4401329, name: "KOTA MOJOKERTO", year: 2018 },
  { lat: -7.4832133, lng: 109.140438, name: "KAB. BANYUMAS", year: 2018 },
  { lat: -7.5754887, lng: 110.8243272, name: "KOTA SURAKARTA", year: 2018 },
  { lat: -0.2209392, lng: 100.1703257, name: "KAB. AGAM", year: 2018 },
  { lat: -0.948041, lng: 100.3630901, name: "KOTA PADANG", year: 2018 },
  { lat: -7.3058578, lng: 109.4259114, name: "KAB. PURBALINGGA", year: 2018 },
  { lat: -1.7223147, lng: 100.8903099, name: "KAB. PESISIR SELATAN", year: 2018 },
  { lat: -7.8717562, lng: 113.4776098, name: "KAB. PROBOLINGGO", year: 2018 },
  { lat: -6.1397339, lng: 106.040506, name: "KAB. SERANG", year: 2018 },
  { lat: -6.984746, lng: 111.9522491, name: "KAB. TUBAN", year: 2018 },
  { lat: -0.956178, lng: 122.6277455, name: "KAB. BANGGAI", year: 2018 },
  { lat: -0.4797043, lng: 100.5746224, name: "KAB. TANAH DATAR", year: 2018 },
  { lat: -7.7764226, lng: 113.2037131, name: "KOTA PROBOLINGGO", year: 2018 },
  { lat: -7.1340702, lng: 107.6215321, name: "KAB. BANDUNG", year: 2018 },
  { lat: -6.5643956, lng: 106.2522143, name: "KAB. LEBAK", year: 2018 },
  { lat: -6.7449635, lng: 111.0460407, name: "KAB. PATI", year: 2018 },
  { lat: -4.0044783, lng: 105.3131185, name: "KAB. MESUJI", year: 2018 },
  { lat: -7.6469193, lng: 112.8999225, name: "KOTA PASURUAN", year: 2019 },
  { lat: 2.3465638, lng: 99.8124935, name: "KAB. LABUHAN BATU UTARA", year: 2019 },
  { lat: 2.3439863, lng: 100.1703257, name: "KAB. LABUHAN BATU", year: 2019 },
  { lat: -1.6468883, lng: 120.4357631, name: "KAB. POSO", year: 2019 },
  { lat: 0.2209392, lng: 100.1703257, name: "KAB. PASAMAN", year: 2019 },
  { lat: 0.5070677, lng: 101.4477793, name: "KOTA PEKANBARU", year: 2019 },
  { lat: -6.0186817, lng: 106.0558218, name: "KOTA CILEGON", year: 2019 },
  { lat: -6.1397339, lng: 106.040506, name: "KAB. SERANG", year: 2019 },
  { lat: -7.3305234, lng: 110.5084366, name: "KOTA SALATIGA", year: 2019 },
  { lat: -3.0166501, lng: 129.4864411, name: "KAB. MALUKU TENGAH", year: 2019 },
  { lat: 0.5817607, lng: 120.8039474, name: "KAB. PARIGI MOUTONG", year: 2019 },
  { lat: -1.3075939, lng: 123.0338767, name: "KAB. BANGGAI KEPULAUAN", year: 2019 },
  { lat: 4.4482641, lng: 96.8350999, name: "KAB. ACEH TENGAH", year: 2019 },
  { lat: -6.1169309, lng: 106.1538519, name: "KOTA SERANG", year: 2019 },
  { lat: -6.8797041, lng: 109.1255917, name: "KOTA TEGAL", year: 2019 },
  { lat: 0.3897139, lng: 109.140438, name: "KAB. MEMPAWAH", year: 2019 },
  { lat: -3.6553932, lng: 128.1907723, name: "KOTA AMBON", year: 2019 },
  { lat: -0.2246548, lng: 100.6318006, name: "KOTA PAYAKUMBUH", year: 2019 },
  { lat: -7.7888522, lng: 114.1914951, name: "KAB. SITUBONDO", year: 2019 },
  { lat: -6.366723, lng: 107.1735638, name: "KAB. BEKASI", year: 2019 },
  { lat: -6.9902371, lng: 109.140438, name: "KAB. TEGAL", year: 2019 },
  { lat: -6.2835218, lng: 106.7112933, name: "KOTA TANGERANG SELATAN", year: 2019 },
  { lat: 0.2213005, lng: 99.634135, name: "KAB. PASAMAN BARAT", year: 2019 },
  { lat: -8.1308657, lng: 112.2200091, name: "KAB. BLITAR", year: 2019 },
  { lat: -8.6796987, lng: 120.3896651, name: "KAB. MANGGARAI", year: 2020 },
  { lat: -1.9354109, lng: 119.5107708, name: "KAB. MAMUJU TENGAH", year: 2020 },
  { lat: -4.0499387, lng: 102.7135121, name: "KAB. SELUMA", year: 2020 },
  { lat: -6.7482706, lng: 105.6881788, name: "KAB. PANDEGLANG", year: 2020 },
  { lat: -6.1870007, lng: 106.487658, name: "KAB. TANGERANG", year: 2020 },
  { lat: -0.4660955, lng: 100.3984148, name: "KOTA PADANG PANJANG", year: 2020 },
  { lat: -3.3200228, lng: 114.9991464, name: "KAB. BANJAR", year: 2020 },
  { lat: -7.4832133, lng: 109.140438, name: "KAB. BANYUMAS", year: 2020 },
  { lat: 4.7873684, lng: 95.6457951, name: "KAB. ACEH JAYA", year: 2020 },
  { lat: -3.3200228, lng: 114.9991464, name: "KAB. BANJAR", year: 2021 },
  { lat: -8.3739076, lng: 116.2777073, name: "KAB. LOMBOK UTARA", year: 2021 },
  { lat: -1.098757, lng: 121.5370003, name: "KAB. TOJO UNA UNA", year: 2021 },
  { lat: -1.1223204, lng: 131.4883373, name: "KAB. SORONG", year: 2021 },
  { lat: -7.5322642, lng: 131.3611121, name: "KAB. KEPULAUAN TANIMBAR", year: 2021 },
  { lat: -6.5622871, lng: 107.7680748, name: "KAB. SUBANG", year: 2021 },
  { lat: -7.0599422, lng: 109.4259114, name: "KAB. PEMALANG", year: 2021 },
  { lat: -0.3039178, lng: 100.383479, name: "KOTA BUKITTINGGI", year: 2021 },
  { lat: -1.1120568, lng: 101.6157773, name: "KAB. DHARMASRAYA", year: 2021 },
  { lat: -1.8720467, lng: 101.4339148, name: "KAB. KERINCI", year: 2021 },
  { lat: -7.4832133, lng: 109.140438, name: "KAB. BANYUMAS", year: 2021 },
  { lat: -6.1870007, lng: 106.487658, name: "KAB. TANGERANG", year: 2021 },
  { lat: -6.9902371, lng: 109.140438, name: "KAB. TEGAL", year: 2021 },
  { lat: -0.4660955, lng: 100.3984148, name: "KOTA PADANG PANJANG", year: 2021 },
  { lat: -7.0599422, lng: 109.4259114, name: "KAB. PEMALANG", year: 2022 },
  { lat: -0.3039178, lng: 100.383479, name: "KOTA BUKITTINGGI", year: 2022 },
  { lat: -1.8720467, lng: 101.4339148, name: "KAB. KERINCI", year: 2022 },
  { lat: -7.0265442, lng: 110.1879106, name: "KAB. KENDAL", year: 2022 },
  { lat: -3.3200228, lng: 114.9991464, name: "KAB. BANJAR", year: 2022 },
  { lat: -6.5622871, lng: 107.7680748, name: "KAB. SUBANG", year: 2022 },
  { lat: 0.7432372, lng: 99.3673084, name: "KAB. MANDAILING NATAL", year: 2022 },
  { lat: 0.146671, lng: 101.1617356, name: "KAB. KAMPAR", year: 2022 },
  { lat: -0.6256517, lng: 100.1233396, name: "KOTA PARIAMAN", year: 2022 },
  { lat: -7.4797342, lng: 110.2176941, name: "KOTA MAGELANG", year: 2022 },
  { lat: -1.8268344, lng: 124.7740793, name: "KAB. PULAU TALIABU", year: 2022 },
  { lat: -0.956178, lng: 122.6277455, name: "KAB. BANGGAI", year: 2022 },
  { lat: 2.8174722, lng: 99.634135, name: "KAB. ASAHAN", year: 2022 },
  { lat: -1.2592999, lng: 102.3463875, name: "KAB. TEBO", year: 2022 },
  { lat: -4.0096221, lng: 119.6290617, name: "KOTA PAREPARE", year: 2022 },
  { lat: -7.3058578, lng: 109.4259114, name: "KAB. PURBALINGGA", year: 2022 },
  { lat: -6.0186817, lng: 106.0558218, name: "KOTA CILEGON", year: 2022 },
  { lat: 2.9659488, lng: 99.7983506, name: "KOTA TANJUNG BALAI", year: 2022 },
  { lat: -6.7482706, lng: 105.6881788, name: "KAB. PANDEGLANG", year: 2022 },
  { lat: -1.1120568, lng: 101.6157773, name: "KAB. DHARMASRAYA", year: 2022 },
  { lat: -2.5442029, lng: 103.7289167, name: "KAB. MUSI BANYUASIN", year: 2022 },
  { lat: -5.4329368, lng: 120.2051096, name: "KAB. BULUKUMBA", year: 2022 },
  { lat: -9.7762816, lng: 124.4198243, name: "KAB. TIMOR TENGAH SELATAN", year: 2022 },
  { lat: 1.3166036, lng: 97.394882, name: "KAB. NIAS UTARA", year: 2022 },
  { lat: -8.4973832, lng: 140.395268, name: "KAB. MERAUKE", year: 2022 },
  { lat: -6.0186817, lng: 106.0558218, name: "KOTA CILEGON", year: 2023 },
  { lat: -7.0265442, lng: 110.1879106, name: "KAB. KENDAL", year: 2023 },
  { lat: -6.5622871, lng: 107.7680748, name: "KAB. SUBANG", year: 2023 },
  { lat: 0.146671, lng: 101.1617356, name: "KAB. KAMPAR", year: 2023 },
  { lat: -0.6647007, lng: 101.0711758, name: "KAB. SIJUNJUNG", year: 2023 },
  { lat: -8.4719075, lng: 123.4831906, name: "KAB. LEMBATA", year: 2023 },
  { lat: -0.4233155, lng: 119.8352303, name: "KAB. DONGGALA", year: 2023 },
  { lat: -7.0599422, lng: 109.4259114, name: "KAB. PEMALANG", year: 2023 },
  { lat: -3.3200228, lng: 114.9991464, name: "KAB. BANJAR", year: 2023 },
  { lat: -1.6311761, lng: 121.3541631, name: "KAB. MOROWALI UTARA", year: 2023 },
  { lat: -7.3505808, lng: 108.2171633, name: "KOTA TASIKMALAYA", year: 2024 },
  { lat: -1.1223204, lng: 131.4883373, name: "KAB. SORONG", year: 2024 },
  { lat: -6.0186817, lng: 106.0558218, name: "KOTA CILEGON", year: 2024 },
  { lat: -6.1397339, lng: 106.040506, name: "KAB. SERANG", year: 2024 },
  { lat: -3.3200228, lng: 114.9991464, name: "KAB. BANJAR", year: 2024 },
  { lat: -7.0265442, lng: 110.1879106, name: "KAB. KENDAL", year: 2024 },
];

// Fungsi untuk memilih ikon berdasarkan tahun
const getIconByYear = (year: number) => {
  return icons[year] || icons[2015]; // Default merah jika tahun tidak sesuai
};



const MapComponent = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Mendapatkan daftar tahun unik dari data lokasi
  const years = Array.from(new Set(locations.map(loc => loc.year)));

  // Filter lokasi berdasarkan tahun yang dipilih
  const filteredLocations = selectedYear ? locations.filter(loc => loc.year === selectedYear) : locations;

  return (
    <div style={{ position: "relative", height: "500px", width: "100%" }}>
      {/* Dropdown untuk memilih tahun */}
      <select 
        onChange={(e) => setSelectedYear(Number(e.target.value))} 
        value={selectedYear !== null ? selectedYear : ''} 
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 10000, // Pastikan dropdown di atas peta
          padding: "5px 10px", // Tambahkan padding horizontal agar tulisan tidak terlalu mepet
          borderRadius: "10px",
          backgroundColor: "white",
          border: "1px solid #ccc",
          appearance: "none", // Hilangkan default arrow browser
          backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"%23000000\"><path d=\"M7 10l5 5 5-5z\"/></svg>')", // Tambahkan custom arrow
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
          backgroundSize: "12px",
        }}
      >
        <option value="">Semua Tahun</option>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      {/* Overlay Teks di bawah Dropdown */}
      <div style={{
        position: "absolute",
        top: "60px", // Memberikan jarak lebih dari dropdown
        right: "10px",
        zIndex: 1000,
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Background putih semi-transparan
        color: "#333", // Warna teks abu-abu gelap untuk kontras
        padding: "15px", // Padding lebih besar untuk kenyamanan
        borderRadius: "8px", // Sudut lebih halus
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Tambahkan bayangan untuk efek elegan
        maxWidth: "320px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Font modern dan bersih
        fontSize: "14px", // Ukuran font yang nyaman dibaca
        lineHeight: "1.6", // Jarak antar baris untuk keterbacaan
      }}>
        <p><strong>INOLAND</strong> adalah web informasi Laboratorium Inovasi yang juga merupakan sistem integrasi untuk penguatan kapasitas berinovasi, terdiri dari berbagai program advokasi pembelajaran inovasi.</p>
      </div>

      <MapContainer center={[-2.5, 117.5]} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredLocations.map((location, index) => (
          <Marker 
            key={index} 
            position={[location.lat, location.lng]} 
            icon={getIconByYear(location.year)}
          >
            <Popup>
              {location.name} - {location.year}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
