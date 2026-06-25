import type { BaseEntity, PageQuery } from '#/api/common';

/** 业务用户列表行（对齐 MemberUserItem） */
export interface MemberUser {
  id: string;
  username: string;
  realName: string;
  idCard: string;
  agentLevel: number;
  inviteCode: string;
  commissionRate: number;
  totalCommission: number;
  totalBalance: number;
  fundPositionAmount: number;
  fundPositionDividend: number;
  status: string;
  /** 1 在线 / 0 离线 */
  onlineStatus: number;
  lastLogin: string;
  createdAt: string;
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

/** 用户列表顶部活跃统计 */
export interface MemberUserStats {
  totalOnlineUsers: number;
  todayLogins: number;
  totalActiveSessions: number;
}

/** 重置业务用户密码 */
export interface MemberUserResetPwdParam {
  id: ID;
  password: string;
  /** 1=登录密码 2=交易密码 */
  type?: number;
}
