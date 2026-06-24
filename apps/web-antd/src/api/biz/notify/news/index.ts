import type { NotifyNews, NotifyNewsQuery } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/** 市场新闻分页列表 */
/**
 * 分页查询市场新闻（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /notify/news/list
 */
export function notifyNewsList(params?: NotifyNewsQuery) {
  return alovaInstance.get<PageResult<NotifyNews>>('/notify/news/list', {
    params,
  });
}
