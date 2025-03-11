import { supabase } from '../config/supabaseClient';
import { Request, Response } from 'express';

export const getInovasis = async (req: Request, res: Response) => {
  try {
    console.log('Fetching data from inovasis...');
    
    const { data, error } = await supabase
      .from('inovasis')
      .select('*');

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Data fetched:', data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching inovasis:', error);
    res.status(500).json({ error: (error as Error).message });
  }
};
