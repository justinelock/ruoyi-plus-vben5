/** 持仓订单列表：筛选 schema、主表列与收益抽屉列（对齐 Java FbFundPositionVO / FbFundOrderDTO） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Tag } from 'antdv-next';

import { renderCopyableValue } from '#/utils/render-copyable';

const statusOptions = [
  { label: '进行中', value: '1' },
  { label: '结束', value: '0' },
];

const statusTagMap: Record<number, { color: string; label: string }> = {
  1: { color: 'processing', label: '进行中' },
  0: { color: 'default', label: '结束' },
};

const stateLabelMap: Record<string, string> = {
  PENDING: '待计息',
  ACTIVE: '活跃',
  ONGOING: '进行中',
  HOLDING: '持有',
  COMPLETED: '已完成',
  FINISHED: '已结束',
  REDEEMED: '已赎回',
  NONE: '未投入',
};

function formatAmount(value?: number | null) {
  if (value === undefined || value === null) {
    return '-';
  }
  return Number(value).toFixed(2);
}

/** 小数收益率转百分比展示（0.5 → 50%） */
function formatRatePercent(value?: number | null) {
  if (value === undefined || value === null) {
    return '-';
  }
  return `${(Number(value) * 100).toFixed(2)}%`;
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
    component: 'Input',
    fieldName: 'fundCode',
    componentProps: {
      placeholder: '投信代码',
      class: 'w-[120px]',
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
    field: 'fundCode',
    title: '投信代码',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'fundName',
    title: '投信名称',
    minWidth: 120,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'amount',
    title: '当前持仓金额',
    minWidth: 120,
    formatter({ cellValue }) {
      return formatAmount(cellValue);
    },
  },
  {
    field: 'buyDate',
    title: '买入日期',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'dateRange',
    title: '起止日期',
    minWidth: 200,
    slots: {
      default: ({ row }) => `${row.startDate || '-'} ~ ${row.endDate || '-'}`,
    },
  },
  {
    field: 'period',
    title: '周期(天)',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue ?? '-';
    },
  },
  {
    field: 'rate',
    title: '收益率',
    minWidth: 100,
    formatter({ cellValue }) {
      return formatRatePercent(cellValue);
    },
  },
  {
    field: 'profit',
    title: '每日收益',
    minWidth: 100,
    formatter({ cellValue }) {
      return formatAmount(cellValue);
    },
  },
  {
    field: 'status',
    title: '状态',
    minWidth: 90,
    slots: {
      default: ({ row }) => {
        const item = statusTagMap[Number(row.status)] ?? {
          color: 'default',
          label: String(row.status ?? '-'),
        };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
  },
  {
    field: 'state',
    title: '持仓状态',
    minWidth: 100,
    formatter({ cellValue }) {
      if (!cellValue) {
        return '-';
      }
      return stateLabelMap[String(cellValue)] ?? String(cellValue);
    },
  },
  {
    field: 'lastProfitDate',
    title: '最后收益日',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'createTime',
    title: '创建时间',
    minWidth: 160,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'updateTime',
    title: '更新时间',
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
    resizable: false,
    width: 'auto',
  },
];

/** 收益订单抽屉列（4.1.1，fb_fund_profit_log） */
export const orderColumns: VxeGridProps['columns'] = [
  {
    field: 'profitDate',
    title: '收益日期',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'profit',
    title: '收益金额',
    minWidth: 100,
    formatter({ cellValue }) {
      return formatAmount(cellValue);
    },
  },
  {
    field: 'cumulativeProfit',
    title: '累计收益',
    minWidth: 100,
    formatter({ cellValue }) {
      return formatAmount(cellValue);
    },
  },
  {
    field: 'fundCode',
    title: '基金代码',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'status',
    title: '状态',
    minWidth: 80,
    formatter({ cellValue }) {
      return Number(cellValue) === 1 ? '有效' : '无效';
    },
  },
  {
    field: 'profitDatetime',
    title: '计提时间',
    minWidth: 160,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'createTime',
    title: '创建时间',
    minWidth: 160,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
];
