import express from 'express';
import { getInfografis, addInfografis } from '../controller/infografisController';

const router = express.Router();

// Route untuk mengambil data infografis
router.get('/infografis', getInfografis);

// Route untuk menambah data infografis
router.post('/infografis', addInfografis);

export default router;
