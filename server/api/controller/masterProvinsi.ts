import { supabase } from '../config/supabaseClient';

// Controller untuk mengambil data master_provinsi
import { Request, Response } from 'express';

export const getMasterProvinsi = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('master_provinsi')
      .select('*'); // Mengambil semua data provinsi

    if (error) throw error;

    res.status(200).json(data); // Mengirimkan data provinsi ke client
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
