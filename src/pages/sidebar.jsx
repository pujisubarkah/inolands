import React, { useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  FaTachometerAlt,
  FaSearch,
  FaUser,
  FaShoppingBag,
  FaArrowRight,
  FaTable,
  FaPowerOff
} from "react-icons/fa";
import { Link } from "react-router-dom";

const CustomSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Dashboard
          </Sidebar.Item>

          {/* List Pegawai */}
          <Sidebar.Item
            as={Link}
            to="/list-unit"
            icon={FaUser}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            List Pegawai
          </Sidebar.Item>

          {/* Cari Pegawai */}
          <Sidebar.Item
            href="#"
            icon={FaSearch}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Cari Pegawai
          </Sidebar.Item>

          {/* Dropdown for Pegawai Inaktif */}
          <Sidebar.Item
            onClick={toggleDropdown}
            className="cursor-pointer hover:bg-white hover:border-teal-500 border border-transparent flex items-center justify-between"
            icon={FaUser}
          >
            List Pegawai Inaktif
            <span className="ml-2">{isDropdownOpen ? "▲" : "▼"}</span>
          </Sidebar.Item>

          {isDropdownOpen && (
            <div className="ml-6 mt-2 space-y-2">
              <Sidebar.Item href="#" className="hover:bg-gray-100">
                Pensiun
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100">
                Meninggal Dunia
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100">
                Pindah ke Luar
              </Sidebar.Item>
              <Sidebar.Item href="#" className="hover:bg-gray-100">
                CLTN/Tugas Belajar
              </Sidebar.Item>
            </div>
          )}

          {/* Pegawai Struktural */}
          <Sidebar.Item
            href="#"
            icon={FaShoppingBag}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Pegawai Struktural
          </Sidebar.Item>

          {/* Notifikasi */}
          <Sidebar.Item
            href="#"
            icon={FaArrowRight}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Notifikasi
          </Sidebar.Item>

          {/* Data Master */}
          <Sidebar.Item
            href="#"
            icon={FaTable}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Data Master
          </Sidebar.Item>

          {/* Semua Pegawai */}
          <Sidebar.Item
            href="#"
            icon={FaTable}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Semua Pegawai
          </Sidebar.Item>


        {/* Data Master */}
        <Sidebar.Item
            href="#"
            icon={FaSearch}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Pencarian Dinamis
          </Sidebar.Item>


{/* Data Master */}
<Sidebar.Item
            href="#"
            icon={FaSearch}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Pencarian Dinamis
          </Sidebar.Item>

{/* Data Master */}
<Sidebar.Item
            href="#"
            icon={FaSearch}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Pencarian Dinamis
          </Sidebar.Item>


{/* Data Master */}
<Sidebar.Item
            href="#"
            icon={FaSearch}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Pencarian Dinamis
          </Sidebar.Item>


{/* Data Master */}
<Sidebar.Item
            href="#"
            icon={FaSearch}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Pencarian Dinamis
          </Sidebar.Item>

{/* Data Master */}
<Sidebar.Item
            href="#"
            icon={FaSearch}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Pencarian Dinamis
          </Sidebar.Item>

{/* Data Master */}
<Sidebar.Item
            href="#"
            icon={FaSearch}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Pencarian Dinamis
          </Sidebar.Item>
{/* Data Master */}
<Sidebar.Item
            href="#"
            icon={FaSearch}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Pencarian Dinamis
          </Sidebar.Item>
{/* Data Master */}
<Sidebar.Item
            href="#"
            icon={FaSearch}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Pencarian Dinamis
          </Sidebar.Item>
 {/* Data Master */}
<Sidebar.Item
            href="#"
            icon={FaSearch}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Pencarian Dinamis
          </Sidebar.Item>
          {/* Data Master */}
          <Sidebar.Item
            href="#"
            icon={FaSearch}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Pencarian Dinamis
          </Sidebar.Item>
          {/* Data Master */}
          <Sidebar.Item
            href="#"
            icon={FaSearch}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Pencarian Dinamis
          </Sidebar.Item>
          {/* Data Master */}
          <Sidebar.Item
            href="#"
            icon={FaSearch}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Pencarian Dinamis
          </Sidebar.Item>
          {/* Data Master */}
          <Sidebar.Item
            href="#"
            icon={FaSearch}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Pencarian Dinamis
          </Sidebar.Item>
          
                   
          {/* Logout */}
          <Sidebar.Item
            href="#"
            icon={FaPowerOff}
            className="hover:bg-white hover:border-teal-500 border border-transparent"
          >
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default CustomSidebar;
