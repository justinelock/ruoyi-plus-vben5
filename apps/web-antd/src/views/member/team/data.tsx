/** 团队管理列表：筛选 schema 与表格列（字段对齐 MemberTeamItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';
import { getPopupContainer } from '@vben/utils';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

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
      options: getDictOptions(DictEnum.SYS_NORMAL_DISABLE),
      placeholder: '用户状态',
    },
    fieldName: 'status',
    formItemClass: 'pb-0',
  },
  {
    component: 'RangePicker',
    fieldName: 'registerTime',
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
    field: 'balance',
    title: '余额',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
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
    field: 'parentAgent',
    title: '上级代理',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  { field: 'agentLevel1', title: '一级代理', minWidth: 100 },
  { field: 'agentLevel2', title: '二级代理', minWidth: 100 },
  { field: 'agentLevel3', title: '三级代理', minWidth: 100 },
  { field: 'agentLevel4', title: '四级代理', minWidth: 100 },
  { field: 'agentLevel5', title: '五级代理', minWidth: 100 },
  { field: 'agentTier', title: '代理层级', minWidth: 90 },
  {
    field: 'subTeamCount',
    title: '下级团队总数',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue ?? '0';
    },
  },
  {
    field: 'subTeamBalance',
    title: '下级团队总余额',
    minWidth: 130,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
  {
    field: 'status',
    title: '用户状态',
    minWidth: 100,
    slots: {
      default: ({ row }) => renderDict(row.status, DictEnum.SYS_NORMAL_DISABLE),
    },
  },
  { field: 'registerTime', title: '注册时间', minWidth: 160 },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    resizable: false,
    width: 'auto',
  },
];
