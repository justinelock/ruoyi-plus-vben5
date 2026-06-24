import type { FundRecharge, FundRechargeQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/**
 * 分页查询充值记录（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /fund/recharge/list
 */
export function fundRechargeList(params?: FundRechargeQuery) {
  return alovaInstance.get<PageResult<FundRecharge>>('/fund/recharge/list', {
    params,
  });
}
