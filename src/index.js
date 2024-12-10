import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';  // Pastikan file ini mengandung import Tailwind CSS
import './i18n'; // Import konfigurasi i18n

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Mengukur performa aplikasi (opsional)
reportWebVitals();
