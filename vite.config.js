import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Saat `npm run dev` di laptop, /api diteruskan ke server produksi
      // (nginx di sana yang meneruskan ke backend port 3332).
      '/api': {
        target: 'https://agri-ics.telsa.cloud',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [react()],
})
