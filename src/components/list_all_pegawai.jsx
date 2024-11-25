import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { supabase } from "../supabaseClient"; // Import Supabase client
import { faSearch, faEdit, faTrash, faAdd, faDownload } from '@fortawesome/free-solid-svg-icons';

const ListAllPegawai = () => {
  // State untuk menyimpan data pegawai, pagination, dan show per page
  const [pegawai, setPegawai] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false); // Modal state
 
  const [searchQuery, setSearchQuery] = useState(''); // State untuk pencarian

  const { unit_kerja_id } = useParams(); // Ambil parameter unit_kerja_id dari URL

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data for unit_kerja_id:", unit_kerja_id);

      let query = supabase
        .schema('siap')
        .from('v_pegawai_data') // Ganti dengan nama table atau view yang sesuai
        .select('*', { count: 'exact' })
        .eq('peg_status', true) // Filter data hanya yang peg_status = true
        .order('peg_nama', { ascending: true }) // Mengurutkan berdasarkan peg_nama_lengkap secara ascending
        .ilike('peg_nama_lengkap', `%${searchQuery}%`);

      // Tambahkan filter pencarian
      if (searchQuery) {
      query = query.ilike('peg_nama_lengkap', `%${searchQuery}%`);
      }


      // Jika ada unit_kerja_id di URL, filter berdasarkan unit_kerja_id
      if (unit_kerja_id) {
        query = query.eq('unit_kerja_id', unit_kerja_id);
      }

      const { data, error } = await query;

      if (error) {
        console.error(error);
      } else {
        setPegawai(data);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage, unit_kerja_id, searchQuery]); // Tambahkan unit_kerja_id dan searchQuery ke dependensi useEffect

    
    const handleItemsPerPageChange = (event) => {
      setItemsPerPage(Number(event.target.value));
      setCurrentPage(1); // Reset ke halaman pertama ketika jumlah items berubah
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  // Fungsi untuk mengupdate pencarian
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  
    const filtered = pegawai.filter((item) =>
      item.nama.toLowerCase().includes(query.toLowerCase()) // Sesuaikan dengan field di data Anda
    );
    setFilteredPegawai(filtered);
  };

  const totalPages = Math.ceil(pegawai.length / itemsPerPage);
  const currentPegawai = pegawai.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex-4 h-full px-4 overflow-auto">
      {/* Tombol Tambah Pegawai dan Download Data Pegawai */}
      <div className="flex justify-between mb-4">
        <button
          onClick={handleModal}
          className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 flex items-center"
        >
          <FontAwesomeIcon icon={faAdd} className="mr-2" />
          Tambah Pegawai
        </button>
        <button
          onClick={() => alert("Download data pegawai")}  // Fungsionalitas download
          className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          <FontAwesomeIcon icon={faDownload} className="mr-2" />
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
        <div className="mb-4 flex justify-between items-center">
  {/* Show Rows Dropdown */}
  <div className="flex items-center">
    <label className="mr-2">Show:</label>
    <select
      value={itemsPerPage}
      onChange={handleItemsPerPageChange}
      className="p-2 border border-gray-300 rounded"
    >
      <option value={10}>10</option>
      <option value={25}>25</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </select>
  </div>

  {/* Search Bar - Positioned to the right */}
  <div className="flex items-center">
    <label className="mr-2">Search:</label>
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearchChange}
      className="p-2 border border-gray-300 rounded"
      placeholder="Cari Pegawai..."
    />
  </div>
</div>

    <div style={{ margin: "20px", padding: "10px" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "0",
          border: "1px solid #4cafaf",
          borderRadius: "10px",
          overflow: "hidden",
          margin: "20px 0",
        }}
      >
        <thead>
  <tr style={{ backgroundColor: "#004d40" }}>
    <th
      rowSpan="2"
      style={{
        padding: "10px 15px",
        border: "1px solid #00695c",
        textAlign: "left",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "14px",
        color: "#ffffff",
      }}
    >
      Nama
    </th>
    <th
      rowSpan="2"
      style={{
        padding: "10px 15px",
        border: "1px solid #00695c",
        textAlign: "left",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "14px",
        color: "#ffffff",
      }}
    >
      Tempat, Tgl Lahir
    </th>
    <th
      rowSpan="2"
      style={{
        padding: "10px 15px",
        border: "1px solid #00695c",
        textAlign: "left",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "14px",
        color: "#ffffff",
      }}
    >
      NIP
    </th>
    <th
      colSpan="2"
      style={{
        padding: "10px 15px",
        border: "1px solid #00695c",
        textAlign: "center",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "14px",
        color: "#ffffff",
      }}
    >
      Pangkat
    </th>
    <th
      colSpan="2"
      style={{
        padding: "10px 15px",
        border: "1px solid #00695c",
        textAlign: "center",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "14px",
        color: "#ffffff",
      }}
    >
      Jabatan
    </th>
    <th
      colSpan="2"
      style={{
        padding: "10px 15px",
        border: "1px solid #00695c",
        textAlign: "center",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "14px",
        color: "#ffffff",
      }}
    >
      Pegawai
    </th>
    <th
      colSpan="2"
      style={{
        padding: "10px 15px",
        border: "1px solid #00695c",
        textAlign: "center",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "14px",
        color: "#ffffff",
      }}
    >
      Masa Kerja
    </th>
    <th
      rowSpan="2"
      style={{
        padding: "10px 15px",
        border: "1px solid #00695c",
        textAlign: "left",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "14px",
        color: "#ffffff",
      }}
    >
      Pilihan
    </th>
  </tr>
  <tr style={{ backgroundColor: "#004d40" }}>
    <th
      style={{
        padding: "10px 15px",
        border: "1px solid #00695c",
        color: "#ffffff",
      }}
    >
      Gol
    </th>
    <th
      style={{
        padding: "10px 15px",
        border: "1px solid #00695c",
        color: "#ffffff",
      }}
    >
      TMT Gol
    </th>
    <th
      style={{
        padding: "10px 15px",
        border: "1px solid #00695c",
        color: "#ffffff",
      }}
    >
      Nama
    </th>
    <th
      style={{
        padding: "10px 15px",
        border: "1px solid #00695c",
        color: "#ffffff",
      }}
    >
      TMT Jabatan
    </th>
    <th
      style={{
        padding: "10px 15px",
        border: "1px solid #00695c",
        color: "#ffffff",
      }}
    >
      Status
    </th>
    <th
      style={{
        padding: "10px 15px",
        border: "1px solid #00695c",
        color: "#ffffff",
      }}
    >
      TMT Status
    </th>
    <th
      style={{
        padding: "10px 15px",
        border: "1px solid #00695c",
        color: "#ffffff",
      }}
    >
      Thn
    </th>
    <th
      style={{
        padding: "10px 15px",
        border: "1px solid #00695c",
        color: "#ffffff",
      }}
    >
      Bln
    </th>
  </tr>
