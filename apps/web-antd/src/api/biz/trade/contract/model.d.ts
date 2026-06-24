export interface TradeContract {
  id: string;
  userName: string;
  realName: string;
  balanceU: string;
  symbol: string;
  direction: string;
  tradeAmount: string;
  actualProfit: string;
  status: string;
  durationSec: string;
  openPrice: string;
  closePrice: string;
  orderControl: string;
  controlResult: string;
  globalControl: string;
  openTime: string;
  settleTime: string;
}

export interface TradeContractQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  status?: string;
  symbol?: string;
  direction?: string;
  openTime?: string[];
  [key: string]: any;
}
