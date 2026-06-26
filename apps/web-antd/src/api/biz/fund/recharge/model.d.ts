/** 充值管理列表行（对齐 FundRechargeItem / Java selectPageWithUser） */
export interface FundRecharge {
  id: string;
  userId: string;
  username: string;
  mobile: string;
  realName: string;
  orderNo: string;
  amount: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  paymentNo: string;
  paymentTime: string;
  remark: string;
  currency: string;
  targetAccount: string;
  screenshot: string;
  createdAt: string;
  updatedAt: string;
}

export interface FundRechargeQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  status?: string;
  username?: string;
  mobile?: string;
  realName?: string;
  createTime?: string[];
  [key: string]: any;
}

export interface FundRechargeRejectReq {
  id: string;
  remark: string;
}
