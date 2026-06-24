export interface FundRecharge {
  id: string;
  userName: string;
  phoneNumber: string;
  realName: string;
  rechargeAmount: string;
  status: string;
  rechargeImage: string;
  remark: string;
  createTime: string;
  updateTime: string;
}

export interface FundRechargeQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  status?: string;
  createTime?: string[];
  [key: string]: any;
}
