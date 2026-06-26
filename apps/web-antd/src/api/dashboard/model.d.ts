/** 分析页仪表盘统计（对齐 GET /dashboard/statistics） */
export interface DashboardStatistics {
  type: number;
  pendingUserCount: number;
  approvedUserCount: number;
  verifiedUserCount: number;
  rejectedUserCount: number;
  pendingUserWalletCount: number;
  approvedUserWalletCount: number;
  rejectedUserWalletCount: number;
  depositCount: number;
  depositSum: number;
  withdrawCount: number;
  withdrawSum: number;
}

/** 时间维度：0 当天 1 本周 2 本月 */
export type DashboardStatisticsType = 0 | 1 | 2;
