export interface FundWithdraw {
  id: string;
  userName: string;
  realName: string;
  withdrawAmount: string;
  usdtAddress: string;
  withdrawStatus: string;
  withdrawType: string;
  createTime: string;
  updateTime: string;
}

export interface FundWithdrawQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  withdrawStatus?: string;
  withdrawType?: string;
  createTime?: string[];
  [key: string]: any;
}
