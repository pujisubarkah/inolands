import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Import Supabase client

const ListAllPegawai = () => {
  const [pegawai, setPegawai] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPegawai = async () => {
    try {
      const { data, error } = await supabase
        .schema('siap') // Pastikan schema benar
        .from('spg_pegawai')  // Pastikan nama tabel dan schema benar
        .select('*');
  
      if (error) throw error;  // Lempar error jika ada
  
      console.log('Data:', data); // Lihat data yang diambil
      setPegawai(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message); // Tampilkan error detail
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchPegawai(); // Call the function to fetch data when component mounts
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="col-xs-12">
      <center><h3 className="title">Daftar Pegawai</h3></center>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Posisi</th>
          </tr>
        </thead>
        <tbody>
          {pegawai.map((peg) => (
            <tr key={peg.id}>
              <td>{peg.id_gol}</td>
              <td>{peg.peg_nip}</td>
              <td>{peg.peg_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAllPegawai;
