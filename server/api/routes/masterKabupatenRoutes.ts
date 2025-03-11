import express from 'express';
import { getMasterKabupaten } from '../controller/masterKabupaten';

const router = express.Router();

// Route untuk mengambil data master_kabupaten
router.get('/master_kabupaten', getMasterKabupaten);

export default router;
