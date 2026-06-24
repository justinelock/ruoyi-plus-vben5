export interface MemberTeam {
  id: string;
  userName: string;
  balance: string;
  realName: string;
  parentAgent: string;
  agentLevel1: string;
  agentLevel2: string;
  agentLevel3: string;
  agentLevel4: string;
  agentLevel5: string;
  agentTier: string;
  subTeamCount: string;
  subTeamBalance: string;
  status: string;
  registerTime: string;
}

export interface MemberTeamStats {
  level1Count: number;
  level2Count: number;
  level3Count: number;
  level4Count: number;
  level5Count: number;
  totalMembers: number;
  totalBalance: string;
}

export interface MemberTeamQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  status?: string;
  registerTime?: string[];
  [key: string]: any;
}
