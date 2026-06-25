export interface FundStatement {
  id: string;
  userId: string;
  username?: string;
  mobile?: string;
  realName?: string;
  accountType?: string;
  flowType?: string;
  beforeAmount?: number;
  flowAmount?: number;
  afterAmount?: number;
  businessNo?: string;
  remark?: string;
  createdAt?: string;
  walletId?: string;
  currency?: string;
  description?: string;
  status?: string;
  updatedAt?: string;
}

export interface FundStatementQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  status?: string;
  type?: string;
  currency?: string;
  tradeTime?: string[];
  [key: string]: any;
}
