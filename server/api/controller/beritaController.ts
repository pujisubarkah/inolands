import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabaseClient';

// Get all beritas
export const getAllBeritas = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('beritas').select('*').order('date', { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get berita by ID
export const getBeritaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('beritas').select('*').eq('id', id).single();

    if (error) throw error;

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new berita
export const createBerita = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, description, image_url, date } = req.body;
  
      if (!title || !description || !image_url || !date) {
        res.status(400).json({ error: 'Semua field harus diisi!' });
        return;
      }
  
      const { data, error } = await supabase
        .from('beritas')
        .insert([{ title, description, image_url, date }])
        .select();
  
      if (error) throw error;
  
      res.status(201).json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };