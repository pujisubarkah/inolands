import express from 'express';
import { supabase } from '../../../IDAMAN/src/supabaseClient.js'; // Pastikan path ini sesuai

const router = express.Router();

router.get('/pegawai', async (req, res) => {
  const { unit_kerja_id, searchQuery } = req.query; // Ambil parameter query dari request

  try {
    let query = supabase
      .schema('siap')
      .from('view_data_pegawai')
      .select('*', { count: 'exact' })
      .eq('peg_status', true)
      .order('peg_nama', { ascending: true });

    // Tambahkan filter pencarian jika ada
    if (searchQuery) {
      query = query.ilike('peg_nama_lengkap', `%${searchQuery}%`);
    }

    // Tambahkan filter unit_kerja_id jika ada
    if (unit_kerja_id) {
      query = query.eq('unit_kerja_id', unit_kerja_id);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching data:", error.message);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
