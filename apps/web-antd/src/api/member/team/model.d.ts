export interface MemberTeamAgent {
  id: string;
  username: string;
  realName: string;
}

/** 团队列表行（对齐 MemberTeamItem） */
export interface MemberTeam {
  id: string;
  username: string;
  agent?: MemberTeamAgent;
  realName: string;
  level: number;
  status: string;
  teamSize: number;
  level1Members: number;
  level2Members: number;
  level3Members: number;
  level4Members: number;
  level5Members: number;
  agentLevel: number;
  walletCount: number;
  balance: number;
  totalTeamBalance: number;
  createdAt: string;
}

/** 团队统计（对齐 MemberTeamStatsResp） */
export interface MemberTeamStats {
  totalMembers: number;
  level1Members: number;
  level2Members: number;
  level3Members: number;
  level4Members: number;
  level5Members: number;
  totalTeamBalance: number;
}

export interface MemberTeamQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  status?: string;
  registerTime?: string[];
  [key: string]: any;
}

/** 团队详情弹窗 */
export interface MemberTeamDetail {
  id: string;
  username: string;
  agentLevel: number;
  walletCount: number;
  totalAssets: number;
  totalDeposit: number;
  totalWithdraw: number;
  createdAt: string;
}

/** 下级团队成员行 */
export interface MemberTeamMember {
  level: number;
  username: string;
  totalAssets: number;
  totalDeposit: number;
  totalInvest: number;
  totalWithdraw: number;
}

export interface MemberTeamChangeParentParam {
  userId: string;
  /** 新上级用户名（必填） */
  username: string;
}

/** 更换上级成功响应（data 内） */
export interface MemberTeamChangeParentResult {
  userId: string;
  parentId?: string;
  parentUsername?: string;
}

export interface MemberTeamAgentLevelParam {
  userId: string;
  agentLevel: number;
}

/** 调整代理层级成功响应（data 内） */
export interface MemberTeamAgentLevelResult {
  userId: string;
  agentLevel: number;
}
