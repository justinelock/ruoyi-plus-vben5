export interface FundStatement {
  id: string;
  userName: string;
  phoneNumber: string;
  realName: string;
  accountType: string;
  tradeType: string;
  changeAmount: string;
  balanceBefore: string;
  balanceAfter: string;
  tradeStatus: string;
  currency: string;
  tradeDesc: string;
  remark: string;
  tradeTime: string;
}

export interface FundStatementQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  tradeType?: string;
  tradeStatus?: string;
  currency?: string;
  tradeTime?: string[];
  [key: string]: any;
}
