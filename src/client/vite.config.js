import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    host: '0.0.0.0',
    proxy : {
      '/api' : {
        target: 'http://10.100.103.36:8080',
        rewrite: path => path.replace(/^\/api/, ""),
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
})
