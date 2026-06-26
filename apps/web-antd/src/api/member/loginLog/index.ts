import type { MemberLoginLog, MemberLoginLogQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

enum Api {
  list = '/member/loginLog/list',
}

/**
 * 分页查询登录记录（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /member/loginLog/list
 */
export function memberLoginLogList(params?: MemberLoginLogQuery) {
  return alovaInstance.get<PageResult<MemberLoginLog>>(Api.list, { params });
}
