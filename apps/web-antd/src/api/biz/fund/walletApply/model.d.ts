export interface FundWalletApply {
  id: string;
  userName: string;
  realName: string;
  phoneNumber: string;
  accountType: string;
  status: string;
  riskScore: string;
  auditOpinion: string;
  applyTime: string;
  auditTime: string;
  auditor: string;
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
