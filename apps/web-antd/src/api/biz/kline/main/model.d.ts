export interface KlineMain {
  id: string;
  productCode: string;
  symbol: string;
  redisKey: string;
  barCount: string;
  latestTime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface KlineMainQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  productCode?: string;
  symbol?: string;
  [key: string]: any;
}
