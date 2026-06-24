import type { TradeEntrust, TradeEntrustQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/** 委托订单分页列表 */
/**
 * 分页查询委托订单（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /trade/entrust/list
 */
export function tradeEntrustList(params?: TradeEntrustQuery) {
  return alovaInstance.get<PageResult<TradeEntrust>>('/trade/entrust/list', {
    params,
  });
}
