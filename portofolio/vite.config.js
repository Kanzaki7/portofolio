import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    middleware: [
      (req, res, next) => {
        if (req.url.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
        next();
      }
    ]
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  publicDir: 'public',
  base: '/',
})
