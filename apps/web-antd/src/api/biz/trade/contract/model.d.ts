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
    time?: string;
    settlementType?: string;
    isSystem?: boolean;
  };
  orderBasicInfo?: {
    time?: string;
    account?: string;
    direction?: string;
    amount?: number;
    openingPrice?: number;
  };
  priceInfo?: {
    time?: string;
    systemPrice?: number;
    userPrice?: number;
    usedPriceType?: string;
    userOpeningPrice?: number;
    userDirection?: string;
  };
  naturalResult?: {
    time?: string;
    isWin?: boolean;
    resultDescription?: string;
    actualOpeningPrice?: number;
    openingPrice?: number;
    result?: string;
  };
  userControlInfo?: {
    time?: string;
    controlState?: string;
    controlApplied?: boolean;
    finalResult?: boolean;
    controlResult?: string;
  };
  orderControlInfo?: {
    time?: string;
    hasControl?: boolean;
    controlState?: string;
    controlApplied?: boolean;
    finalResult?: boolean;
    controlResult?: string;
  };
  globalControlInfo?: {
    time?: string;
    controlState?: string;
    controlApplied?: boolean;
    skippedByUserControl?: boolean;
    skippedByOrderControl?: boolean;
    finalResult?: boolean;
  };
  priceAdjustment?: {
    time?: string;
    finalResult?: boolean;
    priceBeforeAdjustment?: number;
    adjustmentDescription?: string;
  };
  finalPrice?: {
    time?: string;
    finalPrice?: number;
    priceSource?: string;
    isWin?: boolean;
  };
  profitCalculation?: {
    time?: string;
    calculationDescription?: string;
  };
  orderStatusUpdate?: {
    time?: string;
    state?: string;
    closingPrice?: number;
    actualProfit?: number;
  };
  [key: string]: unknown;
}
