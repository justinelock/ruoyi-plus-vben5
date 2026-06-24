import type { ProductConfig, ProductConfigQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/** 产品配置分页列表 */
/**
 * 分页查询产品配置（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /product/config/list
 */
export function productConfigList(params?: ProductConfigQuery) {
  return alovaInstance.get<PageResult<ProductConfig>>('/product/config/list', {
    params,
  });
}
