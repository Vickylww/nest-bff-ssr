import { createApp } from './createApp';
import App from './App.vue';
const app = createApp(App);
// 获取服务端注入的初始数据
const state = (window as any).__INITIAL_STATE__;
app.provide('preFetchData', state);
app.mount('#app');