
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { supabase } from "../supabaseClient"; // Import Supabase client
import { faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ListAllPegawai = () => {
  // State untuk menyimpan data pegawai, pagination, dan show per page
  const [pegawai, setPegawai] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [showRows, setShowRows] = useState(itemsPerPage);

  useEffect(() => {
    // Fetch data pegawai dari Supabase
    const fetchData = async () => {
      const { data, error, count } = await supabase
        .schema('siap')
        .from('v_pegawai_data') // Ganti dengan nama table atau view yang sesuai
        .select('*', { count: 'exact' })
        .eq('peg_status', true) // Filter data hanya yang peg_status = true
        .order('peg_nama', { ascending: true }) // Mengurutkan berdasarkan peg_nama_lengkap secara ascending
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

      if (error) {
        console.error(error);
      } else {
        setPegawai(data);
        setTotalItems(count);
        setTotalPages(Math.ceil(count / itemsPerPage));
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset ke halaman pertama ketika jumlah items berubah
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  // Fungsi untuk mengupdate pencarian
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset ke halaman pertama saat melakukan pencarian baru
  };

  return (
    <div className="p-4">
      {/* Tombol Tambah Pegawai dan Download Data Pegawai */}
      <div className="flex justify-between mb-4">
        <button
          onClick={handleModal}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Tambah Pegawai
        </button>
        <button
          onClick={() => alert("Download data pegawai")}  // Fungsionalitas download
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Download Data Pegawai
        </button>
      </div>

      {/* Modal Tambah Pegawai */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold">Tambah Pegawai</h3>
            <div className="my-4">
              <label className="block mb-2">Nama:</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="my-4">
              <label className="block mb-2">Jabatan:</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleModal}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      

      
        <div className="overflow-x-auto">
          <h3 className="text-center text-xl font-semibold my-4">
            DAFTAR PEGAWAI
            <br />
            LEMBAGA ADMINISTRASI NEGARA
          </h3>
      {/* Show Rows Dropdown */}
        <div className="mb-4">
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


      

        <table className="min-w-full table-auto border-collapse text-center">
          <thead className="bg-gray-300">
            <tr>
              <th rowSpan="2" className="border px-4 py-2">Nama</th>
              <th rowSpan="2" className="border px-4 py-2">Tempat, Tgl Lahir</th>
              <th rowSpan="2" className="border px-4 py-2">NIP</th>
              <th colSpan="2" className="border px-4 py-2">Pangkat</th>
              <th colSpan="2" className="border px-4 py-2">Jabatan</th>
              <th colSpan="2" className="border px-4 py-2">Pegawai</th>
              <th colSpan="2" className="border px-4 py-2">Masa Kerja</th>
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
                <td className="border px-4 py-2 text-left">{data.peg_nama_lengkap}</td>
                <td className="border px-4 py-2 text-left">{data.peg_lahir_tempat} , {" "}
                {(() => {const date = new Date(data.peg_lahir_tanggal);
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0"); // Bulan mulai dari 0
                const year = date.getFullYear();
                return `${day}-${month}-${year}`;
                })()}</td>
                <td className="border px-4 py-2">{data.peg_nip}</td>
                <td className="border px-4 py-2">{data.nm_gol_akhir}</td>
                <td className="border px-4 py-2">{new Date(data.peg_gol_akhir_tmt).toLocaleDateString("en-GB")}</td>
                <td className="border px-4 py-2 text-left">{data.jabatan_nama}</td>
                <td className="border px-4 py-2">{data.peg_jft_tmt}</td>
                <td className="border px-4 py-2">{data.peg_status_kepegawaian}</td>
                <td className="border px-4 py-2">{new Date(data.peg_pns_tmt).toLocaleDateString("en-GB")}</td>
                <td className="border px-4 py-2">{data.masa_kerja_tahun}</td>
                <td className="border px-4 py-2">{data.masa_kerja_bulan}</td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center space-x-4">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <button className="text-yellow-500 hover:text-yellow-700">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded mr-2"
        >
          Sebelumnya
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded ml-2"
        >
          Lanjut
        </button>
      </div>
    </div>
  );
};

export default ListAllPegawai;
