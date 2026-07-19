// src/bff/bff.controller.ts
// 路由控制器，处理 SSR 输出
// 核心路由：拦截所有页面请求，聚合数据 → SSR 渲染 → 返回完整 HTML。
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AggregationService } from './aggregation.service';
import { renderVueSSR } from './ssr';


@Controller()
export class BffController {
  constructor(private readonly aggregationService: AggregationService) {}

  /**
   * 匹配所有 GET 请求（实际项目应限定前端路由范围）
   * 注：Nest 默认为 Express 平台，@Req/@Res 可直接使用 Express 对象
   */
  @Get('*')
  async handlePage(@Req() req: Request, @Res() res: Response) {
    try {
      // 1. 从 cookie 或 token 中解析用户身份（简化演示）
      const userId = req.cookies?.userId || 'anonymous';

      // 2. 调用聚合服务，获取页面所需全部数据
      const pageData = await this.aggregationService.getPageData(userId);

      // 3. 执行 Vue SSR，传入请求路径和预取数据
      const appHtml = await renderVueSSR(req.originalUrl, pageData);

      // 4. 拼装最终 HTML 模板
      //    将预取数据序列化后挂载到 window.__INITIAL_STATE__，客户端 hydration 时使用
      const html = `
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nest BFF + Vue SSR</title>
          <!-- 可在此插入 CSS 文件链接 -->
        </head>
        <body>
          <div id="app">${appHtml}</div>
          <script>
            // 将服务端数据传递给客户端，避免重复请求
            window.__INITIAL_STATE__ = ${JSON.stringify(pageData)};
          </script>
          <!-- 客户端打包后的 JS（需构建 vue 项目生成 client-bundle.js） -->
          <script src="/client-bundle.js"></script>
        </body>
        </html>
      `;

      // 5. 返回 text/html 给浏览器
      res.type('text/html').send(html);
      console.log("html"+html)
    } catch (error) {
      // 生产环境可降级为客户端渲染壳，或跳转到错误页面
      console.error('SSR 渲染失败:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}


