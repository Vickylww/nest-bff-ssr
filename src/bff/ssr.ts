// src/bff/ssr.ts
// Vue SSR 渲染器封装
import { renderToString } from '@vue/server-renderer';
// import { createApp } from '../../vue/createApp';
const { createApp} = require('../../dist/server/entry-server.js');
/**
 * 执行 Vue SSR
 * @param url     当前请求路径，可用于 vue-router
 * @param preData 预取数据，注入到 Vue 应用中
 * @returns 渲染后的 HTML 字符串
 */
export async function renderVueSSR(url: string, preData: any): Promise<string> {
  const app = createApp();

  // 将聚合数据通过 provide 提供给所有组件（也可换成 pinia 等状态管理）
  app.provide('preFetchData', preData);

  // 如果使用 vue-router，需要在这里推入 url 并等待 ready
  // 本示例省略路由部分，仅演示基础 SSR

  const html = await renderToString(app);
  return html;
}