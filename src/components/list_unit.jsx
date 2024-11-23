import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // Import Supabase client
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ListUnit = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Inisialisasi useNavigate

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Ambil data unit kerja dan satuan kerja dari Supabase
        const { data, error } = await supabase
          .schema("siap")
          .from("m_spg_unit_kerja")
          .select(
            `unit_kerja_id, 
              unit_kerja_parent, 
              unit_kerja_nama, 
              satuan_kerja_id, 
              spg_pegawai(unit_kerja_id), 
              m_spg_satuan_kerja(satuan_kerja_nama)`
          );

        if (error) throw error;

        // Filter data untuk mengecualikan unit_kerja_id = 99
        const filteredData = data
          .filter((unit) => unit.unit_kerja_id !== 99) // Hapus data dengan unit_kerja_id = 99
          .map((unit) => ({
            ...unit,
            jumlahPegawai: unit.spg_pegawai.length, // Tambahkan jumlah pegawai
            satuanKerjaNama: unit.m_spg_satuan_kerja?.satuan_kerja_nama || "Tidak Diketahui",
          }))
          .sort((a, b) => {
            // Urutkan berdasarkan satuan_kerja_id, lalu unit_kerja_id
            if (a.satuan_kerja_id !== b.satuan_kerja_id) {
              return a.satuan_kerja_id - b.satuan_kerja_id;
            }
            return a.unit_kerja_id - b.unit_kerja_id;
          });

        setUnits(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Menjalankan hanya sekali saat komponen di-mount

 // Fungsi untuk menangani klik pencarian
 const handleSearchClick = (unitKerjaId) => {
  // Arahkan ke ListAllPegawai dengan membawa unit_kerja_id sebagai parameter URL
  navigate(`/list_all_pegawai?unit_kerja_id=${unitKerjaId}`);
};


  return (
    <div className="container mx-auto p-6">
      {/* Judul Halaman */}
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-4">List Unit Kerja</h2>
      </div>

      {/* Tabel List Unit Kerja */}
      <div className="mt-8">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-500">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Satker</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Unit Kerja</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Jumlah Pegawai</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Pilihan</th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit, index) => (
                <tr
                  key={unit.unit_kerja_id}
                  className={index % 2 === 0 ? "bg-teal-300" : "bg-yellow-200"}
                >
                  <td className="border border-gray-300 px-2 py-2">{unit.satuanKerjaNama}</td>
                  <td className="border border-gray-300 px-4 py-2">{unit.unit_kerja_nama}</td>
                  <td className="border border-gray-300 px-4 py-2">{unit.jumlahPegawai}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="text-white-500 cursor-pointer mr-2"
                      onClick={() => handleSearchClick(unit.unit_kerja_id)} // Panggil fungsi untuk mengarahkan ke halaman ListAllPegawai
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ListUnit;
