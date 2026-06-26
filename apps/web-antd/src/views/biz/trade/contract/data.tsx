import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
/** 合约订单列表：筛选 schema 与表格列（对齐 Java getPageData / FbContractOrdersVO） */
import type { TradeContractSettlementLog } from '#/api/biz/trade/contract/model';

import { getPopupContainer } from '@vben/utils';

import { Tag } from 'antdv-next';

import { renderCopyableValue } from '#/utils/render-copyable';

const statusOptions = [
  { label: '持仓中', value: '1' },
  { label: '已取消', value: '2' },
  { label: '已结算', value: '3' },
];

const controlResultOptions = [
  { label: '赢', value: '1' },
  { label: '输', value: '2' },
  { label: '自然', value: '3' },
];

export const statusTagMap: Record<number, { color: string; label: string }> = {
  1: { color: 'processing', label: '持仓中' },
  2: { color: 'default', label: '已取消' },
  3: { color: 'success', label: '已结算' },
};

const directionLabel: Record<number, string> = {
  1: '买入做多',
  2: '卖出做空',
};

/** 方向列颜色：买入红、卖出绿（红涨绿跌） */
function directionTextClass(direction?: null | number | string) {
  const value = Number(direction);
  if (value === 1) {
    return 'text-[#ff4d4f]';
  }
  if (value === 2) {
    return 'text-[#52c41a]';
  }
  return '';
}

const controlTypeLabel: Record<number, string> = {
  1: '必赢',
  2: '必输',
  3: '自然',
};

/** 订单控单列文案：0/空为未控单，3 为自然（对齐 Java ControlType） */
function formatControlType(value?: null | number) {
  if (value === undefined || value === null || value === 0) {
    return '未控单';
  }
  return controlTypeLabel[value] ?? String(value);
}

const controlResultLabel: Record<number, string> = {
  1: '赢',
  2: '输',
};

function formatAmount(value?: null | number) {
  if (value === undefined || value === null) {
    return '-';
  }
  return Number(value).toFixed(2);
}

function formatPrice(value?: null | number) {
  if (value === undefined || value === null) {
    return '-';
  }
  return Number(value)
    .toFixed(8)
    .replace(/\.?0+$/, '');
}

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'keyword',
    componentProps: {
      placeholder: '用户名/手机号/姓名',
      class: 'w-[200px]',
    },
    formItemClass: 'pb-0',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      allowClear: true,
      class: 'w-[110px]',
      options: statusOptions,
      placeholder: '状态',
    },
    fieldName: 'status',
    formItemClass: 'pb-0',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      allowClear: true,
      class: 'w-[100px]',
      options: controlResultOptions,
      placeholder: '控单结果',
    },
    fieldName: 'controlResult',
    formItemClass: 'pb-0',
  },
  {
    component: 'RangePicker',
    fieldName: 'createTime',
    componentProps: {
      class: 'w-[280px]',
      placeholder: ['创建开始', '创建结束'],
    },
    formItemClass: 'pb-0',
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    field: 'username',
    title: '用户名',
    minWidth: 140,
    slots: {
      default: ({ row }) => renderCopyableValue(row.username),
    },
  },
  {
    field: 'realName',
    title: '真实姓名',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'balance',
    title: '余额U(结算后)',
    minWidth: 130,
    formatter({ cellValue }) {
      return formatAmount(cellValue);
    },
  },
  {
    field: 'productName',
    title: '交易对',
    minWidth: 120,
    formatter({ row }) {
      return row.productName || row.pairName || row.tradePair || '-';
    },
  },
  {
    field: 'direction',
    title: '方向',
    minWidth: 100,
    slots: {
      default: ({ row }) => {
        const text = directionLabel[Number(row.direction)] ?? '-';
        if (text === '-') {
          return text;
        }
        return <span class={directionTextClass(row.direction)}>{text}</span>;
      },
    },
  },
  {
    field: 'amount',
    title: '交易金额',
    minWidth: 110,
    formatter({ cellValue }) {
      return formatAmount(cellValue);
    },
  },
  {
    field: 'actualProfit',
    title: '实际收益',
    minWidth: 100,
    slots: {
      default: ({ row }) => {
        const value = row.actualProfit;
        if (value === undefined || value === null) {
          return '-';
        }
        const amount = Number(value);
        const text = formatAmount(amount);
        // 正收益绿、负收益红、零为默认色（对齐资金流水变动金额列）
        let color = '';
        if (amount > 0) {
          color = 'text-[#52c41a]';
        } else if (amount < 0) {
          color = 'text-[#ff4d4f]';
        }
        return <span class={color}>{text}</span>;
      },
    },
  },
  {
    field: 'status',
    title: '状态',
    minWidth: 90,
    slots: {
      default: ({ row }) => {
        const item = statusTagMap[row.status] ?? {
          color: 'default',
          label: String(row.status ?? '-'),
        };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
  },
  {
    field: 'seconds',
    title: '时长(秒)',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue ?? '-';
    },
  },
  {
    field: 'openClosePrice',
    title: '开仓/平仓价格',
    minWidth: 160,
    slots: {
      default: ({ row }) =>
        `${formatPrice(row.openingPrice)} / ${formatPrice(row.closingPrice)}`,
    },
  },
  {
    field: 'controlType',
    title: '订单控单',
    minWidth: 90,
    formatter({ cellValue }) {
      return formatControlType(cellValue as null | number | undefined);
    },
  },
  {
    field: 'controlResult',
    title: '控单结果',
    minWidth: 90,
    formatter({ cellValue }) {
      if (cellValue === undefined || cellValue === null) {
        return '-';
      }
      return controlResultLabel[cellValue as number] ?? String(cellValue);
    },
  },
  {
    field: 'globalControlStateSnapshot',
    title: '全局控盘',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'openingTime',
    title: '开仓时间',
    minWidth: 160,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'closingTime',
    title: '结算时间',
    minWidth: 160,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    minWidth: 180,
    resizable: false,
    width: 'auto',
  },
];

