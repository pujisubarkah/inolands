import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // pastikan sudah membuat konfigurasi Supabase

const ProfileInfo = () => {
  const [profileData, setProfileData] = useState({
    nip: "",
    nipLama: "",
    namaLengkap: "",
  });

  useEffect(() => {
    // Mengambil data dari Supabase
    const fetchProfileData = async () => {
      const { data, error } = await supabase
      .schema('siap_skpd')
        .from("spg_pegawai") // ganti dengan nama tabel Anda
        .select("peg_nip, peg_nip_lama, peg_nama") // kolom yang ingin diambil
        .single();

      if (error) {
        console.error("Error fetching profile data:", error);
      } else {
        setProfileData(data);
      }
    };

    fetchProfileData();
  }, []); // Efek dijalankan sekali saat komponen pertama kali dimuat

  return (
    <div className="divide-y divide-gray-200 border border-gray-300 rounded-md shadow-sm">
      {/* NIP */}
      <div className="flex px-4 py-2">
        <div className="w-1/4 font-medium text-gray-700">NIP</div>
        <div className="w-3/4 text-gray-800">
          <span id="nip" className="editable">
            {profileData.nip || "Loading..."}
          </span>
        </div>
      </div>

      {/* NIP Lama */}
      <div className="flex px-4 py-2">
        <div className="w-1/4 font-medium text-gray-700">NIP Lama</div>
        <div className="w-3/4 text-gray-800">
          <span id="nip_lama" className="editable">
            {profileData.nipLama || "Loading..."}
          </span>
        </div>
      </div>

      {/* Nama Lengkap */}
      <div className="flex px-4 py-2">
        <div className="w-1/4 font-medium text-gray-700">Nama Lengkap</div>
        <div className="w-3/4 text-gray-800">
          <span id="nama_lengkap" className="editable">
            {profileData.namaLengkap || "Loading..."}
          </span>
          <div className="flex gap-2 mt-2">
            {/* DRH Label */}
            <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-md flex items-center gap-1">
              DRH
              <a
                href="#"
                className="text-white"
                title="Upload"
                onClick={() => console.log("Upload DRH")}
              >
                <i className="fas fa-upload"></i>
              </a>
            </span>

            {/* FIP Label */}
            <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-md flex items-center gap-1">
              FIP
              <a
                href="#"
                className="text-white"
                title="Upload"
                onClick={() => console.log("Upload FIP")}
              >
                <i className="fas fa-upload"></i>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
