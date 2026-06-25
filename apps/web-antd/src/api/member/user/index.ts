import type { MemberUser, MemberUserResetPwdParam, MemberUserQuery, MemberUserStats } from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

enum Api {
  list = '/member/user/list',
  stats = '/member/user/stats',
  root = '/member/user',
  resetPwd = '/member/user/resetPwd',
}

/**
 * 分页查询业务用户列表
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

/**
 * 删除业务用户（逻辑删除 flag=1）
 * @param ids 用户 id，支持单个或数组
 */
export function memberUserRemove(ids: IDS) {
  const idStr = Array.isArray(ids) ? ids.join(',') : ids;
  return alovaInstance.deleteWithMsg<void>(`${Api.root}/${idStr}`);
}

/**
 * 重置业务用户密码（默认登录密码 type=1）
 */
export function memberUserResetPassword(data: MemberUserResetPwdParam) {
  return alovaInstance.putWithMsg<void>(Api.resetPwd, {
    type: 1,
    ...data,
  });
}
