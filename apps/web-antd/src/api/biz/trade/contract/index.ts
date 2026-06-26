import type {
  TradeContract,
  TradeContractBatchDirectionalReq,
  TradeContractQuery,
  TradeContractSettlementDetail,
} from './model';

import type { PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

enum Api {
  batchDirectional = '/trade/contract/control/batch-current-page/directional',
  detail = '/trade/contract/detail',
  direction = '/trade/contract/direction',
  list = '/trade/contract/list',
  lose = '/trade/contract/lose',
  win = '/trade/contract/win',
}

/**
 * 合约订单分页列表
 * @see GET /trade/contract/list
 */
export function tradeContractList(params?: TradeContractQuery) {
  return alovaInstance.get<PageResult<TradeContract>>(Api.list, { params });
}

/**
 * 合约订单控单-赢
 * @see PUT /trade/contract/win/{id}
 */
export function tradeContractWin(id: string) {
  return alovaInstance.putWithMsg<void>(`${Api.win}/${id}`);
}

/**
 * 合约订单控单-输
 * @see PUT /trade/contract/lose/{id}
 */
export function tradeContractLose(id: string) {
  return alovaInstance.putWithMsg<void>(`${Api.lose}/${id}`);
}

/**
 * 修改合约订单交易方向
 * @see PUT /trade/contract/direction/{id}/{direction}
 */
export function tradeContractDirection(id: string, direction: number) {
  return alovaInstance.putWithMsg<void>(`${Api.direction}/${id}/${direction}`);
}

/**
 * 本页四态批量控单
 * @see PUT /trade/contract/control/batch-current-page/directional
 */
export function tradeContractBatchCurrentPageDirectional(
  data: TradeContractBatchDirectionalReq,
) {
  return alovaInstance.putWithMsg<{ affectedCount: number }>(
    Api.batchDirectional,
    data,
  );
}

/**
 * 合约订单结算日志
 * @see GET /trade/contract/detail/{id}
 */
export function tradeContractSettlementDetail(orderId: string) {
  return alovaInstance.get<TradeContractSettlementDetail>(
    `${Api.detail}/${orderId}`,
  );
}
