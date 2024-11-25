import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Impor supabaseClient

const Profile = () => {
  const [profileData, setProfileData] = useState([]);
  
  useEffect(() => {
    // Mengambil data dari Supabase
    const fetchProfileData = async () => {
      const { data, error } = await supabase
        .schema('siap_skpd')
        .from('spg_pegawai') // Nama tabel di Supabase
        .select('*'); // Mengambil semua data
      
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setProfileData(data);
      }
    };
    
    fetchProfileData();
  }, []); // Menjalankan hanya sekali setelah komponen dimuat
  
  // Jika data belum tersedia, tampilkan loading
  if (profileData.length === 0) {
    return <div>Loading...</div>;
  }

  // Daftar field yang akan ditampilkan
  const profileFields = [
    { label: "Tempat, Tanggal Lahir", value: profileData[0]?.tempatTanggalLahir },
    { label: "Jenis Kelamin", value: profileData[0]?.jenisKelamin },
    { label: "Status Perkawinan", value: profileData[0]?.statusPerkawinan },
    { label: "Agama", value: profileData[0]?.agama },
    { label: "Status Pegawai", value: profileData[0]?.agama },    
    { label: "Golongan Darah", value: profileData[0]?.golonganDarah },
    { label: "Alamat", value: profileData[0]?.alamat },
    { label: "Telepon", value: profileData[0]?.telepon },
    { label: "Email", value: profileData[0]?.email },
    { label: "Pendidikan Terakhir", value: profileData[0]?.pendidikanTerakhir },
    { label: "Jurusan", value: profileData[0]?.jurusan },
    { label: "Tahun Lulus", value: profileData[0]?.tahunLulus },
    { label: "NIP", value: profileData[0]?.nip },
    { label: "NIP Lama", value: profileData[0]?.nipLama },
    { label: "Nama Lengkap", value: profileData[0]?.namaLengkap },
    { label: "Nama Panggilan", value: profileData[0]?.namaPanggilan },
    { label: "Nama Ibu Kandung", value: profileData[0]?.namaIbuKandung },
    { label: "Nama Ayah Kandung", value: profileData[0]?.namaAyahKandung },
    { label: "No. KTP", value: profileData[0]?.noKtp },
    { label: "No. NPWP", value: profileData[0]?.noNpwp },
    { label: "No. BPJS Kesehatan", value: profileData[0]?.noBpjsKesehatan },
    { label: "No. BPJS Ketenagakerjaan", value: profileData[0]?.noBpjsKetenagakerjaan },
    { label: "No. Rekening", value: profileData[0]?.noRekening },
    { label: "Nama Bank", value: profileData[0]?.namaBank },
    { label: "Cabang Bank", value: profileData[0]?.cabangBank },
    { label: "Nama Pemilik Rekening", value: profileData[0]?.namaPemilikRekening },
    { label: "Jabatan", value: profileData[0]?.jabatan },
    // Tambahkan field lainnya dari profileData
  ];

  return (
    <div className="divide-y divide-gray-200 border border-gray-300 rounded-md shadow-sm">
      {profileFields.map((field, index) => (
        <div key={index} className="flex px-4 space-y-0">
          <div className="w-1/6 font-medium text-gray-700 bg-teal-500 p-2 rounded-l-md text-right">
            {field.label}
          </div>
          <div className="w-5/6 text-gray-800 bg-white border border-teal-500 p-2 rounded-r-md">
            <span className="editable">{field.value || "Data tidak tersedia"}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
