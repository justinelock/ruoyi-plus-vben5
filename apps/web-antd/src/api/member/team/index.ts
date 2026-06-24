import type { MemberTeam, MemberTeamQuery, MemberTeamStats } from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

enum Api {
  list = '/member/team/list',
  stats = '/member/team/stats',
}

/**
 * 分页查询团队列表（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /member/team/list
 */
export function memberTeamList(params?: MemberTeamQuery) {
  return alovaInstance.get<PageResult<MemberTeam>>(Api.list, { params });
}

/**
 * 分页查询团队代理统计（占位接口，响应字段见 docs/biz-api.md）
 * @see GET /member/team/stats
 */
export function memberTeamStats(params?: MemberTeamQuery) {
  return alovaInstance.get<MemberTeamStats>(Api.stats, { params });
}
