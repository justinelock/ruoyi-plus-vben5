import type { MemberWallet, MemberWalletActionReq, MemberWalletQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

enum Api {
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
 * 钱包操作（加减款/开关账户/冻解金额/加减券/划转）
 * 后端契约待补充；接口未就绪时返回 placeholder 供弹窗区分提示
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
