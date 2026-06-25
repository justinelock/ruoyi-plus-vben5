/** 持仓订单列表：筛选 schema 与表格列（字段对齐 InvestPositionItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Tag } from 'antdv-next';

import { renderCopyableValue } from '#/utils/render-copyable';

const positionStatusOptions = [
  { label: '持仓中', value: '0' },
  { label: '已到期', value: '1' },
  { label: '已赎回', value: '2' },
];

const positionStatusTagMap: Record<string, { color: string; label: string }> = {
  '0': { color: 'processing', label: '持仓中' },
  '1': { color: 'warning', label: '已到期' },
  '2': { color: 'success', label: '已赎回' },
};

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
    component: 'Input',
    fieldName: 'investCode',
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
      options: positionStatusOptions,
      placeholder: '持仓状态',
    },
    fieldName: 'positionStatus',
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
    field: 'userName',
    title: '用户名',
    minWidth: 140,
    slots: {
      default: ({ row }) => renderCopyableValue(row.userName),
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
    field: 'investCode',
    title: '投信代码',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'positionAmount',
    title: '当前持仓金额',
    minWidth: 120,
    formatter({ cellValue }) {
      return cellValue || '-';
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
      default: ({ row }) =>
        `${row.startDate || '-'} ~ ${row.endDate || '-'}`,
    },
  },
  {
    field: 'periodDays',
    title: '周期(天)',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'fixedYieldRate',
    title: '固定收益率',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'positionStatus',
    title: '持仓状态',
    minWidth: 100,
    slots: {
      default: ({ row }) => {
        const item = positionStatusTagMap[row.positionStatus] ?? {
          color: 'default',
          label: row.positionStatus || '-',
        };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
  },
  {
    field: 'endStatus',
    title: '结束状态',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue || '-';
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
