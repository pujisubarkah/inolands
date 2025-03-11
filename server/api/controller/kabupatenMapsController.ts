import { RequestHandler, Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabaseClient';

export const getKabupatenByProvinsi: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("Query Parameters:", req.query); // DEBUGGING

        // Ambil id_provinsi dari query
        const id_provinsi = req.query.id_provinsi as string;

        // Validasi id_provinsi
        if (!id_provinsi) {
            res.status(400).json({ error: 'Parameter id_provinsi diperlukan' });
            return;
        }

        // Query Supabase untuk mendapatkan kabupaten berdasarkan id_provinsi
        const { data: kabupatenData, error } = await supabase
            .from('kabupaten')
            .select('*')
            .eq('id_provinsi', id_provinsi);

        // Tangani error dari Supabase
        if (error) {
            next(new Error(error.message));
            return;
        }

        res.status(200).json(kabupatenData);
    } catch (error) {
        console.error('Error fetching kabupaten by provinsi:', error);
        next(error instanceof Error ? error : new Error(String(error)));
    }
};
