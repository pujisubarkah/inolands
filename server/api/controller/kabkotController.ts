import { Request, Response, NextFunction, RequestHandler } from 'express';
import { supabase } from '../config/supabaseClient';

export const getKabkotData: RequestHandler = async (req, res, next) => {
    try {
        const { kabupatenIds } = req.body;

        // Validasi: Pastikan `kabupatenIds` adalah array dan tidak kosong
        if (!kabupatenIds || !Array.isArray(kabupatenIds) || kabupatenIds.length === 0) {
            res.status(400).json({ error: 'kabupatenIds harus berupa array dan tidak boleh kosong' });
            return;
        }

        // Query ke Supabase
        const { data: kabkotData, error: kabkotError } = await supabase
            .from('kabkot') // Mengambil data dari tabel 'kabkot'
            .select('id_kabkot, jumlah_inovasi')
            .in('id_kabkot', kabupatenIds);

        // Jika ada error dari Supabase, lempar ke middleware error handler
        if (kabkotError) {
            next(kabkotError);
        }
        // Kirim response dengan data yang didapat
        res.status(200).json(kabkotData);
    } catch (error) {
        console.error('Error fetching kabkot data:', error);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
};
