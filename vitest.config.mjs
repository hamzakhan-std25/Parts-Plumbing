import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    // 1. Look ONLY for files ending in .test.js or .test.jsx
    include: ['**/*.test.{js,jsx}'],

    // 2. Explicitly skip the Playwright tests folder and Next.js builds
    exclude: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/tests/**' // This targets and skips your Playwright folder
    ],
    environment: 'jsdom',
    globals: true,
  },
})
