import express from 'express';
import { supabase } from '../../../IDAMAN/src/supabaseClient.js'; // Pastikan path ini sesuai

const router = express.Router();

router.get('/api/meninggal', async (req, res) => {
  console.log('Request received at /api/meninggal'); // Log untuk debugging

  const { pensiun_id, searchQuery, page = 1, itemsPerPage = 10 } = req.query;

  try {
    // Periksa apakah pensiun_id valid dan bukan undefined atau null
    const pensiunIds = pensiun_id ? pensiun_id.split(',').map(id => id.trim()) : ['2']; // Pastikan id dipangkas

    let query = supabase
      .schema('siap')
      .from('view_data_pegawai')
      .select('*')
      .in('pensiun_id', pensiunIds) // Pastikan pensiunIds adalah array yang valid
      .order('tmt_pensiun', { ascending: false });

    if (searchQuery) {
      query = query.ilike('peg_nama_lengkap', `%${searchQuery}%`);
    }

    const { data, error, count } = await query
      .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({
      data,
      totalItems: count || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
