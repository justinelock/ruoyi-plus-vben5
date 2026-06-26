import type {
  InvestPosition,
  InvestPositionOrder,
  InvestPositionOrderQuery,
  InvestPositionProfitBeforeReq,
  InvestPositionProfitBeforeResp,
  InvestPositionQuery,
  InvestPositionUpdateProfitReq,
} from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/** 持仓订单分页列表（对接 fb_fund_position） */
export function investPositionList(params?: InvestPositionQuery) {
  return alovaInstance.get<PageResult<InvestPosition>>(
    '/invest/position/list',
    { params },
  );
}

/** 收益记录分页（按 userId + positionId 查 fb_fund_profit_log） */
export function investPositionOrderList(params: InvestPositionOrderQuery) {
  return alovaInstance.get<PageResult<InvestPositionOrder>>(
    '/invest/position/order/list',
    { params },
  );
}

/** 查询修改前收益；无流水时 profit 为 null */
export function investPositionProfitBefore(data: InvestPositionProfitBeforeReq) {
  return alovaInstance.post<InvestPositionProfitBeforeResp>(
    '/invest/position/profit/before',
    data,
  );
}

/** 修改持仓某日收益 */
export function investPositionUpdateProfit(data: InvestPositionUpdateProfitReq) {
  return alovaInstance.putWithMsg<void>('/invest/position/profit', data);
}
