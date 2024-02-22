import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

/// <reference types="vitest" />
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})
