import type { MemberReport, MemberReportQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

enum Api {
  list = '/member/report/list',
}

/**
 * 分页查询用户报表（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /member/report/list
 */
export function memberReportList(params?: MemberReportQuery) {
  return alovaInstance.get<PageResult<MemberReport>>(Api.list, { params });
}
