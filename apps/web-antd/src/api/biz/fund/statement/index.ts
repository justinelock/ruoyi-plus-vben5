import type { FundStatement, FundStatementQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/**
 * 分页查询账户流水（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /fund/statement/list
 */
export function fundStatementList(params?: FundStatementQuery) {
  return alovaInstance.get<PageResult<FundStatement>>('/fund/statement/list', {
    params,
  });
}
