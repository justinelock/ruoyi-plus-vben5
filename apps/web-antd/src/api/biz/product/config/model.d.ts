export interface ProductConfig {
  id: string;
  code?: string;
  alias?: string;
  tradePair?: string;
  name?: string;
  type?: string;
  market?: string;
  tradingHours?: string;
  description?: string;
  status?: number;
  dividendRatio?: number;
  currency?: string;
  period?: number;
  totalDividendRate?: number;
  dailyDividendRate?: number;
  dividendEndDate?: string;
  dividendStrDate?: string;
  isLocked?: number;
  limitBuyCount?: number;
  limitSellDays?: number;
  limitBuyAmount?: number;
  sort?: number;
  odds?: number;
  createTime?: string;
  updateTime?: string;
}

export interface ProductConfigQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  type?: string;
  status?: string;
  orderField?: string;
  order?: string;
  createTime?: string[];
  [key: string]: any;
}

export interface ProductConfigSaveReq {
  id?: string;
  code: string;
  alias?: string;
  tradePair?: string;
  name: string;
  type: string;
  market: string;
  tradingHours?: string;
  description?: string;
  status: number;
  currency: string;
  odds: number;
  sort?: number;
}
