import type { NotifyPublish, NotifyPublishQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/** 通知发布分页列表 */
/**
 * 分页查询通知发布（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /notify/publish/list
 */
export function notifyPublishList(params?: NotifyPublishQuery) {
  return alovaInstance.get<PageResult<NotifyPublish>>('/notify/publish/list', {
    params,
  });
}