</thead>

        <tbody>
          {currentPegawai.map((pegdata, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#e0f2f1" : "#ffffff",
              }}
            >
              <td style={{ padding: "10px 15px", border: "1px solid #80cbc4" }}>
                {pegdata.peg_nama_lengkap}
              </td>
              <td style={{ padding: "10px 15px", border: "1px solid #80cbc4" }}>
                {pegdata.peg_lahir_tempat},{" "}
                {new Date(pegdata.peg_lahir_tanggal).toLocaleDateString("id-ID")}
              </td>
              <td style={{ padding: "10px 15px", border: "1px solid #80cbc4" }}>
                {pegdata.peg_nip}
              </td>
              <td style={{ padding: "10px 15px", border: "1px solid #80cbc4" }}>
                {pegdata.nm_gol_akhir}
              </td>
              <td style={{ padding: "10px 15px", border: "1px solid #80cbc4" }}>
                {new Date(
                  pegdata.peg_gol_akhir_tmt
                ).toLocaleDateString("id-ID")}
              </td>
              <td style={{ padding: "10px 15px", border: "1px solid #80cbc4" }}>
                {pegdata.jabatan_nama}
              </td>
              <td style={{ padding: "10px 15px", border: "1px solid #80cbc4" }}>
                {new Date(
                  pegdata.peg_jabatan_tmt
                ).toLocaleDateString("id-ID")}
              </td>
              <td style={{ padding: "10px 15px", border: "1px solid #80cbc4" }}>
                {pegdata.peg_status ? "Aktif" : "Tidak Aktif"}
              </td>
              <td style={{ padding: "10px 15px", border: "1px solid #80cbc4" }}>
                {new Date(pegdata.peg_pns_tmt).toLocaleDateString("id-ID")}
              </td>
              <td style={{ padding: "10px 15px", border: "1px solid #80cbc4" }}>
                {pegdata.masa_kerja_tahun}
              </td>
              <td style={{ padding: "10px 15px", border: "1px solid #80cbc4" }}>
                {pegdata.masa_kerja_bulan}
              </td>
              <td style={{ padding: "10px 15px", border: "1px solid #80cbc4" }}>
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ cursor: "pointer", marginRight: "5px", color: "#00695c" }}
                />
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ cursor: "pointer", marginRight: "5px", color: "#00695c" }}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ cursor: "pointer", color: "#d32f2f" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        {/* Pagination */}
        {totalPages > 1 && (
                        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                            {currentPage > 1 && (
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    style={{
                                        padding: '5px 10px',
                                        margin: '0 5px',
                                        border: 'none',
                                        borderRadius: '3px',
                                        backgroundColor: '#f9f9f9',
                                        color: '#000',
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    Prev
                                </button>
                            )}
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                const pageNumber = currentPage > 3 ? currentPage - 2 + i : i + 1;
                                return (
                                    <button
                                        key={pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                        style={{
                                            padding: '5px 10px',
                                            margin: '0 5px',
                                            border: 'none',
                                            borderRadius: '3px',
                                            backgroundColor: currentPage === pageNumber ? '#004d40' : '#f9f9f9',
                                            color: currentPage === pageNumber ? '#fff' : '#000',
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}
                            {currentPage < totalPages && (
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    style={{
                                        padding: '5px 10px',
                                        margin: '0 5px',
                                        border: 'none',
                                        borderRadius: '3px',
                                        backgroundColor: '#f9f9f9',
                                        color: '#000',
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    )}
      <br />
      </div>
    </div>
  );
};

export default ListAllPegawai;
