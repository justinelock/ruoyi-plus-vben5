import type { FundWalletApply, FundWalletApplyQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/**
 * 分页查询钱包申请（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /fund/walletApply/list
 */
export function fundWalletApplyList(params?: FundWalletApplyQuery) {
  return alovaInstance.get<PageResult<FundWalletApply>>(
    '/fund/walletApply/list',
    { params },
  );
}
