import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // Import Supabase client

const ListUnit = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Ambil data unit kerja dan satuan kerja dari Supabase
        const { data, error } = await supabase
          .schema("siap")
          .from("m_spg_unit_kerja")
          .select(
            `
              unit_kerja_id, 
              unit_kerja_parent, 
              unit_kerja_nama, 
              satuan_kerja_id, 
              spg_pegawai(unit_kerja_id), 
              m_spg_satuan_kerja(satuan_kerja_nama)
            `
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
            // Urutkan berdasarkan unit_kerja_parent, lalu unit_kerja_id
            if (a.unit_kerja_parent !== b.unit_kerja_parent) {
              return a.unit_kerja_parent - b.unit_kerja_parent;
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
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Satker</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Unit Kerja</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Jumlah Pegawai</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Pilihan</th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => (
                <tr key={unit.unit_kerja_id}>
                  <td className="border border-gray-300 px-4 py-2">{unit.satuanKerjaNama}</td>
                  <td className="border border-gray-300 px-4 py-2">{unit.unit_kerja_nama}</td>
                  <td className="border border-gray-300 px-4 py-2">{unit.jumlahPegawai}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a
                      href={`http://idaman.lan.go.id/list-pegawai/all/${unit.unit_kerja_id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                    >
                      Lihat Data Pegawai
                    </a>
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
