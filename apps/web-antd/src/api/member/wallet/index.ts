import type { MemberWallet, MemberWalletQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

enum Api {
  list = '/member/wallet/list',
}

/**
 * 分页查询用户钱包（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /member/wallet/list
 */
export function memberWalletList(params?: MemberWalletQuery) {
  return alovaInstance.get<PageResult<MemberWallet>>(Api.list, { params });
}
