
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    ssr: true,                    // 启用 SSR 构建（多入口）
    outDir: 'dist/server',
    rollupOptions: {
      input: {
        main: 'src/main.ts',                       // → dist/main.js
        'entry-server': 'vue/entry-server.ts',     // → dist/entry-server.js
      },
      output: {
        format: 'cjs',
        entryFileNames: '[name].js',   // 保留原 key 作为文件名
        chunkFileNames: 'chunks/[name]-[hash].js', // 公共代码分块
      },
    },
  },
});