/** 本页四态批量控单按钮（对齐 Java control/batch-current-page/directional） */
export const batchDirectionalActions = [
  {
    controlState: 'LONG_WIN',
    label: '做多赢',
    title:
      '确认对当前页（与列表筛选一致）进行中且未控单订单应用「做多赢」？做多/做空将分别写入必赢或必输，不修改今日全局配置。',
  },
  {
    controlState: 'SHORT_WIN',
    label: '做空赢',
    title:
      '确认对当前页（与列表筛选一致）进行中且未控单订单应用「做空赢」？做多/做空将分别写入必赢或必输，不修改今日全局配置。',
  },
  {
    controlState: 'LONG_LOSE',
    label: '做多输',
    title:
      '确认对当前页（与列表筛选一致）进行中且未控单订单应用「做多输」？做多/做空将分别写入必赢或必输，不修改今日全局配置。',
  },
  {
    controlState: 'SHORT_LOSE',
    label: '做空输',
    title:
      '确认对当前页（与列表筛选一致）进行中且未控单订单应用「做空输」？做多/做空将分别写入必赢或必输，不修改今日全局配置。',
  },
] as const;

/** 持仓中（status 可能为数字或字符串） */
export function isContractPositionRow(row: { status?: number | string }) {
  return Number(row.status) === 1;
}

/** 未人工控单：仅 control_type 为 NULL 时可赢/输（对齐 Java isNull(controlType)） */
export function canContractWinLose(row: {
  controlType?: null | number;
  status?: number | string;
}) {
  if (!isContractPositionRow(row)) {
    return false;
  }
  const ct = row.controlType;
  // 1/2 为必赢/必输；3 为自然亦不可再控
  return ct === undefined || ct === null || ct === 0;
}

/** 修改交易方向：持仓中即可（对齐 Java updateDirection 无 status 限制，前端仅对进行中展示） */
export function canContractChangeDirection(row: { status?: number | string }) {
  return isContractPositionRow(row);
}

/** 全局控盘状态文案 */
const globalControlStateMap: Record<string, string> = {
  RANDOM: '全自然',
  LONG_WIN: '做多赢',
  LONG_LOSE: '做多输',
  SHORT_WIN: '做空赢',
  SHORT_LOSE: '做空输',
};

export function formatGlobalControlState(value?: string) {
  if (!value) {
    return '全自然';
  }
  return globalControlStateMap[value] ?? value;
}

/** 是否展示结算日志按钮（已结算或主表有 remark，对齐 Java v-if="scope.row.remark"） */
export function canContractShowSettlementLog(row: {
  remark?: string;
  status?: number | string;
}) {
  if (row.remark?.trim()) {
    return true;
  }
  return Number(row.status) === 3;
}

/** 解析结算日志 detail 字段（后端为 JSON 字符串） */
export function parseContractSettlementLog(
  detail: Record<string, unknown> | string,
): TradeContractSettlementLog {
  if (typeof detail === 'string') {
    return JSON.parse(detail) as TradeContractSettlementLog;
  }
  return detail as TradeContractSettlementLog;
}
