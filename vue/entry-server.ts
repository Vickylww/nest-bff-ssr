import { createSSRApp } from 'vue';
import App from './App.vue';
import { renderToString } from '@vue/server-renderer';

export async function render(url: string, preData: any) {
  const app = createSSRApp(App);
  app.provide('preFetchData', preData);
  return await renderToString(app);
}
// 导出 createApp，以便其他地方使用
export function createApp() {
  const app = createSSRApp(App);
  return app;
}
