import type { MemberUser, MemberUserQuery, MemberUserStats } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

enum Api {
  list = '/member/user/list',
  stats = '/member/user/stats',
}

/**
 * 分页查询业务用户列表（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /member/user/list
 */
export function memberUserList(params?: MemberUserQuery) {
  return alovaInstance.get<PageResult<MemberUser>>(Api.list, { params });
}

/**
 * 用户列表活跃统计（Redis 全局，近 5 分钟 presence 活跃用户数）
 * @see GET /member/user/stats
 */
export function memberUserStats() {
  return alovaInstance.get<MemberUserStats>(Api.stats);
}
