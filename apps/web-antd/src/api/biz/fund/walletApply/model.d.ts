export interface FundWalletApply {
  id: string;
  userId: string;
  username?: string;
  mobile?: string;
  realName?: string;
  accountType?: string;
  status?: string;
  state?: string;
  riskAssessmentScore?: number;
  rejectReason?: string;
  applyTime?: string;
  auditTime?: string;
  auditUserId?: string;
  auditUser?: string;
  remark?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FundWalletApplyQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  status?: string;
  accountType?: string;
  applyTime?: string[];
  [key: string]: any;
}

/** 详情弹窗 basicInfo */
export interface FundWalletApplyBasicInfo {
  id: string;
  username?: string;
  accountType?: string;
  riskAssessmentScore?: number;
  status?: string;
  applyTime?: string;
  auditTime?: string;
  rejectReason?: string;
  remark?: string;
}

export interface FundWalletApplySecurityInfo {
  twoFactorEnabled: boolean;
  securityScore: number;
  identityVerified: boolean;
}

export interface FundWalletApplyLoginStats {
  commonLoginIp?: string;
  lastLoginTime?: string;
  commonLoginArea?: string;
  monthLoginCount?: number;
}

export interface FundWalletApplyFlowStats {
  tradeSuccessRate?: string;
  monthFlowCount?: number;
  dailyAvgAmount?: number;
  monthIncome?: number;
  monthExpense?: number;
  typeStatsMap?: Record<string, number>;
}

/** GET /fund/walletApply/detail/{id} */
export interface FundWalletApplyDetail {
  id?: string;
  userId?: string;
  basicInfo?: FundWalletApplyBasicInfo;
  securityInfo?: FundWalletApplySecurityInfo;
  loginStats?: FundWalletApplyLoginStats;
  flowStats?: FundWalletApplyFlowStats;
}

/** 最近流水行 */
export interface FundWalletApplyFlowItem {
  id: string;
  userId: string;
  accountType?: string;
  flowType?: string;
  beforeAmount?: number;
  flowAmount?: number;
  afterAmount?: number;
  businessNo?: string;
  remark?: string;
  createdAt?: string;
  walletId?: string;
  currency?: string;
  description?: string;
  status?: string;
  updatedAt?: string;
}

/** 登录记录行 */
export interface FundWalletApplyLoginLogItem {
  id: string;
  userId: string;
  username?: string;
  loginTime?: string;
  loginIp?: string;
  loginLocation?: string;
  loginType?: string;
  loginResult?: string;
  failReason?: string;
  riskLevel?: string;
  riskDetail?: string;
}
