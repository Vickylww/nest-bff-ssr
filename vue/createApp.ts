// src/app/createApp.ts
import { createSSRApp } from 'vue';
import App from './App.vue';

export function createApp() {
  const app = createSSRApp(App);
  // 可在此注册全局组件、路由、状态管理等
  return app;
}