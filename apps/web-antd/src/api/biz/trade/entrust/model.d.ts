export interface TradeEntrust {
  id: string;
  orderNo: string;
  userName: string;
  marketCode: string;
  stockCode: string;
  orderType: string;
  entrustPrice: string;
  entrustQty: string;
  dealQty: string;
  orderStatus: string;
  stopLossPrice: string;
  priceType: string;
  priceFloatRange: string;
  validity: string;
  fee: string;
  direction: string;
  limitPrice: string;
  entrustTime: string;
}

export interface TradeEntrustQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  orderStatus?: string;
  marketCode?: string;
  entrustTime?: string[];
  [key: string]: any;
}
