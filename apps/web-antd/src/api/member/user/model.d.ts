import type { BaseEntity, ID, PageQuery } from '#/api/common';

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

/** 上级用户摘要 */
export interface MemberUserParentBrief {
  id: string;
  username?: string;
  realName?: string;
}

/** GET /member/user/{id} 用户详情 */
export interface MemberUserInfo {
  id: string;
  username: string;
  email?: string;
  mobile?: string;
  phone?: string;
  realName?: string;
  idCard?: string;
  verificationStatus?: string;
  verified?: boolean;
  creditScore?: number;
  securityQuestion?: string;
  securityAnswer?: string;
  role?: string;
  accountLocked?: boolean;
  failedAttempts?: number;
  lastLogin?: string;
  parentId?: string;
  parent?: MemberUserParentBrief;
  level?: number;
  agentLevel?: number;
  inviteCode?: string;
  commissionRate?: number;
  totalCommission?: number;
  teamSize?: number;
  status?: string;
  contractControl?: number;
  isOnline?: string;
  remark?: string;
  flag?: number;
  isTest?: boolean;
  hasPassword?: boolean;
  hasPayPassword?: boolean;
  payPasswordUpdatedAt?: string;
  payPasswordErrorCount?: number;
  payPasswordLockedUntil?: string;
  avatar?: string;
  totalBalance?: number;
  fundPositionAmount?: number;
  fundPositionDividend?: number;
  onlineStatus?: number;
  createdAt?: string;
  updatedAt?: string;
}

/** @deprecated 使用 MemberUserInfo */
export type MemberUserDetail = MemberUserInfo;

/** 用户编辑保存 */
export interface MemberUserUpdate {
  id: string;
  username?: string;
  password?: string;
  payPassword?: string;
  realName?: string;
  mobile?: string;
  email?: string;
  idCard?: string;
  securityQuestion?: string;
  securityAnswer?: string;
  parentId?: string;
  inviteCode?: string;
  commissionRate?: number;
  totalCommission?: number;
  creditScore?: number;
  verificationStatus?: string;
  accountLocked?: boolean;
  status?: string;
  verified?: boolean;
  contractControl?: number;
  remark?: string;
  /** 头像 base64 或 data URL */
  avatar?: string;
}

/** 重置业务用户密码 */
export interface MemberUserResetPwdParam {
  id: ID;
  password: string;
  /** 1=登录密码 2=交易密码 */
  type?: number;
}
