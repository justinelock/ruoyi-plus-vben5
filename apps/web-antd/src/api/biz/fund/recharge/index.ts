import type {
  FundRecharge,
  FundRechargeQuery,
  FundRechargeRejectReq,
} from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

enum Api {
  approved = '/fund/recharge/approved',
  list = '/fund/recharge/list',
  rejected = '/fund/recharge/rejected',
}

/**
 * 充值管理列表
 * @see GET /fund/recharge/list
 */
export function fundRechargeList(params?: FundRechargeQuery) {
  return alovaInstance.get<PageResult<FundRecharge>>(Api.list, { params });
}

/**
 * 批准充值
 * @see PUT /fund/recharge/approved/{id}
 */
export function fundRechargeApproved(id: string) {
  return alovaInstance.put<void>(`${Api.approved}/${id}`);
}

/**
 * 拒绝充值
 * @see PUT /fund/recharge/rejected
 */
export function fundRechargeRejected(data: FundRechargeRejectReq) {
  return alovaInstance.put<void>(Api.rejected, data);
}
