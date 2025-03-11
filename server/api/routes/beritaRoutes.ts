import express from 'express';
import { createBerita, getAllBeritas, getBeritaById } from '../controller/beritaController';

const router = express.Router();

// Gunakan format ini untuk mendefinisikan route
router.post('/berita', createBerita);
router.get('/berita', getAllBeritas);
router.get('/berita/:id', getBeritaById);

export default router;

