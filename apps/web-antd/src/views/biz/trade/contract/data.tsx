/** 合约订单列表：筛选 schema 与表格列（字段对齐 TradeContractItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Tag } from 'antdv-next';

const statusOptions = [
  { label: '进行中', value: '0' },
  { label: '已结算', value: '1' },
  { label: '已取消', value: '2' },
];

const statusTagMap: Record<string, { color: string; label: string }> = {
  '0': { color: 'processing', label: '进行中' },
  '1': { color: 'success', label: '已结算' },
  '2': { color: 'default', label: '已取消' },
};

const directionOptions = [
  { label: '买涨', value: 'up' },
  { label: '买跌', value: 'down' },
];

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'keyword',
    componentProps: {
      placeholder: '用户名/真实姓名',
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
    component: 'Input',
    fieldName: 'symbol',
    componentProps: {
      placeholder: '交易对',
      class: 'w-[120px]',
    },
    formItemClass: 'pb-0',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      allowClear: true,
      class: 'w-[100px]',
      options: directionOptions,
      placeholder: '方向',
    },
    fieldName: 'direction',
    formItemClass: 'pb-0',
  },
  {
    component: 'RangePicker',
    fieldName: 'openTime',
    componentProps: {
      class: 'w-[280px]',
      placeholder: ['开仓开始', '开仓结束'],
    },
    formItemClass: 'pb-0',
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    field: 'userName',
    title: '用户名',
    minWidth: 120,
    formatter({ cellValue }) {
      return cellValue || '-';
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
    field: 'balanceU',
    title: '余额U(结算后)',
    minWidth: 130,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'symbol',
    title: '交易对',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'direction',
    title: '方向',
    minWidth: 80,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'tradeAmount',
    title: '交易金额',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'actualProfit',
    title: '实际收益',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
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
          label: row.status || '-',
        };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
  },
  {
    field: 'durationSec',
    title: '时长(秒)',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'openClosePrice',
    title: '开仓/平仓价格',
    minWidth: 150,
    slots: {
      default: ({ row }) =>
        `${row.openPrice || '-'} / ${row.closePrice || '-'}`,
    },
  },
  {
    field: 'orderControl',
    title: '订单控单',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'controlResult',
    title: '控单结果',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'globalControl',
    title: '全局控盘',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'openTime',
    title: '开仓时间',
    minWidth: 160,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'settleTime',
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
    resizable: false,
    width: 'auto',
  },
];
