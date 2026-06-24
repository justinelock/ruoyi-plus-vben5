import type { InvestPosition, InvestPositionQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/** 持仓订单分页列表 */
/**
 * 分页查询持仓订单（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /invest/position/list
 */
export function investPositionList(params?: InvestPositionQuery) {
  return alovaInstance.get<PageResult<InvestPosition>>(
    '/invest/position/list',
    { params },
  );
}
