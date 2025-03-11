import express from 'express';
import { getMasterProvinsi } from '../controller/masterProvinsi';

const router = express.Router();

// Route untuk mengambil data master_provinsi
router.get('/master_provinsi', getMasterProvinsi);

export default router;
