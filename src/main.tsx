import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Pastikan ini ada dan mengarah ke file yang benar
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}
