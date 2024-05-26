import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/100-Projects/javascript/1.TicTacToe/TicTacToe/',
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
})
