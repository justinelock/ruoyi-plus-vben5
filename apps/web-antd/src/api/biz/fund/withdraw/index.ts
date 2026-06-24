import type { FundWithdraw, FundWithdrawQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/**
 * 分页查询提现记录（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /fund/withdraw/list
 */
export function fundWithdrawList(params?: FundWithdrawQuery) {
  return alovaInstance.get<PageResult<FundWithdraw>>('/fund/withdraw/list', {
    params,
  });
}
