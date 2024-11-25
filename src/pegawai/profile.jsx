import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Pastikan konfigurasi Supabase benar

const ProfileInfo = ({ username }) => {
  const [profileData, setProfileData] = useState({
    nip: "",
    nipLama: "",
    namaLengkap: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi untuk mengambil data berdasarkan username yang login
    const fetchProfileData = async () => {
      try {
        // Query data profil berdasarkan username
        const { data, error } = await supabase
          .from("spg_pegawai") // Ganti dengan nama tabel Anda
          .select("peg_nip, peg_nip_lama, peg_nama")
          .eq("peg_username", username) // Sesuaikan dengan kolom username di tabel Anda
          .single(); // Asumsi username unik dan hanya memiliki satu profil

        if (error) throw error;

        // Simpan data ke state
        setProfileData({
          nip: data.peg_nip || "",
          nipLama: data.peg_nip_lama || "",
          namaLengkap: data.peg_nama || "",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username]); // Efek akan dijalankan jika username berubah

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-start gap-4 p-4 border border-gray-300 rounded-md shadow-sm max-w-xl mx-auto">
  {/* Placeholder Foto */}
  <div className="w-32 h-32 flex items-center justify-center bg-gray-200 border border-gray-300 rounded-md">
    <span className="text-sm text-gray-500">Foto</span>
  </div>

  {/* Informasi Profil */}
  <div className="divide-y divide-gray-200 flex-1">
    {/* NIP */}
    <div className="flex px-2 py-2">
      <div className="w-1/4 font-medium text-gray-700">NIP</div>
      <div className="w-3/4 text-gray-800">
        <span id="nip" className="editable">
          {profileData.nip || "Data tidak tersedia"}
        </span>
      </div>
    </div>

    {/* NIP Lama */}
    <div className="flex px-2 py-2">
      <div className="w-1/4 font-medium text-gray-700">NIP Lama</div>
      <div className="w-3/4 text-gray-800">
        <span id="nip_lama" className="editable">
          {profileData.nipLama || "Data tidak tersedia"}
        </span>
      </div>
    </div>

    {/* Nama Lengkap */}
    <div className="flex px-2 py-2">
      <div className="w-1/4 font-medium text-gray-700">Nama Lengkap</div>
      <div className="w-3/4 text-gray-800">
        <span id="nama_lengkap" className="editable">
          {profileData.namaLengkap || "Data tidak tersedia"}
        </span>
      </div>
    </div>
  </div>
</div>

  );
};

export default ProfileInfo;
