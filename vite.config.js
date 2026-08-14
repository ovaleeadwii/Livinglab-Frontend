import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        // [PERBAIKAN]: Arahkan ke IP VPS Anda dan port Backend yang baru (3332)
        target: 'http://148.230.100.219:3332', 
        changeOrigin: true,
        // Rewrite ini akan membuang '/api' sebelum dikirim ke backend Anda.
        // Contoh: FE memanggil '/api/data' -> BE menerima '/data'
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react()],
})