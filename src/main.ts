import { NestFactory } from '@nestjs/core';
import { BffModule } from './bff/bff.module';
import { join } from 'path';
import cookieParser from 'cookie-parser';
// import * as cookieParser from 'cookie-parser';
import * as express from 'express';  // ← 添加导入

async function bootstrap() {
  const app = await NestFactory.create(BffModule);
  app.use(cookieParser());
  // 托管 public 目录下的静态资源
//   app.useStaticAssets(join(__dirname, '..', 'public'));
  // 使用 Express 原生静态文件中间件替代 useStaticAssets
  app.use(express.static(join(__dirname, '..', 'public')));
  await app.listen(3000);
  console.log('BFF 服务已启动：http://localhost:3000');
}
bootstrap();



