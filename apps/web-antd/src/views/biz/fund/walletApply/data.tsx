/** 钱包申请列表：筛选 schema 与表格列（字段对齐 FundWalletApplyItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Tag } from 'antdv-next';

const accountTypeOptions = [
  { label: '主账户', value: 'main' },
  { label: '子账户', value: 'sub' },
];

const statusOptions = [
  { label: '待审核', value: '0' },
  { label: '已通过', value: '1' },
  { label: '已拒绝', value: '2' },
];

const statusTagMap: Record<string, { color: string; label: string }> = {
  '0': { color: 'processing', label: '待审核' },
  '1': { color: 'success', label: '已通过' },
  '2': { color: 'error', label: '已拒绝' },
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
      options: accountTypeOptions,
      placeholder: '账户类型',
    },
    fieldName: 'accountType',
    formItemClass: 'pb-0',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      allowClear: true,
      class: 'w-[120px]',
      options: statusOptions,
      placeholder: '状态',
    },
    fieldName: 'status',
    formItemClass: 'pb-0',
  },
  {
    component: 'RangePicker',
    fieldName: 'applyTime',
    componentProps: {
      class: 'w-[280px]',
      placeholder: ['开始日期', '结束日期'],
    },
    formItemClass: 'pb-0',
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  { field: 'userName', title: '用户名', minWidth: 120 },
  {
    field: 'realName',
    title: '真实姓名',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
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
  { field: 'accountType', title: '账户类型', minWidth: 100 },
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
    field: 'riskScore',
    title: '风险评估分',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue ?? '-';
    },
  },
  {
    field: 'auditOpinion',
    title: '审核意见',
    minWidth: 140,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  { field: 'applyTime', title: '申请时间', minWidth: 160 },
  {
    field: 'auditTime',
    title: '审核时间',
    minWidth: 160,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'auditor',
    title: '审核人',
    minWidth: 100,
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
