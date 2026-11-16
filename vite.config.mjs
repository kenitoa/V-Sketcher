import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({
  root: resolve('apps/renderer'), base: './', publicDir: resolve('.local/staged-assets'),
  build: { outDir: resolve('dist/renderer'), emptyOutDir: true,
    rolldownOptions: { input: { studio: resolve('apps/renderer/index.html'), output: resolve('apps/renderer/output.html') } } }
});
