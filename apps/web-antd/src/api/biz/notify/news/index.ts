import type { NotifyNews, NotifyNewsQuery, NotifyNewsSaveReq } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/** 市场新闻分页列表（对接 fb_market_news） */
export function notifyNewsList(params?: NotifyNewsQuery) {
  return alovaInstance.get<PageResult<NotifyNews>>('/notify/news/list', {
    params,
  });
}

/** 市场新闻详情 */
export function notifyNewsInfo(id: string) {
  return alovaInstance.get<NotifyNews>(`/notify/news/${id}`);
}

/** 新增市场新闻 */
export function notifyNewsAdd(data: NotifyNewsSaveReq) {
  return alovaInstance.postWithMsg<void>('/notify/news', data);
}

/** 修改市场新闻 */
export function notifyNewsUpdate(data: NotifyNewsSaveReq) {
  return alovaInstance.putWithMsg<void>('/notify/news', data);
}
