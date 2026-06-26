import type { FundStatement, FundStatementQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

enum Api {
  detail = '/fund/statement/detail',
  list = '/fund/statement/list',
}

/**
 * 账户流水列表
 * @see GET /fund/statement/list
 */
export function fundStatementList(params?: FundStatementQuery) {
  return alovaInstance.get<PageResult<FundStatement>>(Api.list, { params });
}

/**
 * 账户流水详情
 * @see GET /fund/statement/detail/{id}
 */
export function fundStatementDetail(id: string) {
  return alovaInstance.get<FundStatement>(`${Api.detail}/${id}`);
}
