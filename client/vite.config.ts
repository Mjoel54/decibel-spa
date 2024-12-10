import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  "envDir": "./environment",
  server: {
    port: 5173, 
  },
});