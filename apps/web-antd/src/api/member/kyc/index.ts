import type { MemberKyc, MemberKycQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

enum Api {
  list = '/member/kyc/list',
}

/**
 * 分页查询实名认证列表（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /member/kyc/list
 */
export function memberKycList(params?: MemberKycQuery) {
  return alovaInstance.get<PageResult<MemberKyc>>(Api.list, { params });
}
