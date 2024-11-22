import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { supabase } from "../supabaseClient"; // Import Supabase client
import {  faSearch, faShare } from '@fortawesome/free-solid-svg-icons';

const BELAJAR = () => {
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
    // Fetch data pegawai dari Supabase dengan pencarian dan pagination
    const fetchData = async () => {
      let query = supabase
        .schema('siap')
        .from('spg_pegawai_inaktif') // Ganti dengan nama table atau view yang sesuai
        .select('*', { count: 'exact' })
        .order('peg_nama', { ascending: true }) // Mengurutkan berdasarkan peg_nama_lengkap secara ascending
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

      // Tambahkan pencarian jika ada query
      if (searchQuery) {
        query = query.ilike('peg_nama_lengkap', `%${searchQuery}%`);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error(error);
      } else {
        setPegawai(data);
        setTotalItems(count);
        setTotalPages(Math.ceil(count / itemsPerPage));
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage, searchQuery]);

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
    Download Data Pegawai
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
                <td className="border px-4 py-2 text-left">{data.peg_nama_lengkap} {data.peg_lahir_tempat} , {(() => {
                    const date = new Date(data.peg_lahir_tanggal);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0"); // Bulan mulai dari 0
                    const year = date.getFullYear();
                    return `${day}-${month}-${year}`;
                  })()}
                </td>
                <td className="border px-4 py-2">{data.peg_nip}</td>
                <td className="border px-4 py-2">{data.nm_gol_akhir}</td>
                <td className="border px-4 py-2">{new Date(data.peg_gol_akhir_tmt).toLocaleDateString("en-GB")}</td>
                <td className="border px-4 py-2 text-left">{data.jabatan_nama}</td>
                <td className="border px-4 py-2 text-left">{data.unit_nama}</td>
                <td className="border px-4 py-2">{data.jabatan_nama}</td>
                <td className="border px-4 py-2">{new Date(data.peg_jabatan_tmt).toLocaleDateString("en-GB")}</td>
                <td className="border px-4 py-2">{data.status_pegawai}</td>
                <td className="border px-4 py-2">{new Date(data.tmt_status_pegawai).toLocaleDateString("en-GB")}</td>
                <td className="border px-4 py-2">{data.masa_kerja_thn}</td>
                <td className="border px-4 py-2">{data.masa_kerja_bln}</td>
                <td className="border px-4 py-2">
                  <button className="text-blue-500 px-2">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                  <button className="text-red-500 px-2">
                    <FontAwesomeIcon icon={faShare} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between my-4">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default BELAJAR;
