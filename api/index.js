import express from 'express';
import path from 'path';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rute API
app.use('/api', apiRoutes);

// Pastikan Express melayani file static hasil build Vite
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/dist')));

// Semua rute yang bukan API diarahkan ke index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
