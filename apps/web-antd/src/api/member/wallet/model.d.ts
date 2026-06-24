export interface MemberWallet {
  id: string;
  userName: string;
  phoneNumber: string;
  realName: string;
  accountType: string;
  balance: string;
  frozenAmount: string;
  /** 1 冻结 / 0 正常 */
  frozen: string;
  version: string;
  currency: string;
  lotteryCount: string;
  createTime: string;
  updateTime: string;
}

export interface MemberWalletQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  accountType?: string;
  currency?: string;
  frozenStatus?: string;
  [key: string]: any;
}
