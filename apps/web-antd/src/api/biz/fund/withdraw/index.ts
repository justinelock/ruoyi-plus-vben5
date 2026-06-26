import type {
  FundWithdraw,
  FundWithdrawQuery,
  FundWithdrawRejectReq,
} from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

enum Api {
  approved = '/fund/withdraw/approved',
  list = '/fund/withdraw/list',
  rejected = '/fund/withdraw/rejected',
}

/**
 * 提现管理列表
 * @see GET /fund/withdraw/list
 */
export function fundWithdrawList(params?: FundWithdrawQuery) {
  return alovaInstance.get<PageResult<FundWithdraw>>(Api.list, { params });
}

/**
 * 批准提现
 * @see PUT /fund/withdraw/approved/{id}
 */
export function fundWithdrawApproved(id: string) {
  return alovaInstance.put<void>(`${Api.approved}/${id}`);
}

/**
 * 拒绝提现
 * @see PUT /fund/withdraw/rejected
 */
export function fundWithdrawRejected(data: FundWithdrawRejectReq) {
  return alovaInstance.put<void>(Api.rejected, data);
}
