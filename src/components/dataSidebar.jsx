import {
  FaTachometerAlt,
  FaSearch,
  FaUser,
  FaBell,
  FaHdd,
  FaList,
  FaTable,
  FaChartPie,
  FaHandPointUp,
} from "react-icons/fa";

export const sidebarData = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: FaTachometerAlt,
  },
  {
    label: "List Pegawai",
    to: "/list_unit",
    icon: FaList,
  },
  {
    label: "Cari Pegawai",
    to: "/list_all_pegawai",
    icon: FaList,
  },
  {
    label: "List Pegawai Inaktif",
    dropdown: true,
    icon: FaList,
    children: [
      { label: "Pensiun", to: "/pegawai_inaktif/pensiun" },
      { label: "Meninggal Dunia", to: "/pegawai_inaktif/meninggal" },
      { label: "Pindah ke Luar", to: "/pegawai_inaktif/pindah" },
      { label: "CLTN/Tugas Belajar", to: "#" },
    ],
  },
  {
    label: "Jabatan Kosong",
    dropdown: true,
    icon: FaHandPointUp,
    children: [
      { label: "Eselon", to: "#" },
      { label: "Noneselon", to: "#" },
    ],
  },
  {
    label: "Pegawai Struktural",
    to: "#",
    icon: FaUser,
  },
  {
    label: "Notifikasi",
    to: "#",
    icon: FaBell,
  },
  {
    label: "Data Master",
    to: "#",
    icon: FaHdd,
  },
  {
    label: "Rekap",
    dropdown: true,
    icon: FaTable,
    children: [
      { label: "Daftar Urut Kepangkatan", to: "#" },
      { label: "Unit Kerja", to: "#" },
      { label: "Jabatan", to: "#" },
    ],
  },
  {
    label: "Grafik",
    dropdown: true,
    icon: FaChartPie,
    children: [
      { label: "Jabatan", to: "#" },
      { label: "Golongan", to: "#" },
    ],
  },
];
