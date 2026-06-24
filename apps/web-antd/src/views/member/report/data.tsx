/** 用户报表列表：筛选 schema 与表格列（字段对齐 MemberReportItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

const levelOptions = [
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
  { field: 'userName', title: '用户名', minWidth: 120 },
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
    field: 'balance',
    title: '账户余额',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
  {
    field: 'totalRecharge',
    title: '总充值',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
  {
    field: 'totalWithdraw',
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
    field: 'parentInfo',
    title: '上级信息',
    minWidth: 120,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'teamCount',
    title: '团队人数',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue ?? '0';
    },
  },
  { field: 'createTime', title: '创建时间', minWidth: 160 },
  {
    field: 'lastLoginTime',
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
