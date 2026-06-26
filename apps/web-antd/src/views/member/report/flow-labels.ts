/** 账户类型文案（对齐 wallet-action-data） */
export const accountTypeLabelMap: Record<string, string> = {
  main: '主账户',
  sub: '子账户',
  forex: '外汇账户',
};

/** 交易类型文案（对齐 Java FlowType.description） */
export const flowTypeLabelMap: Record<string, string> = {
  DEPOSIT: '充值',
  WITHDRAW: '提现',
  WITHDRAWU: 'USDT提现',
  WITHDRAW_FAILED: '提现失败',
  TRANSFER: '转账',
  TRANSFER_OUT: '划出',
  TRANSFER_IN: '划入',
  TRADE: '交易',
  FREEZE: '冻结',
  UNFREEZE: '解冻',
  TICKET_ADD: '获得抽奖券',
  TICKET_USE: '使用抽奖券',
  LUCKY_DRAW: '抽奖奖励',
  SIGN_IN: '签到奖励',
  TASK_REWARD: '任务奖励',
  NEWCOMER_REWARD: '新手奖励',
  ADD_BONUS: '彩金',
  ADD_TRANSFER: '划转',
  ADD_DIVIDEND: '团队分红',
  ADD_AMOUNT: '充值',
  SUBTRACT_AMOUNT: '减款',
  ADD_TICKET: '加抽奖券',
  SUBTRACT_TICKET: '减抽奖券',
  FREEZE_AMOUNT: '冻结金额',
  UNFREEZE_AMOUNT: '解冻金额',
  TRANSFER_AMOUNT: '余额转移',
  OTHER: '其他',
  CASH: '现金',
  RED_PACKET: '红包',
  SELL_FUND_ADD: '投信卖出',
  DIVIDEND: '分红',
  DIVIDEND_CASH: '投信分红',
  DIVIDEND_REINVEST: '红利再投',
  PURCHASE: '申购',
  REDEEM: '赎回',
  BUY_ORDER_DEDUCT: '买入委托扣款',
  BUY_ORDER_DEDUCT_FEE: '买入委托手续费扣款',
  BUY_ORDER_REFUND: '买入委托退款',
  TRADE_FEE_DEDUCT: '交易手续费扣除',
  SELL_ORDER_INCOME: '卖出成交收入',
  SELL_ORDER_REFUND: '卖出委托退款',
  CONTRACT_BUY: '购买合约',
  CONTRACT_BUY_FAIL: '购买合约失败',
  CONTRACT_SETTLE: '结算合约',
  CONTRACT_PROFIT: '合约盈利',
  SELL_ORDER_ADD: '卖出委托增加',
};

export function formatAccountType(value?: string) {
  if (!value) {
    return '-';
  }
  return accountTypeLabelMap[value] ?? value;
}

export function formatFlowType(value?: string) {
  if (!value) {
    return '-';
  }
  return flowTypeLabelMap[value] ?? value;
}

export function formatFlowAmount(value?: number) {
  if (value === null || value === undefined) {
    return '0.00';
  }
  return Number(value).toFixed(2);
}
