import express from 'express';
import { getPdflist, addPdflist } from '../controller/pdflistController';

const router = express.Router();

// Route untuk mengambil data infografis
router.get('/pdflist', getPdflist);

// Route untuk menambah data infografis
router.post('/pdflist', addPdflist);

export default router;