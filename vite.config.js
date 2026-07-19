import { defineConfig } from 'vite'

export default defineConfig({
  server: { port: 8150 },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 700,
  },
})
