import { RequestHandler, Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabaseClient';

// Controller untuk mengambil data Inovasi by Provinsi
export const getInovasiByProvinsi: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id_provinsi } = req.params;

        // Validasi id_provinsi
        if (!id_provinsi) {
            res.status(400).json({ error: 'id_provinsi tidak boleh kosong' });
            return;
        }

        // Query Supabase untuk mendapatkan inovasi berdasarkan id_provinsi
        const { data: inovasiData, error: inovasiError } = await supabase
            .from('inolands')
            .select('*')
            .eq('id_provinsi', id_provinsi);

        // Tangani error dari Supabase
        if (inovasiError) {
            next(new Error(inovasiError.message));
            return;
        }

        res.status(200).json(inovasiData);
    } catch (error) {
        console.error('Error fetching inovasi by provinsi:', error);
        next(error instanceof Error ? error : new Error(String(error)));
    }
};

// Controller untuk mengambil data Inovasi by Kabkot
export const getInovasiByKabkot: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id_kabkot } = req.params;

        // Validasi id_kabkot
        if (!id_kabkot) {
            res.status(400).json({ error: 'id_kabkot tidak boleh kosong' });
            return;
        }

        // Query Supabase untuk mendapatkan inovasi berdasarkan id_kabkot
        const { data: inovasiData, error: inovasiError } = await supabase
            .from('inolands')
            .select('*')
            .eq('id_kabkot', id_kabkot);

        // Tangani error dari Supabase
        if (inovasiError) {
            next(new Error(inovasiError.message));
            return;
        }

        res.status(200).json(inovasiData);
    } catch (error) {
        console.error('Error fetching inovasi by kabkot:', error);
        next(error instanceof Error ? error : new Error(String(error)));
    }
};

// Controller untuk mengambil data Inovasi dengan SDGs
export const getInovasiWithSDGs: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Query Supabase untuk mendapatkan inovasi dengan relasi ke SDGs
        const { data: inovasiData, error: fetchError } = await supabase
            .from('inolands')
            .select(`
                *,
                sdgs (
                    image,
                    sdgs
                )
            `);

        // Tangani error dari Supabase
        if (fetchError) {
            next(new Error(fetchError.message));
            return;
        }

        res.status(200).json(inovasiData);
    } catch (error) {
        console.error('Error fetching inovasi with SDGs:', error);
        next(error instanceof Error ? error : new Error(String(error)));
    }
};
