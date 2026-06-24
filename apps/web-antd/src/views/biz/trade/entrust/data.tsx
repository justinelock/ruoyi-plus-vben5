/** 委托订单列表：筛选 schema 与表格列（字段对齐 TradeEntrustItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Tag } from 'antdv-next';

const orderStatusOptions = [
  { label: '待成交', value: '0' },
  { label: '部分成交', value: '1' },
  { label: '已成交', value: '2' },
  { label: '已撤销', value: '3' },
];

const orderStatusTagMap: Record<string, { color: string; label: string }> = {
  '0': { color: 'processing', label: '待成交' },
  '1': { color: 'warning', label: '部分成交' },
  '2': { color: 'success', label: '已成交' },
  '3': { color: 'default', label: '已撤销' },
};

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'keyword',
    componentProps: {
      placeholder: '订单编号/用户名',
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
      options: orderStatusOptions,
      placeholder: '订单状态',
    },
    fieldName: 'orderStatus',
    formItemClass: 'pb-0',
  },
  {
    component: 'Input',
    fieldName: 'marketCode',
    componentProps: {
      placeholder: '市场代码',
      class: 'w-[120px]',
    },
    formItemClass: 'pb-0',
  },
  {
    component: 'RangePicker',
    fieldName: 'entrustTime',
    componentProps: {
      class: 'w-[280px]',
      placeholder: ['委托开始', '委托结束'],
    },
    formItemClass: 'pb-0',
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    field: 'orderNo',
    title: '订单编号',
    minWidth: 150,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'userName',
    title: '用户名',
    minWidth: 120,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'marketCode',
    title: '市场代码',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'stockCode',
    title: '股票代码',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'orderType',
    title: '订单类型',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'entrustPrice',
    title: '委托价格',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'entrustQty',
    title: '委托数量',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'dealQty',
    title: '成交数量',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'orderStatus',
    title: '订单状态',
    minWidth: 100,
    slots: {
      default: ({ row }) => {
        const item = orderStatusTagMap[row.orderStatus] ?? {
          color: 'default',
          label: row.orderStatus || '-',
        };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
  },
  {
    field: 'stopLossPrice',
    title: '止损价格',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'priceType',
    title: '价格类型',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'priceFloatRange',
    title: '价格浮动范围',
    minWidth: 120,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'validity',
    title: '委托有效期',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'fee',
    title: '手续费',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'direction',
    title: '交易方向',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'limitPrice',
    title: '限价',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'entrustTime',
    title: '委托时间',
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
