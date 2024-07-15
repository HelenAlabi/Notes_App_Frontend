
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Specify the output directory
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_REACT_APP_SERVER_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});


















