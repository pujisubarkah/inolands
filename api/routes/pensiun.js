import express from 'express';
import { supabase } from '../../../IDAMAN/src/supabaseClient.js'; // Pastikan path ini sesuai

const router = express.Router();

// Tambahkan log untuk memastikan rute ini sudah diakses
router.get('/pensiun', async (req, res) => {
  console.log('Request received at /api/pensiun'); // Log untuk debugging


  const { pensiun_id, searchQuery, page = 1, itemsPerPage = 10 } = req.query;

  try {
    let query = supabase
      .schema('siap')
      .from('view_data_pegawai')
      .select('*')
      .in('pensiun_id', pensiun_id ? pensiun_id.split(',') : ['1', '4'])
      .order('tmt_pensiun', { ascending: false });

    if (searchQuery) {
      query = query.ilike('peg_nama_lengkap', `%${searchQuery}%`);
    }

    // Pastikan query.range dipanggil setelah semua kondisi query ditetapkan
    const { data, error, count } = await query.range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

    if (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      console.log('No data found');
      return res.status(404).json({ message: 'Data not found' });
    }

    res.status(200).json({
      data,
      totalItems: count || 0,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
