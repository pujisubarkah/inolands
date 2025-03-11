import { supabase } from '../config/supabaseClient';

// Controller untuk mengambil data infografis
import { Request, Response } from 'express';

export const getInfografis = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('dokumens')
      .select('*'); // Mengambil semua data gambar dari tabel 'dokumens'

    if (error) throw error;

    res.status(200).json(data); // Mengirimkan data infografis ke client
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
// Controller untuk menambah data infografis
export const addInfografis = async (req: Request, res: Response) => {
  const { nama, link, jenis_dokumen } = req.body; // Mengambil data yang dikirimkan

  try {
    // Menyisipkan data ke tabel dokumens
    const { data, error } = await supabase
      .from('dokumens')
      .insert([
        { nama, link, jenis_dokumen } // Menambahkan dokumen ke Supabase
      ]);

    if (error) throw error;

    res.status(201).json({ message: 'Dokumen berhasil ditambahkan', data: data }); // Mengirimkan response sukses
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
