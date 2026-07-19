
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    ssr: 'vue/entry-server.ts',   // ← 原来是 src/app/...，现在改成 vue/...
    outDir: 'dist/server',
    rollupOptions: {
      output: {
        format: 'cjs',
        entryFileNames: 'entry-server.js',
      },
    },
  },
});