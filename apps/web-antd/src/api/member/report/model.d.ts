export interface MemberReportParentUser {
  id: string;
  username: string;
}

/** 用户报表列表行（对齐 MemberReportItem） */
export interface MemberReport {
  id: string;
  userId: string;
  username: string;
  mobile: string;
  realName: string;
  level: number;
  amount: number;
  rechargeAmount: number;
  withdrawAmount: number;
  rechargeDiff: number;
  totalProfit: number;
  teamCount: number;
  registerTime: string;
  lastLogin: string;
  loginIp: string;
  parentUser?: MemberReportParentUser;
}

/** 用户流水明细行（对齐 MemberReportFlowItem） */
export interface MemberReportFlow {
  id: string;
  userId: string;
  username: string;
  mobile: string;
  realName: string;
  accountType: string;
  flowType: string;
  beforeAmount: number;
  flowAmount: number;
  afterAmount: number;
  businessNo: string;
  remark: string;
  createdAt: string;
  walletId: string;
  currency: string;
  description: string;
  status: string;
  updatedAt: string;
}

export interface MemberReportQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  level?: string;
  status?: string;
  verified?: string;
  orderField?: string;
  order?: string;
  createTime?: string[];
  [key: string]: any;
}

export interface MemberReportFlowQuery {
  pageNum?: number;
  pageSize?: number;
  status?: string;
  type?: string;
  keyword?: string;
  username?: string;
  mobile?: string;
  realName?: string;
  [key: string]: any;
}
