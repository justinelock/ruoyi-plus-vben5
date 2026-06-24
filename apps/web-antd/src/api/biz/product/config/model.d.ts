export interface ProductConfig {
  id: string;
  productCode: string;
  productAlias: string;
  symbol: string;
  productName: string;
  productType: string;
  market: string;
  odds: string;
  tradeTime: string;
  currencies: string;
  status: string;
  createTime: string;
  updateTime: string;
}

export interface ProductConfigQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  productType?: string;
  status?: string;
  createTime?: string[];
  [key: string]: any;
}
