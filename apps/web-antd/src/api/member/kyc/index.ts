import type { MemberKyc, MemberKycQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

enum Api {
  list = '/member/kyc/list',
  verify = '/member/kyc/verify',
}

/**
 * 分页查询实名认证列表（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /member/kyc/list
 */
export function memberKycList(params?: MemberKycQuery) {
  return alovaInstance.get<PageResult<MemberKyc>>(Api.list, { params });
}

/** 实名认证审核（对齐 Java PUT /verify） */
export function memberKycVerify(data: {
  id: string;
  state: 'REJECTED' | 'VERIFIED';
  remark?: string;
}) {
  return alovaInstance.putWithMsg<void>(Api.verify, data);
}
