export interface TradeDeal {
  id: string;
  dealNo: string;
  userName: string;
  marketCode: string;
  stockCode: string;
  dealType: string;
  dealPrice: string;
  dealQty: string;
  dealAmount: string;
  fee: string;
  dealTime: string;
}

export interface TradeDealQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  marketCode?: string;
  dealType?: string;
  dealTime?: string[];
  [key: string]: any;
}
