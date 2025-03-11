import express from 'express';
import { getKabkotData } from '../controller/kabkotController';

const router = express.Router();

// Route untuk mengambil data master_kabupaten
router.get('/kabkot', getKabkotData);

export default router;