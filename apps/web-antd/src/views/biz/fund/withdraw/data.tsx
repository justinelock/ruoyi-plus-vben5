/** 提现管理列表：筛选 schema 与表格列（字段对齐 FundWithdrawItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Tag } from 'antdv-next';

import { renderCopyableValue } from '#/utils/render-copyable';

const withdrawStatusOptions = [
  { label: '待审核', value: '0' },
  { label: '处理中', value: '1' },
  { label: '已完成', value: '2' },
  { label: '已拒绝', value: '3' },
];

const withdrawTypeOptions = [
  { label: 'USDT', value: 'usdt' },
  { label: '银行卡', value: 'bank' },
];

const statusTagMap: Record<string, { color: string; label: string }> = {
  '0': { color: 'processing', label: '待审核' },
  '1': { color: 'warning', label: '处理中' },
  '2': { color: 'success', label: '已完成' },
  '3': { color: 'error', label: '已拒绝' },
};

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'keyword',
    componentProps: {
      placeholder: '用户名/手机号/用户ID',
      class: 'w-[220px]',
    },
    formItemClass: 'pb-0',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      allowClear: true,
      class: 'w-[120px]',
      options: withdrawStatusOptions,
      placeholder: '提现状态',
    },
    fieldName: 'withdrawStatus',
    formItemClass: 'pb-0',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      allowClear: true,
      class: 'w-[120px]',
      options: withdrawTypeOptions,
      placeholder: '提现类型',
    },
    fieldName: 'withdrawType',
    formItemClass: 'pb-0',
  },
  {
    component: 'RangePicker',
    fieldName: 'createTime',
    componentProps: {
      class: 'w-[280px]',
      placeholder: ['开始日期', '结束日期'],
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
    field: 'withdrawAmount',
    title: '提现金额',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
  {
    field: 'usdtAddress',
    title: 'USDT地址',
    minWidth: 180,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'withdrawStatus',
    title: '提现状态',
    minWidth: 100,
    slots: {
      default: ({ row }) => {
        const item = statusTagMap[row.withdrawStatus] ?? {
          color: 'default',
          label: row.withdrawStatus || '-',
        };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
  },
  { field: 'withdrawType', title: '提现类型', minWidth: 100 },
  { field: 'createTime', title: '创建时间', minWidth: 160 },
  { field: 'updateTime', title: '更新时间', minWidth: 160 },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    resizable: false,
    width: 'auto',
  },
];
