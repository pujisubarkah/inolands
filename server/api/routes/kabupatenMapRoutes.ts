import express from 'express';
import { getKabupatenByProvinsi } from '../controller/kabupatenMapsController';

const router = express.Router();

// Rute dengan query string ?id_provinsi=
router.get('/kabupatenmaps', getKabupatenByProvinsi);

export default router;
