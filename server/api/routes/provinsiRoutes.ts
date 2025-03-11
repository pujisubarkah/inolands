import express from 'express';
import { getProvinsiData } from '../controller/provinsiController';

const router = express.Router();

// Route untuk mengambil data master_provinsi
router.get('/provinsi', getProvinsiData);

export default router;
