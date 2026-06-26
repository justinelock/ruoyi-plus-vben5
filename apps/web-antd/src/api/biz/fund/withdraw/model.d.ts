export interface FundWithdraw {
  id: string;
  userId: string;
  username?: string;
  mobile?: string;
  realName?: string;
  orderNo?: string;
  amount?: number;
  status?: string;
  withdrawType?: string;
  bankName?: string;
  bankCardNo?: string;
  accountName?: string;
  paymentStatus?: string;
  paymentNo?: string;
  paymentTime?: string;
  remark?: string;
  rejectReason?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FundWithdrawQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  status?: string;
  type?: string;
  createTime?: string[];
  [key: string]: any;
}

export interface FundWithdrawRejectReq {
  id: string;
  remark: string;
}
