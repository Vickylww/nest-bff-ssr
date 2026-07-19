// src/bff/bff.module.ts
// 模块注册
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';  // 引入 HTTP 客户端
import { BffController } from './bff.controller';
import { AggregationService } from './aggregation.service';

@Module({
  imports: [
    // HttpModule.register({
    //   timeout: 5000,
    //   maxRedirects: 5,
    // }),
  ],
  controllers: [BffController],
  providers: [AggregationService],
})
export class BffModule {}