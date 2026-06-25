/** 用户钱包列表行（对齐 MemberWalletItem） */
export interface MemberWallet {
  id: string;
  userId: string;
  username: string;
  mobile: string;
  realName: string;
  accountType: string;
  balance: number;
  frozenAmount: number;
  frozen: boolean;
  version: string;
  currency: string;
  drawTicket: number;
  createdAt: string;
  updatedAt: string;
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
