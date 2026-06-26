import type { ProductRealtime, ProductRealtimeQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/** 产品实时数据分页列表 */
/**
 * 分页查询产品实时行情（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /product/realtime/list
 */
export function productRealtimeList(params?: ProductRealtimeQuery) {
  return alovaInstance.get<PageResult<ProductRealtime>>(
    '/product/realtime/list',
    { params },
  );
}
