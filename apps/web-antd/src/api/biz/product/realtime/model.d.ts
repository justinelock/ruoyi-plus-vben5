export interface ProductRealtime {
  id: string;
  productCode: string;
  tradeCode: string;
  name: string;
  type: string;
  currentPrice: string;
  changeAmount: string;
  changePercent: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  turnover: string;
  direction: string;
  tradeDate: string;
  updateTime: string;
}

export interface ProductRealtimeQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  productCode?: string;
  type?: string;
  tradeDate?: string[];
  [key: string]: any;
}
