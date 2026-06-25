/** 账户流水列表：筛选 schema 与表格列（字段对齐 FundStatementItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Tag } from 'antdv-next';

import { renderCopyableValue } from '#/utils/render-copyable';

const accountTypeOptions = [
  { label: '主账户', value: 'main' },
  { label: '子账户', value: 'sub' },
];

const tradeTypeOptions = [
  { label: '充值', value: 'recharge' },
  { label: '提现', value: 'withdraw' },
  { label: '转账', value: 'transfer' },
  { label: '手续费', value: 'fee' },
];

const tradeStatusOptions = [
  { label: '成功', value: '0' },
  { label: '失败', value: '1' },
  { label: '处理中', value: '2' },
];

const currencyOptions = [
  { label: 'USD', value: 'USD' },
  { label: 'USDT', value: 'USDT' },
  { label: 'CNY', value: 'CNY' },
];

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
      options: tradeTypeOptions,
      placeholder: '交易类型',
    },
    fieldName: 'tradeType',
    formItemClass: 'pb-0',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      allowClear: true,
      class: 'w-[120px]',
      options: tradeStatusOptions,
      placeholder: '交易状态',
    },
    fieldName: 'tradeStatus',
    formItemClass: 'pb-0',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      allowClear: true,
      class: 'w-[100px]',
      options: currencyOptions,
      placeholder: '币种',
    },
    fieldName: 'currency',
    formItemClass: 'pb-0',
  },
  {
    component: 'RangePicker',
    fieldName: 'tradeTime',
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
    field: 'phoneNumber',
    title: '手机号',
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
  { field: 'accountType', title: '账户类型', minWidth: 100 },
  { field: 'tradeType', title: '交易类型', minWidth: 100 },
  {
    field: 'changeAmount',
    title: '变动金额',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
  {
    field: 'balanceBefore',
    title: '交易前余额',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
  {
    field: 'balanceAfter',
    title: '交易后余额',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
  {
    field: 'tradeStatus',
    title: '交易状态',
    minWidth: 100,
    slots: {
      default: ({ row }) => {
        const map: Record<string, { color: string; label: string }> = {
          '0': { color: 'success', label: '成功' },
          '1': { color: 'error', label: '失败' },
          '2': { color: 'processing', label: '处理中' },
        };
        const item = map[row.tradeStatus] ?? {
          color: 'default',
          label: row.tradeStatus || '-',
        };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
  },
  { field: 'currency', title: '币种', minWidth: 80 },
  {
    field: 'tradeDesc',
    title: '交易描述',
    minWidth: 140,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'remark',
    title: '备注',
    minWidth: 120,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  { field: 'tradeTime', title: '交易时间', minWidth: 160 },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    resizable: false,
    width: 'auto',
  },
];
