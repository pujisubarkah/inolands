import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { supabase } from "../supabaseClient"; // Import Supabase client
import { faSearch, faShare, faFileExcel } from '@fortawesome/free-solid-svg-icons';

const PENSIUN = () => {
  // State untuk menyimpan data pegawai, pagination, dan show per page
  const [pegawai, setPegawai] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk search query
  const [showModal, setShowModal] = useState(false); // Modal state
  const [showRows, setShowRows] = useState(itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      // Mengambil data dari spg_pensiun yang terhubung dengan spg_pegawai melalui peg_id
      const { data, error } = await supabase
        .from('spg_pensiun')
        .select(`
          *,
          spg_pegawai (
            peg_id,
            peg_nama,
            peg_lahir_tempat,
            peg_lahir_tanggal,
            peg_nip,
            gol_id_akhir,
            peg_gol_akhir_tmt,
            jabatan_nama,
            unit_nama,
            peg_jabatan_tmt,
            status_pegawai,
            tmt_status_pegawai,
            masa_kerja_thn,
            masa_kerja_bln
          )
        `)
        .eq('spg_pensiun.peg_id', 'spg_pegawai.peg_id') // Menambahkan kondisi untuk menyambungkan peg_id

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setPegawai(data);
        setTotalItems(data.length);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      }
    };

    fetchData();
  }, [itemsPerPage, searchQuery]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset ke halaman pertama ketika jumlah items berubah
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset ke halaman pertama saat melakukan pencarian baru
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="p-4">
        <div className="overflow-x-auto">
          <h3 className="text-center text-xl font-semibold my-8">DAFTAR PEGAWAI PENSIUN</h3>
          <div className="flex justify-between items-center mb-4">
            {/* Show Rows Dropdown dan Input untuk Pencarian */}
            <div className="flex items-center space-x-4">
              {/* Show Rows Dropdown */}
              <div>
                <label className="mr-2">Show:</label>
                <select
                  value={showRows}
                  onChange={handleItemsPerPageChange}
                  className="p-2 border border-gray-300 rounded"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              {/* Input untuk Pencarian */}
              <div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Cari Pegawai..."
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Tombol Download Data Pegawai */}
            <button
              onClick={() => alert("Download data pegawai")} // Fungsionalitas download
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            > 
              <FontAwesomeIcon icon={faFileExcel} />
              Export to Excel 
            </button>
          </div>

          <table className="min-w-full table-auto border-collapse text-center">
            <thead className="bg-gray-300">
              <tr>
                <th rowSpan="2" className="border px-4 py-2">Nama/Tempat Tgl Lahir</th>
                <th rowSpan="2" className="border px-4 py-2">NIP</th>
                <th colSpan="2" className="border px-4 py-2">Pangkat</th>
                <th rowSpan="2" className="border px-4 py-2">Unit Kerja</th>
                <th colSpan="2" className="border px-4 py-2">Jabatan</th>
                <th colSpan="2" className="border px-4 py-2">Pegawai</th>
                <th colSpan="2" className="border px-4 py-2">Masa Kerja</th>
                <th rowSpan="2" className="border px-4 py-2">TMT PENSIUN</th>
                <th rowSpan="2" className="border px-4 py-2">PILIHAN</th>
              </tr>
              <tr>
                <th className="border px-4 py-2">Gol</th>
                <th className="border px-4 py-2">TMT Gol</th>
                <th className="border px-4 py-2">Nama</th>
                <th className="border px-4 py-2">TMT Jabatan</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">TMT Status</th>
                <th className="border px-4 py-2">Thn</th>
                <th className="border px-4 py-2">Bln</th>
              </tr>
            </thead>
            <tbody>
              {pegawai.map((data, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-left">
                    {data.spg_pegawai?.peg_nama_lengkap} {data.spg_pegawai?.peg_lahir_tempat} , 
                    {(() => {
                      const date = new Date(data.spg_pegawai?.peg_lahir_tanggal);
                      const day = String(date.getDate()).padStart(2, "0");
                      const month = String(date.getMonth() + 1).padStart(2, "0");
                      const year = date.getFullYear();
                      return `${day}-${month}-${year}`;
                    })()}
                  </td>
                  <td className="border px-4 py-2">{data.spg_pegawai?.peg_nip}</td>
                  <td className="border px-4 py-2">{data.spg_pegawai?.nm_gol_akhir}</td>
                  <td className="border px-4 py-2">
                    {new Date(data.spg_pegawai?.peg_gol_akhir_tmt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="border px-4 py-2 text-left">{data.spg_pegawai?.jabatan_nama}</td>
                  <td className="border px-4 py-2 text-left">{data.spg_pegawai?.unit_nama}</td>
                  <td className="border px-4 py-2">{data.spg_pegawai?.jabatan_nama}</td>
                  <td className="border px-4 py-2">
                    {new Date(data.spg_pegawai?.peg_jabatan_tmt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="border px-4 py-2">{data.spg_pegawai?.status_pegawai}</td>
                  <td className="border px-4 py-2">
                    {new Date(data.spg_pegawai?.tmt_status_pegawai).toLocaleDateString("en-GB")}
                  </td>
                  <td className="border px-4 py-2">{data.spg_pegawai?.masa_kerja_thn}</td>
                  <td className="border px-4 py-2">{data.spg_pegawai?.masa_kerja_bln}</td>
                  <td className="border px-4 py-2">
                    {new Date(data.spg_pensiun?.tmt_pensiun).toLocaleDateString("en-GB")}
                  </td>
                  <td className="border px-4 py-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Prev
            </button>
            <div className="flex items-center space-x-2">
              <span>Page {currentPage} of {totalPages}</span>
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PENSIUN;
