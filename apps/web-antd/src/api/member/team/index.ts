import type {
  MemberTeam,
  MemberTeamAgentLevelParam,
  MemberTeamAgentLevelResult,
  MemberTeamChangeParentParam,
  MemberTeamChangeParentResult,
  MemberTeamDetail,
  MemberTeamMember,
  MemberTeamQuery,
  MemberTeamStats,
} from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

enum Api {
  agentLevel = '/member/team/agentLevel',
  changeParent = '/member/team/changeParent',
  detail = '/member/team',
  list = '/member/team/list',
  members = '/member/team/members',
  stats = '/member/team/stats',
}

/**
 * 团队列表分页
 * @see GET /member/team/list
 */
export function memberTeamList(params?: MemberTeamQuery) {
  return alovaInstance.get<PageResult<MemberTeam>>(Api.list, { params });
}

/**
 * 团队统计卡片
 * @see GET /member/team/stats
 */
export function memberTeamStats(params?: MemberTeamQuery) {
  return alovaInstance.get<MemberTeamStats>(Api.stats, { params });
}

/**
 * 团队详情弹窗
 * @see GET /member/team/{id}
 */
export function memberTeamInfo(id: string) {
  return alovaInstance.get<MemberTeamDetail>(`${Api.detail}/${id}`);
}

/**
 * 下级团队成员分页
 * @see GET /member/team/members/{userId}
 */
export function memberTeamMembers(
  userId: string,
  params?: { pageNum?: number; pageSize?: number },
) {
  return alovaInstance.get<PageResult<MemberTeamMember>>(
    `${Api.members}/${userId}`,
    { params },
  );
}

/**
 * 更换上级代理
 * @see PUT /member/team/changeParent
 */
export function memberTeamChangeParent(data: MemberTeamChangeParentParam) {
  return alovaInstance.put<MemberTeamChangeParentResult>(
    Api.changeParent,
    data,
  );
}

/**
 * 调整代理层级
 * @see PUT /member/team/agentLevel
 */
export function memberTeamAgentLevel(data: MemberTeamAgentLevelParam) {
  return alovaInstance.put<MemberTeamAgentLevelResult>(Api.agentLevel, data);
}
