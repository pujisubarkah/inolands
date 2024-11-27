import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import statusRouter from './api/routes/status.js'; // Mengimpor router status
import pegawaiRouter from './api/routes/pegawai.js'; // Mengimpor router pegawai
import pensiunRouter from './api/routes/pensiun.js'; // Mengimpor router pegawaiinaktif
import meninggal from './api/routes/meninggal.js'; // Mengimpor router pegawaimeninggal

// Mengatur path file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Membuat instance Express
const app = express();
const port = process.env.PORT || 5000; // Menentukan port untuk server

// Gunakan CORS untuk memungkinkan permintaan dari frontend
app.use(cors());

// Gunakan express untuk menyajikan file statis dari folder dist hasil build Vite
app.use(express.static(path.join(__dirname, 'dist')));

// Gunakan router status
app.use('/api', statusRouter);  // Menambahkan route API status
app.use('/api', pegawaiRouter); // Menambahkan route API pegawai (perbaikan di sini)
app.use('/api', pensiunRouter); // Menambahkan route API pegawaipensiun
app.use('/api', meninggal); // Menambahkan route API pegawaimeninggal

// Route untuk menangani permintaan frontend lainnya, misalnya untuk HTML, JS, CSS, dll.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Jalankan server Express pada port yang ditentukan dan beri tahu bahwa server sudah berjalan
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
