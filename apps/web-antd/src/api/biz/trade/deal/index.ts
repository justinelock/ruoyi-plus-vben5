import type { TradeDeal, TradeDealQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/** 成交订单分页列表 */
/**
 * 分页查询成交订单（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /trade/deal/list
 */
export function tradeDealList(params?: TradeDealQuery) {
  return alovaInstance.get<PageResult<TradeDeal>>('/trade/deal/list', {
    params,
  });
}
