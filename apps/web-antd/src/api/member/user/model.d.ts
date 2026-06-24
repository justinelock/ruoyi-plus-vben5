import type { BaseEntity, PageQuery } from '#/api/common';

/** 业务用户列表行 */
export interface MemberUser {
  id: string;
  userName: string;
  totalBalance: string;
  investPosition: string;
  investDividend: string;
  realName: string;
  /** 1 在线 / 0 离线 */
  onlineStatus: string;
  status: string;
  inviteCode: string;
  createTime: string;
  lastLoginTime: string;
}

export interface MemberUserQuery extends PageQuery {
  /** 用户名 / 手机号 / 用户 ID 合并检索 */
  keyword?: string;
  /** 认证状态 */
  authStatus?: string;
  /** 是否已删：0 正常 / 1 已删 */
  deleted?: string;
  createTime?: string[];
}

/** 用户列表顶部「活跃用户」统计 */
export interface MemberUserStats {
  totalActiveSessions: number;
}
