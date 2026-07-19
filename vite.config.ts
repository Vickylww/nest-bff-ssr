
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'public',
    rollupOptions: {
      input: 'vue/entry-client.ts',   // 如果原来入口在 src 里，也改一下
    },
  },
});