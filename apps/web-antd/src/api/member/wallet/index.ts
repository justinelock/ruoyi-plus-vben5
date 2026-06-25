import type {
  MemberWallet,
  MemberWalletActionReq,
  MemberWalletAddOrSubtractReq,
  MemberWalletQuery,
} from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

enum Api {
  addOrSubtract = '/member/wallet/addOrSubtract',
  action = '/member/wallet/action',
  list = '/member/wallet/list',
}

/**
 * 分页查询用户钱包（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /member/wallet/list
 */
export function memberWalletList(params?: MemberWalletQuery) {
  return alovaInstance.get<PageResult<MemberWallet>>(Api.list, { params });
}

/**
 * 管理端加减款（对齐 PUT /member/wallet/addOrSubtract）
 */
export function memberWalletAddOrSubtract(data: MemberWalletAddOrSubtractReq) {
  return alovaInstance.put<void>(Api.addOrSubtract, data);
}

/**
 * 其他钱包操作（开关账户/冻解金额/加减券/划转）占位
 */
export async function memberWalletAction(
  data: MemberWalletActionReq,
): Promise<'ok' | 'placeholder'> {
  try {
    await alovaInstance.post<void>(Api.action, data, {
      errorMessageMode: 'none',
    });
    return 'ok';
  } catch {
    return 'placeholder';
  }
}
