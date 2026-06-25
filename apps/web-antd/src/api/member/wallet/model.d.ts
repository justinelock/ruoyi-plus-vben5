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

/** 钱包抽屉操作提交（弹窗表单） */
export interface MemberWalletActionReq {
  actionType: 'account' | 'balance' | 'frozen' | 'ticket' | 'transfer';
  walletId?: string;
  direction?: string;
  amount?: number;
  quantity?: number;
  targetAccountType?: string;
  remark?: string;
}

/** 管理端加减款（对齐 MemberWalletAddOrSubtractReq / Java FbAddSubtractRequest） */
export interface MemberWalletAddOrSubtractReq {
  id: string;
  type: boolean;
  amount: number;
  remark?: string;
  flowType?: string;
}
