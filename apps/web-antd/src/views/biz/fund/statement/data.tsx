/** 账户流水列表：筛选 schema 与表格列（对齐 1.5.1 用户报表流水） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Tag } from 'antdv-next';

import { renderCopyableValue } from '#/utils/render-copyable';
import {
  formatAccountType,
  formatFlowAmount,
  formatFlowType,
} from '#/views/member/report/flow-labels';

const statusOptions = [
  { label: 'SUCCESS', value: 'SUCCESS' },
  { label: 'FAILED', value: 'FAILED' },
  { label: 'PENDING', value: 'PENDING' },
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
      placeholder: '用户名/手机号/业务单号',
      class: 'w-[220px]',
    },
    formItemClass: 'pb-0',
  },
  {
    component: 'Input',
    fieldName: 'type',
    componentProps: {
      placeholder: '交易类型',
      class: 'w-[140px]',
    },
    formItemClass: 'pb-0',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      allowClear: true,
      class: 'w-[120px]',
      options: statusOptions,
      placeholder: '交易状态',
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
    field: 'username',
    title: '用户名',
    minWidth: 140,
    slots: {
      default: ({ row }) => renderCopyableValue(row.username),
    },
  },
  {
    field: 'mobile',
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
  { field: 'createdAt', title: '交易时间', minWidth: 160 },
  {
    field: 'accountType',
    title: '账户类型',
    minWidth: 100,
    formatter({ cellValue }) {
      return formatAccountType(cellValue);
    },
  },
  {
    field: 'flowType',
    title: '交易类型',
    minWidth: 120,
    formatter({ cellValue }) {
      return formatFlowType(cellValue);
    },
  },
  {
    field: 'flowAmount',
    title: '变动金额',
    minWidth: 110,
    slots: {
      default: ({ row }) => {
        const amount = Number(row.flowAmount ?? 0);
        const text = formatFlowAmount(amount);
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
    field: 'beforeAmount',
    title: '交易前余额',
    minWidth: 110,
    formatter({ cellValue }) {
      return formatFlowAmount(cellValue);
    },
  },
  {
    field: 'afterAmount',
    title: '交易后余额',
    minWidth: 110,
    formatter({ cellValue }) {
      return formatFlowAmount(cellValue);
    },
  },
  {
    field: 'status',
    title: '交易状态',
    minWidth: 100,
    slots: {
      default: ({ row }) => (
        <Tag color={row.status === 'SUCCESS' ? 'success' : 'default'}>
          {row.status || '-'}
        </Tag>
      ),
    },
  },
  { field: 'currency', title: '币种', minWidth: 80 },
  {
    field: 'description',
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
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    resizable: false,
    width: 'auto',
  },
];
