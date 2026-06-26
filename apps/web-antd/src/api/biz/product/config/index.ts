import type {
  ProductConfig,
  ProductConfigQuery,
  ProductConfigSaveReq,
} from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/** 产品配置分页列表（对接 fb_fund_product） */
export function productConfigList(params?: ProductConfigQuery) {
  return alovaInstance.get<PageResult<ProductConfig>>('/product/config/list', {
    params,
  });
}

/** 产品配置详情 */
export function productConfigInfo(id: string) {
  return alovaInstance.get<ProductConfig>(`/product/config/${id}`);
}

/** 新增产品配置 */
export function productConfigAdd(data: ProductConfigSaveReq) {
  return alovaInstance.postWithMsg<void>('/product/config', data);
}

/** 修改产品配置 */
export function productConfigUpdate(data: ProductConfigSaveReq) {
  return alovaInstance.putWithMsg<void>('/product/config', data);
}

/** 删除产品配置 */
export function productConfigRemove(ids: string) {
  return alovaInstance.deleteWithMsg<void>(`/product/config/${ids}`);
}
