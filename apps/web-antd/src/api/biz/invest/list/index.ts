import type { InvestList, InvestListQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/** 投信产品分页列表 */
/**
 * 分页查询投信产品（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /invest/list/list
 */
export function investListList(params?: InvestListQuery) {
  return alovaInstance.get<PageResult<InvestList>>('/invest/list/list', {
    params,
  });
}
