import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import beritaRoutes from "./routes/beritaRoutes"; // Import router
import infografisRoutes from './routes/infografisRoutes'; // Import route infografis
import getmasterKabupaten from "./routes/masterKabupatenRoutes"; // Import router inolands
import getmasterProvinsi from "./routes/masterProvinsiRoutes"; // Import router inolands
import pdflistRoutes from './routes/pdflistRoutes'; // Import route pdflist
import InovasiRoutes from './routes/InovasiRoutes'; // Import route inovasi
import ProvinsisRoutes from './routes/provinsisRoutes'; // Import route provinsi
import ProvinsiRoutes from './routes/provinsiRoutes'; // Import route provinsi
import KabupatenMapRoutes from './routes/kabupatenMapRoutes'; // Import route kabupaten
import kabkotRoutes from './routes/kabkotRoutes'; // Import route kabkot
import inolandsRoutes from './routes/inolandsRoute'; // Import route inolands




dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", beritaRoutes); // Tambahkan router berita
app.use('/api', infografisRoutes);
app.use("/api", getmasterKabupaten); 
app.use("/api", getmasterProvinsi); 
app.use('/api', pdflistRoutes);
app.use('/api', InovasiRoutes);
app.use('/api', ProvinsisRoutes);
app.use('/api', ProvinsiRoutes);
app.use('/api', KabupatenMapRoutes);
app.use('/api', kabkotRoutes);
app.use('/api', inolandsRoutes);


app.get("/", (req, res) => {
  res.send("Backend Express is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
