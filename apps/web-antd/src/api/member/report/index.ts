import type {
  MemberReport,
  MemberReportFlow,
  MemberReportFlowQuery,
  MemberReportQuery,
} from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

enum Api {
  flow = '/member/report/flow',
  list = '/member/report/list',
}

/**
 * 分页查询用户报表
 * @see GET /member/report/list
 */
export function memberReportList(params?: MemberReportQuery) {
  return alovaInstance.get<PageResult<MemberReport>>(Api.list, { params });
}

/**
 * 按用户 ID 分页查询账户流水
 * @see GET /member/report/flow/{userId}
 */
export function memberReportFlow(
  userId: string,
  params?: MemberReportFlowQuery,
) {
  return alovaInstance.get<PageResult<MemberReportFlow>>(
    `${Api.flow}/${userId}`,
    { params },
  );
}
