import express from 'express';
import { getInovasiByProvinsi, getInovasiByKabkot, getInovasiWithSDGs } from '../controller/inolandsController';

const router = express.Router();

router.get('/inolands/provinsi/:id_provinsi', getInovasiByProvinsi);
router.get('/inolands/kabkot/:id_kabkot', getInovasiByKabkot);
router.get('/inolands', getInovasiWithSDGs);

export default router;
