import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: "https://testffc.nimapinfotech.com/api",  // Replace with the actual URL of the backend API
        changeOrigin: true,  // Ensures the correct origin header is set
        secure: false,       // Set to true if the backend uses HTTPS
        rewrite: (path) => path.replace(/^\/api/, '')  // Optionally rewrite the path if needed
      },
    },
  },
})
