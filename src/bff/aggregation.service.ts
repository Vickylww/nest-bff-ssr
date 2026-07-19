// // src/bff/aggregation.service.ts
// 聚合多个后端 API
import { Injectable } from '@nestjs/common';

@Injectable()
export class AggregationService {
  // 可以暂时注释掉 HttpService 的注入
  // constructor(private readonly http: HttpService) {}

  async getPageData(userId: string) {
    // 返回模拟数据，用于测试 SSR 流程
    return {
      user: { name: '测试用户', id: userId },
      cart: { items: [1, 2, 3] },
      recommends: [
        { title: '推荐商品 A' },
        { title: '推荐商品 B' },
      ],
    };
  }
}