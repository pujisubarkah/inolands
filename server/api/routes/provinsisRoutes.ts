import express from 'express';
import { getProvinsis } from '../controller/provinsisController';

const router = express.Router();

// Route untuk mengambil data master_provinsi
router.get('/provinsis', getProvinsis);

export default router;