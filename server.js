import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import process from 'node:process';


// Mengatur path file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Membuat instance Express
const app = express();
let port = 5000; // Menentukan port untuk server
if (typeof process !== 'undefined' && process.env.PORT) {
  port = process.env.PORT;
}

// Gunakan CORS untuk memungkinkan permintaan dari frontend
app.use(cors());

// Gunakan express untuk menyajikan file statis dari folder dist hasil build Vite
app.use(express.static(path.join(__dirname, 'dist')));

// Gunakan router status


// Route untuk menangani permintaan frontend lainnya, misalnya untuk HTML, JS, CSS, dll.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Jalankan server Express pada port yang ditentukan dan beri tahu bahwa server sudah berjalan
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
