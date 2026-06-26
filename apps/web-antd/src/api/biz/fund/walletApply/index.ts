import type {
  FundWalletApply,
  FundWalletApplyDetail,
  FundWalletApplyFlowItem,
  FundWalletApplyLoginLogItem,
  FundWalletApplyQuery,
} from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

enum Api {
  currentMonthFlow = '/fund/walletApply/flow/currentMonth',
  detail = '/fund/walletApply/detail',
  list = '/fund/walletApply/list',
  loginLog = '/fund/walletApply/loginLog',
  verify = '/fund/walletApply/verify',
}

/**
 * 钱包申请列表
 * @see GET /fund/walletApply/list
 */
export function fundWalletApplyList(params?: FundWalletApplyQuery) {
  return alovaInstance.get<PageResult<FundWalletApply>>(Api.list, { params });
}

/**
 * 钱包申请详情
 * @see GET /fund/walletApply/detail/{id}
 */
export function fundWalletApplyDetail(id: string) {
  return alovaInstance.get<FundWalletApplyDetail>(`${Api.detail}/${id}`);
}

/**
 * 钱包申请-当月流水全量
 * @see GET /fund/walletApply/flow/currentMonth?userId=
 */
export function fundWalletApplyCurrentMonthFlow(userId: string) {
  return alovaInstance.get<PageResult<FundWalletApplyFlowItem>>(
    Api.currentMonthFlow,
    { params: { userId } },
  );
}

/**
 * 钱包申请-登录记录
 * @see GET /fund/walletApply/loginLog/{userId}
 */
export function fundWalletApplyLoginLog(
  userId: string,
  params?: { pageNum?: number; pageSize?: number },
) {
  return alovaInstance.get<PageResult<FundWalletApplyLoginLogItem>>(
    `${Api.loginLog}/${userId}`,
    { params },
  );
}

/** 钱包申请审核（对齐 Java PUT /verify） */
export function fundWalletApplyVerify(data: {
  id: string;
  remark: string;
  state: 'APPROVED' | 'REJECTED';
}) {
  return alovaInstance.putWithMsg<void>(Api.verify, data);
}
