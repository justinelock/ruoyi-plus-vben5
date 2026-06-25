/** 用户报表列表：筛选 schema 与表格列（字段对齐 MemberReportItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

const levelOptions = [
  { label: 'VIP0', value: '0' },
  { label: 'VIP1', value: '1' },
  { label: 'VIP2', value: '2' },
  { label: 'VIP3', value: '3' },
  { label: 'VIP4', value: '4' },
  { label: 'VIP5', value: '5' },
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
      options: levelOptions,
      placeholder: '等级',
    },
    fieldName: 'level',
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
  { field: 'username', title: '用户名', minWidth: 120 },
  {
    field: 'realName',
    title: '真实姓名',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  { field: 'level', title: '等级', minWidth: 80 },
  {
    field: 'amount',
    title: '账户余额',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
  {
    field: 'rechargeAmount',
    title: '总充值',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
  {
    field: 'withdrawAmount',
    title: '总提现',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
  {
    field: 'rechargeDiff',
    title: '充提差',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
  {
    field: 'totalProfit',
    title: '总体收益',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
  {
    field: 'parentUser',
    title: '上级信息',
    minWidth: 120,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      if (!cellValue) {
        return '-';
      }
      return cellValue.username || '-';
    },
  },
  {
    field: 'teamCount',
    title: '团队人数',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue ?? 0;
    },
  },
  { field: 'registerTime', title: '创建时间', minWidth: 160 },
  {
    field: 'lastLogin',
    title: '最后登录时间',
    minWidth: 160,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'loginIp',
    title: '登录IP',
    minWidth: 130,
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

/** 流水明细表格列 */
export const flowColumns: VxeGridProps['columns'] = [
  { field: 'flowType', title: '流水类型', minWidth: 120 },
  {
    field: 'flowAmount',
    title: '变动金额',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
  {
    field: 'beforeAmount',
    title: '变动前',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
  {
    field: 'afterAmount',
    title: '变动后',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
  { field: 'accountType', title: '账户类型', minWidth: 90 },
  { field: 'currency', title: '币种', minWidth: 80 },
  { field: 'status', title: '状态', minWidth: 90 },
  {
    field: 'remark',
    title: '备注',
    minWidth: 140,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  { field: 'createdAt', title: '时间', minWidth: 160 },
];
