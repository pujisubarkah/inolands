import React, { useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  FaTachometerAlt,
  FaSearch,
  FaUser,
  FaBell,
  FaHdd,
  FaTable,
  FaChartPie,
  FaHandPointUp,
  FaUsers,
  FaCog,
  FaUpload,
  FaMobile,
  FaFileExcel,
  FaExchangeAlt,
  FaPowerOff,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const CustomSidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // Untuk mengelola dropdown terbuka

  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  return (
    <Sidebar aria-label="Sidebar with content separator">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* Dashboard */}
          <Sidebar.Item
            as={Link}
            to="/dashboard"
            icon={FaTachometerAlt}
            className="hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent"
          >
            Dashboard
          </Sidebar.Item>

          {/* List Pegawai */}
          <Sidebar.Item
            as={Link}
            to="/list-unit"
            icon={FaUser}
            className="hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent"
          >
            List Pegawai
          </Sidebar.Item>

          {/* Cari Pegawai */}
          <Sidebar.Item
             as={Link}
            to="/list-all-pegawai"
            icon={FaSearch}
            className="hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent"
          >
            Cari Pegawai
          </Sidebar.Item>

          {/* Dropdown: Pegawai Inaktif */}
          <Sidebar.Item
            onClick={() => toggleDropdown("pegawaiInaktif")}
            className="cursor-pointer hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent flex items-center justify-between"
            icon={FaUser}
          >
            List Pegawai Inaktif
            <span className="ml-2">{openDropdown === "pegawaiInaktif" ? "▲" : "▼"}</span>
          </Sidebar.Item>
          {openDropdown === "pegawaiInaktif" && (
            <div className="ml-6 mt-2 space-y-2">
              <Sidebar.Item as={Link}
            to="/pegawai_inaktif/pensiun" className="hover:bg-gray-100 hover:text-teal-500">
                Pensiun
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Meninggal Dunia
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Pindah ke Luar
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                CLTN/Tugas Belajar
              </Sidebar.Item>
            </div>
          )}

          {/* Dropdown: Jabatan Kosong */}
          <Sidebar.Item
            onClick={() => toggleDropdown("jabatanKosong")}
            className="cursor-pointer hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent flex items-center justify-between"
            icon={FaHandPointUp}
          >
            Jabatan Kosong
            <span className="ml-2">{openDropdown === "jabatanKosong" ? "▲" : "▼"}</span>
          </Sidebar.Item>
          {openDropdown === "jabatanKosong" && (
            <div className="ml-6 mt-2 space-y-2">
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Eselon
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Noneselon
              </Sidebar.Item>
            </div>
          )}

          {/* Pegawai Struktural */}
          <Sidebar.Item
            href="#"
            icon={FaUser}
            className="hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent"
          >
            Pegawai Struktural
          </Sidebar.Item>

          {/* Notifikasi */}
          <Sidebar.Item
            href="#"
            icon={FaBell}
            className="hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent"
          >
            Notifikasi
          </Sidebar.Item>

          {/* Data Master */}
          <Sidebar.Item
            href="#"
            icon={FaHdd}
            className="hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent"
          >
            Data Master
          </Sidebar.Item>

          {/* Semua Pegawai */}
          <Sidebar.Item
            href="#"
            icon={FaTable}
            className="hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent"
          >
            Semua Pegawai
          </Sidebar.Item>

          {/* Dropdown: Rekap */}
          <Sidebar.Item
            onClick={() => toggleDropdown("rekap")}
            className="cursor-pointer hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent flex items-center justify-between"
            icon={FaTable}
          >
            Rekap
            <span className="ml-2">{openDropdown === "rekap" ? "▲" : "▼"}</span>
          </Sidebar.Item>
          {openDropdown === "rekap" && (
            <div className="ml-6 mt-2 space-y-2">
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Daftar Urut Kepangkatan
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Unit Kerja
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Jabatan
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Golongan
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Jenis Kelamin
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Tingkat Pendidikan
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Kelompok Usia
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Eselon Jenis Kelamin
              </Sidebar.Item>
            </div>
          )}


          {/* Dropdown: Formasi */}
          <Sidebar.Item
            onClick={() => toggleDropdown("formasi")}
            className="cursor-pointer hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent flex items-center justify-between"
            icon={FaTable}
          >
            Formasi
            <span className="ml-2">{openDropdown === "formasi" ? "▲" : "▼"}</span>
          </Sidebar.Item>
          {openDropdown === "formasi" && (
            <div className="ml-6 mt-2 space-y-2">
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                PNS Akan Naik Pangkat
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                PNS Akan Pensiun
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                PNS Akan Pensiun Jabatan
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                PNS Pindah Keluar
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                PNS Meninggal
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                PNS Sudah Pensiun
              </Sidebar.Item>
            </div>
          )}

        {/* Dropdown: Grafik */}
        <Sidebar.Item
            onClick={() => toggleDropdown("grafik")}
            className="cursor-pointer hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent flex items-center justify-between"
            icon={FaChartPie}
          >
            Grafik
            <span className="ml-2">{openDropdown === "grafik" ? "▲" : "▼"}</span>
          </Sidebar.Item>
          {openDropdown === "formasi" && (
            <div className="ml-6 mt-2 space-y-2">
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Jabatan
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Golongan
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Jenis Kelamin
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Eselon Jenis Kelamin
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Tingkat Pendidikan
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Kelompok Usia
              </Sidebar.Item>
            </div>
          )}

          {/* Absen Presensi */}
          <Sidebar.Item
            href="#"
            icon={FaTable}
            className="hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent"
          >
            Absen / Presensi
          </Sidebar.Item>

          {/* Dropdown: Users */}
          <Sidebar.Item
            onClick={() => toggleDropdown("Users")}
            className="cursor-pointer hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent flex items-center justify-between"
            icon={FaUsers}
          >
            Users
            <span className="ml-2">{openDropdown === "Users" ? "▲" : "▼"}</span>
          </Sidebar.Item>
          {openDropdown === "Users" && (
            <div className="ml-6 mt-2 space-y-2">
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Data Users
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Daftar Role
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Hak Akses User
              </Sidebar.Item>
            </div>
          )}

          {/* ubah password */}
          <Sidebar.Item
            href="#"
            icon={FaCog}
            className="hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent"
          >
            Ubah Password
          </Sidebar.Item>

          {/* komparasi SIASN */}
          <Sidebar.Item
            href="#"
            icon={FaTable}
            className="hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent"
          >
            Komparasi SIASN
          </Sidebar.Item>

          {/* Dropdown: Users */}
          <Sidebar.Item
            onClick={() => toggleDropdown("Kenaikan_pangkat")}
            className="cursor-pointer hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent flex items-center justify-between"
            icon={FaBell}
          >
            Kenaikan Pangkat
            <span className="ml-2">{openDropdown === "kenaikan_pangkat" ? "▲" : "▼"}</span>
          </Sidebar.Item>
          {openDropdown === "Users" && (
            <div className="ml-6 mt-2 space-y-2">
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                List
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Statistik
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Usulan
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100 hover:text-teal-500">
                Draft
              </Sidebar.Item>
            </div>
          )}

          {/* import data */}
          <Sidebar.Item
            href="#"
            icon={FaUpload}
            className="hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent"
          >
            Import Data
          </Sidebar.Item>

          {/* kontak */}
          <Sidebar.Item
            href="#"
            icon={FaMobile}
            className="hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent"
          >
            Kontak
          </Sidebar.Item>

          {/* ekspor data */}
          <Sidebar.Item
            href="#"
            icon={FaFileExcel}
            className="hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent"
          >
            Ekspor Data
          </Sidebar.Item>

          {/* ekspor data */}
          <Sidebar.Item
            href="#"
            icon={FaExchangeAlt}
            className="hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent"
          >
            Migrasi SIASN
          </Sidebar.Item>

          {/* Logout */}
          <Sidebar.Item
            href="#"
            icon={FaPowerOff}
            className="hover:bg-white hover:text-teal-500 hover:border-teal-500 border border-transparent"
          >
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default CustomSidebar;
