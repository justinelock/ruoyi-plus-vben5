export interface InvestPosition {
  id: string;
  userId?: string;
  username?: string;
  mobile?: string;
  realName?: string;
  fundCode?: string;
  fundName?: string;
  amount?: number;
  buyDate?: string;
  startDate?: string;
  endDate?: string;
  period?: number;
  rate?: number;
  profit?: number;
  state?: string;
  status?: number;
  lastProfitDate?: string;
  createTime?: string;
  updateTime?: string;
}

export interface InvestPositionQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  fundCode?: string;
  status?: string;
  createTime?: string[];
  [key: string]: any;
}

export interface InvestPositionOrder {
  id: string;
  userId?: string;
  positionId?: string;
  orderId?: string;
  fundCode?: string;
  profitDate?: string;
  profitDatetime?: string;
  profit?: number;
  cumulativeProfit?: number;
  status?: number;
  createTime?: string;
  updateTime?: string;
}

export interface InvestPositionOrderQuery {
  pageNum?: number;
  pageSize?: number;
  userId: string;
  positionId: string;
}

export interface InvestPositionProfitBeforeReq {
  id: string;
  profitDate: string;
}

export interface InvestPositionProfitBeforeResp {
  profit: null | number;
}

export interface InvestPositionUpdateProfitReq {
  id: string;
  profitDate: string;
  profit: number;
}
