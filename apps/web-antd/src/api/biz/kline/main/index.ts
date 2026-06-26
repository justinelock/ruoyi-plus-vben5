import type { KlineMain, KlineMainQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/** K 线数据分页列表 */
/**
 * 分页查询K线数据（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /kline/main/list
 */
export function klineMainList(params?: KlineMainQuery) {
  return alovaInstance.get<PageResult<KlineMain>>('/kline/main/list', {
    params,
  });
}
