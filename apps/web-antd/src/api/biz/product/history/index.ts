import type { ProductHistory, ProductHistoryQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/** 产品历史数据分页列表 */
/**
 * 分页查询产品历史行情（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /product/history/list
 */
export function productHistoryList(params?: ProductHistoryQuery) {
  return alovaInstance.get<PageResult<ProductHistory>>(
    '/product/history/list',
    {
      params,
    },
  );
}
