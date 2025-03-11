import { supabase } from '../config/supabaseClient';

// Controller untuk mengambil data master_kabupaten
import { Request, Response } from 'express';

export const getMasterKabupaten = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('master_kabupaten')
      .select('*'); // Mengambil semua data kabupaten

    if (error) throw error;

    res.status(200).json(data); // Mengirimkan data kabupaten ke client
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
