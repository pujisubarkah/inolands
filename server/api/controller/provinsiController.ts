import { Request, Response, RequestHandler } from 'express';
import { supabase } from '../config/supabaseClient';

export const getProvinsiData: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const provinceIds: number[] = req.body.provinceIds;
        if (!Array.isArray(provinceIds)) {
            res.status(400).json({ error: 'provinceIds must be an array' });
            return;
        }

        const { data, error } = await supabase
            .from('provinsi')
            .select('id_provinsi, jumlah_inovasi')
            .in('id_provinsi', provinceIds);

        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};