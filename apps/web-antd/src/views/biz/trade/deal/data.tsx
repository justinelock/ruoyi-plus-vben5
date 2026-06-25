/** 成交订单列表：筛选 schema 与表格列（字段对齐 TradeDealItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { renderCopyableValue } from '#/utils/render-copyable';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'keyword',
    componentProps: {
      placeholder: '成交编号/用户名',
      class: 'w-[200px]',
    },
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
    component: 'Select',
    componentProps: {
      getPopupContainer,
      allowClear: true,
      class: 'w-[110px]',
      options: [
        { label: '买入', value: 'buy' },
        { label: '卖出', value: 'sell' },
      ],
      placeholder: '成交类型',
    },
    fieldName: 'dealType',
    formItemClass: 'pb-0',
  },
  {
    component: 'RangePicker',
    fieldName: 'dealTime',
    componentProps: {
      class: 'w-[280px]',
      placeholder: ['成交开始', '成交结束'],
    },
    formItemClass: 'pb-0',
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    field: 'dealNo',
    title: '成交编号',
    minWidth: 150,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'userName',
    title: '用户名',
    minWidth: 140,
    slots: {
      default: ({ row }) => renderCopyableValue(row.userName),
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
    field: 'dealType',
    title: '成交类型',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'dealPrice',
    title: '成交价格',
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
    field: 'dealAmount',
    title: '成交金额',
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
    field: 'dealTime',
    title: '成交时间',
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
