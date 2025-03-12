import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Import Leaflet untuk custom icon

// Custom icon dengan warna berbeda
const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const yellowIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const greenIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Data lokasi dengan tahun
const locations = [
  { lat: -7.797068, lng: 110.370529, name: "Kota Yogyakarta", year: 2015 },
  { lat: -6.8365, lng: 108.227, name: "Kab. Majalengka", year: 2016 },
  { lat: -3.6593, lng: 103.7642, name: "Kab. Muara Enim", year: 2017 },
  { lat: -7.3264, lng: 108.3537, name: "Kab. Ciamis", year: 2015 },
  { lat: -10.1788, lng: 123.5976, name: "Kota Kupang", year: 2016 },
  { lat: -7.6686, lng: 109.6525, name: "Kab. Kebumen", year: 2017 },
];

// Fungsi untuk memilih ikon berdasarkan tahun
const getIconByYear = (year: number) => {
  if (year === 2015) return redIcon;
  if (year === 2016) return yellowIcon;
  if (year === 2017) return greenIcon;
  return redIcon; // Default merah jika tahun tidak sesuai
};

const MyMap = () => {
  return (
    <MapContainer 
      center={[-2.5, 118]} // Posisi awal di tengah Indonesia
      zoom={5} 
      style={{ height: "500px", width: "100%" }}
      dragging={false} // Mencegah geser peta
      zoomControl={false} // Menghilangkan kontrol zoom
      scrollWheelZoom={false} // Mencegah zoom dengan scroll
      doubleClickZoom={false} // Mencegah zoom dengan double click
      touchZoom={false} // Mencegah zoom dengan gesture di HP
    >
      {/* Layer Peta */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Marker Lokasi */}
      {locations.map((loc, index) => (
        <Marker key={index} position={[loc.lat, loc.lng]} icon={getIconByYear(loc.year)}>
          <Popup>
            <b>{loc.name}</b> <br />
            Tahun: {loc.year}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MyMap;
