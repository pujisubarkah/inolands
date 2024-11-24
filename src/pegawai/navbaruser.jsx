import { useState } from "react";

function Navbar() {
  // State untuk mengontrol dropdown
  const [dropdownOneOpen, setDropdownOneOpen] = useState(false);
  const [dropdownTwoOpen, setDropdownTwoOpen] = useState(false);

  return (
    <div className="flex justify-center p-4 bg-gray-100">
      <ul className="flex flex-wrap items-center gap-4">
        {/* Tab Biasa */}
        <li>
          <a
            href="#data-pribadi"
            className="text-gray-600 hover:text-blue-500 px-4 py-2 transition"
          >
            Data Pribadi
          </a>
        </li>

        <li>
          <a
            href="#file-pegawai"
            className="text-blue-500 px-4 py-2 border-b-2 border-blue-500"
          >
            Arsip/Dokumen Digital
          </a>
        </li>

        {/* Dropdown 1 */}
        <li className="relative">
          <button
            onClick={() => setDropdownOneOpen(!dropdownOneOpen)}
            className="flex items-center text-gray-600 hover:text-blue-500 px-4 py-2 focus:outline-none"
          >
            Riwayat Pengembangan Kompetensi
            <svg
              className="w-4 h-4 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {/* Dropdown Menu */}
          {dropdownOneOpen && (
            <ul className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-lg">
              <li>
                <a
                  href="#riwayat-pendidikan-formal"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Pendidikan
                </a>
              </li>
              <li>
                <a
                  href="#riwayat-diklat-struktural"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Pelatihan Struktural
                </a>
              </li>
              <li>
                <a
                  href="#riwayat-diklat-fungsional"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Pelatihan Fungsional
                </a>
              </li>
            </ul>
          )}
        </li>

        {/* Dropdown 2 */}
        <li className="relative">
          <button
            onClick={() => setDropdownTwoOpen(!dropdownTwoOpen)}
            className="flex items-center text-gray-600 hover:text-blue-500 px-4 py-2 focus:outline-none"
          >
            Kinerja dan Prestasi
            <svg
              className="w-4 h-4 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {/* Dropdown Menu */}
          {dropdownTwoOpen && (
            <ul className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-lg">
              <li>
                <a
                  href="#skp"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Sasaran Kerja Pegawai
                </a>
              </li>
              <li>
                <a
                  href="#angka-kredit"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Penilaian Angka Kredit
                </a>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
