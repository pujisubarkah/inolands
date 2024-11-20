import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    // Fallback ke index.html untuk client-side routing
    hmr: true,
  },
  preview: {
    port: 5000,
  },
});

