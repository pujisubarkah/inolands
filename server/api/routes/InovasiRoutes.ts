import express from 'express';
import { getInovasis } from '../controller/inovasiController';

const router = express.Router();

// Route untuk mengambil data master_kabupaten
router.get('/inovasi', getInovasis);

export default router;