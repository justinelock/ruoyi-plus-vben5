import type { TradeContract, TradeContractQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/** 合约订单分页列表 */
/**
 * 分页查询合约订单（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /trade/contract/list
 */
export function tradeContractList(params?: TradeContractQuery) {
  return alovaInstance.get<PageResult<TradeContract>>('/trade/contract/list', {
    params,
  });
}
