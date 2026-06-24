export interface ProductHistory {
  id: string;
  productCode: string;
  productName: string;
  productType: string;
  market: string;
  tradeDate: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  closePrice: string;
  changeAmount: string;
  changePercent: string;
  volume: string;
  turnover: string;
  updateTime: string;
}

export interface ProductHistoryQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  productCode?: string;
  market?: string;
  tradeDate?: string[];
  [key: string]: any;
}
