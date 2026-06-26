export interface InvestList {
  id: string;
  code?: string;
  symbol?: string;
  name?: string;
  company?: string;
  ev?: string;
  price?: number;
  currency?: string;
  description?: string;
  poster?: string;
  status?: number;
  soldOut?: number;
  rateMin?: number;
  rateMax?: number;
  rate?: number;
  minAmount?: number;
  minAppendAmount?: number;
  maxAmount?: number;
  period?: number;
  rateMode?: string;
  latestAmountRaised?: number;
  lastestFundingDate?: string;
  sort?: number;
  createTime?: string;
  updateTime?: string;
}

export interface InvestListQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  name?: string;
  code?: string;
  status?: string;
  soldOut?: string;
  orderField?: string;
  order?: string;
  createTime?: string[];
  [key: string]: any;
}

export interface InvestListSaveReq {
  id?: string;
  code: string;
  symbol: string;
  name: string;
  company: string;
  ev?: string;
  price?: number;
  currency?: string;
  description?: string;
  poster?: string;
  status?: number;
  soldOut?: number;
  rateMin?: number;
  rateMax?: number;
  rate: number;
  minAmount: number;
  minAppendAmount?: number;
  maxAmount: number;
  period: number;
  rateMode?: string;
  latestAmountRaised?: number;
  lastestFundingDate?: string;
  sort: number;
}
