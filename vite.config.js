import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Absolute base so multi-page deep links (/events/coding-programming)
  // resolve assets correctly on refresh.
  base: '/',
  server: {
    host: true,
    port: 5173,
  },
});
