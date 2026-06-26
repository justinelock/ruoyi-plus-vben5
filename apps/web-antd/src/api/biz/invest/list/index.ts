import type { InvestList, InvestListQuery, InvestListSaveReq } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/** 投信产品分页列表（对接 fb_fund） */
export function investListList(params?: InvestListQuery) {
  return alovaInstance.get<PageResult<InvestList>>('/invest/list/list', {
    params,
  });
}

/** 投信产品详情 */
export function investListInfo(id: string) {
  return alovaInstance.get<InvestList>(`/invest/list/${id}`);
}

/** 新增投信产品 */
export function investListAdd(data: InvestListSaveReq) {
  return alovaInstance.postWithMsg<void>('/invest/list', data);
}

/** 修改投信产品 */
export function investListUpdate(data: InvestListSaveReq) {
  return alovaInstance.putWithMsg<void>('/invest/list', data);
}

/** 删除投信产品（ids 逗号分隔） */
export function investListRemove(ids: string) {
  return alovaInstance.deleteWithMsg<void>(`/invest/list/${ids}`);
}
