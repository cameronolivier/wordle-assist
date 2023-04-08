/// <reference types="vite/client" />
import path from 'path';

import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
  },
  base: './',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
});
