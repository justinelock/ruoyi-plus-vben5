export interface MemberReport {
  id: string;
  userName: string;
  realName: string;
  level: string;
  balance: string;
  totalRecharge: string;
  totalWithdraw: string;
  rechargeDiff: string;
  totalProfit: string;
  parentInfo: string;
  teamCount: string;
  createTime: string;
  lastLoginTime: string;
  loginIp: string;
}

export interface MemberReportQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  level?: string;
  createTime?: string[];
  [key: string]: any;
}
