import express from 'express';
import { supabase } from '../../../IDAMAN/src/supabaseClient.js'; // Pastikan path ini sesuai

const router = express.Router();

router.get('/statuses', async (req, res) => {
  try {
    // Ambil data status dari tabel m_status di schema siap_skpd
    const { data, error } = await supabase
      .schema('siap_skpd')
      .from('m_status')
      .select('id, status');

    if (error) {
      console.error("Error fetching data:", error.message);
      return res.status(500).json({ error: error.message });
    }

    // Hitung jumlah status_id untuk setiap status
    const statusesWithCount = await Promise.all(
      data.map(async (status) => {
        const { count, error: countError } = await supabase
          .schema('siap_skpd')
          .from("status_edit_pegawai")
          .select("*", { count: "exact", head: true }) // Hitung jumlah status_id
          .eq("status_id", status.id); // Hubungkan dengan m_status.id

        if (countError) {
          console.error("Error menghitung status_id:", countError);
          throw countError;
        }

        // Debug log untuk melihat count yang diperoleh
        console.log(`Jumlah untuk status ${status.id} (${status.status}):`, count);

        return {
          ...status,
          jumlah: count || 0, // Menambahkan jumlah hasil hitung
        };
      })
    );

    // Mengembalikan data dengan jumlah yang sudah dihitung
    res.status(200).json(statusesWithCount);
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

