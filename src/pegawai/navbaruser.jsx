import { useState } from "react";

function Navbar() {
  // State untuk mengontrol dropdown
  const [dropdownOneOpen, setDropdownOneOpen] = useState(false);
  const [dropdownTwoOpen, setDropdownTwoOpen] = useState(false);

  return (
    <header className="py-5 bg-teal-200 text-white shadow-md">
      <div className="container mx-auto px-40 flex flex-wrap items-center justify-between">
        <nav>
          <ul className="flex space-x-8">
            <li>
              <a
                href="#"
                className="uppercase text-gray-500 hover:text-gray-800 relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500 after:bg-gray-500"
              >
                Data Pribadi
              </a>
            </li>
            <li>
              <a
                href="#"
                className="uppercase text-gray-500 hover:text-gray-800 relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500 after:bg-gray-500"
              >
                Arsip/Dokumen Digital
              </a>
            </li>

            {/* Dropdown Riwayat Pengembangan Kompetensi */}
            <li
              className="relative"
              onMouseEnter={() => setDropdownOneOpen(true)}
              onMouseLeave={() => setDropdownOneOpen(false)}
            >
              <a
                href="#"
                className="uppercase text-gray-500 hover:text-gray-800 relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500 after:bg-gray-500"
              >
                Riwayat Pengembangan Kompetensi
              </a>
              {dropdownOneOpen && (
                <ul className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Pendidikan
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Pelatihan Struktural
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Pelatihan Fungsional
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* Dropdown Kinerja dan Prestasi */}
            <li
              className="relative"
              onMouseEnter={() => setDropdownTwoOpen(true)}
              onMouseLeave={() => setDropdownTwoOpen(false)}
            >
              <a
                href="#"
                className="uppercase text-gray-500 hover:text-gray-800 relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500 after:bg-gray-500"
              >
                Kinerja dan Prestasi
              </a>
              {dropdownTwoOpen && (
                <ul className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sasaran Kerja Pegawai
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Penilaian Angka Kredit
                    </a>
                  </li>
              
                </ul>
              )}
            </li>
                <li>
              <a
                href="#"
                className="uppercase text-gray-500 hover:text-gray-800 relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-500 after:bg-gray-500"
              >
                KELUARGA
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
