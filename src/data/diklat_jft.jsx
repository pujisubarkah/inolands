import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { supabase } from "../supabaseClient"; // Import Supabase client
import {  faeDIT, faTrash } from '@fortawesome/free-solid-svg-icons';

const DIKLATJFT = () => {
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
        .from('m_spg_diklat_fungsional') // Ganti dengan nama table atau view yang sesuai
        .select('*', { count: 'exact' })
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
        <h3 className="text-center text-xl font-semibold my-8">DATA MASTER DIKLAT JABATAN FUNGSIONAL TERTENTU</h3>
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
    Tambah Diklat Jabatan Fungsional Tertentu
  </button>
</div>


        <table className="min-w-full table-auto border-collapse text-center">
          <thead className="bg-gray-300">
            <tr>
              <th rowSpan="2" className="border px-4 py-2">Nama Diklat Fungsional</th>
              <th rowSpan="2" className="border px-4 py-2">Jenis Diklat</th>
              <th rowSpan="2" className="border px-4 py-2">Jumlah Pegawai</th>
              <th rowSpan="2" className="border px-4 py-2">Aksi</th> 
            </tr>
            
          </thead>
          <tbody>
            {pegawai.map((data, index) => (
              <tr key={index}>
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
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-red-500 px-2">
                    <FontAwesomeIcon icon={faTrash} />
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

export default DIKLATJFT;
