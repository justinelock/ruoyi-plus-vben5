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
