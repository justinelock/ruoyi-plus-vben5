/** 合约订单列表行（对齐 TradeContractItem / Java FbContractOrdersVO） */
export interface TradeContract {
  id: string;
  userId: string;
  username: string;
  mobile: string;
  realName: string;
  account: string;
  coinType: string;
  market: string;
  direction: number;
  tradePair: string;
  pairName: string;
  productName: string;
  amount: number;
  profitRatio: number;
  seconds: number;
  openingPrice: number;
  closingPrice?: number;
  openingTime: string;
  closingTime?: string;
  balance: number;
  walletBalanceAfterSettle?: number;
  expectedProfit?: number;
  actualProfit?: number;
  status: number;
  controlType?: number;
  controlResult?: number;
  remark: string;
  createTime: string;
  updateTime: string;
  version: number;
  userControl?: number;
  globalControlStateSnapshot: string;
  globalControlApplied?: number;
  hasBoughtFund: number;
}

export interface TradeContractQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  status?: string;
  controlResult?: string;
  type?: string;
  createTime?: string[];
  [key: string]: any;
}

export interface TradeContractBatchDirectionalReq {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  status?: string;
  beginTime?: string;
  endTime?: string;
  controlState: string;
}

/** 结算日志接口响应（detail 为 JSON 字符串） */
export interface TradeContractSettlementDetail {
  id: string;
  orderId: string;
  userId: string;
  detail: string;
}

/** 结算日志步骤（对齐 Java ContractSettlementLogDTO） */
export interface TradeContractSettlementLog {
  settlementStart?: {
    isSystem?: boolean;
    settlementType?: string;
    time?: string;
  };
  orderBasicInfo?: {
    account?: string;
    amount?: number;
    direction?: string;
    openingPrice?: number;
    time?: string;
  };
  priceInfo?: {
    systemPrice?: number;
    time?: string;
    usedPriceType?: string;
    userDirection?: string;
    userOpeningPrice?: number;
    userPrice?: number;
  };
  naturalResult?: {
    actualOpeningPrice?: number;
    isWin?: boolean;
    openingPrice?: number;
    result?: string;
    resultDescription?: string;
    time?: string;
  };
  userControlInfo?: {
    controlApplied?: boolean;
    controlResult?: string;
    controlState?: string;
    finalResult?: boolean;
    time?: string;
  };
  orderControlInfo?: {
    controlApplied?: boolean;
    controlResult?: string;
    controlState?: string;
    finalResult?: boolean;
    hasControl?: boolean;
    time?: string;
  };
  globalControlInfo?: {
    controlApplied?: boolean;
    controlState?: string;
    finalResult?: boolean;
    skippedByOrderControl?: boolean;
    skippedByUserControl?: boolean;
    time?: string;
  };
  priceAdjustment?: {
    adjustmentDescription?: string;
    finalResult?: boolean;
    priceBeforeAdjustment?: number;
    time?: string;
  };
  finalPrice?: {
    finalPrice?: number;
    isWin?: boolean;
    priceSource?: string;
    time?: string;
  };
  profitCalculation?: {
    calculationDescription?: string;
    time?: string;
  };
  orderStatusUpdate?: {
    actualProfit?: number;
    closingPrice?: number;
    state?: string;
    time?: string;
  };
  [key: string]: unknown;
}
