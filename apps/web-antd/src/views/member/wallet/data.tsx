/** 用户钱包列表：筛选 schema 与表格列（字段对齐 MemberWalletItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Tag } from 'antdv-next';

import { renderCopyableValue } from '#/utils/render-copyable';

const accountTypeOptions = [
  { label: '主账户', value: 'main' },
  { label: '子账户', value: 'sub' },
];

const currencyOptions = [
  { label: 'USD', value: 'USD' },
  { label: 'CNY', value: 'CNY' },
];

const frozenOptions = [
  { label: '已冻结', value: '1' },
  { label: '正常', value: '0' },
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
      class: 'w-[100px]',
      options: currencyOptions,
      placeholder: '币种',
    },
    fieldName: 'currency',
    formItemClass: 'pb-0',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      allowClear: true,
      class: 'w-[120px]',
      options: frozenOptions,
      placeholder: '是否冻结',
    },
    fieldName: 'frozenStatus',
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
  { field: 'mobile', title: '手机号', minWidth: 120 },
  {
    field: 'realName',
    title: '真实姓名',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  { field: 'accountType', title: '账户类型', minWidth: 100 },
  {
    field: 'balance',
    title: '余额',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
  {
    field: 'frozenAmount',
    title: '冻结金额',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
  {
    field: 'frozen',
    title: '是否冻结',
    minWidth: 90,
    slots: {
      default: ({ row }) => (
        <Tag color={row.frozen ? 'error' : 'success'}>
          {row.frozen ? '是' : '否'}
        </Tag>
      ),
    },
  },
  { field: 'version', title: '版本号', minWidth: 80 },
  { field: 'currency', title: '币种', minWidth: 80 },
  {
    field: 'drawTicket',
    title: '抽奖券数量',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue ?? 0;
    },
  },
  { field: 'createdAt', title: '创建时间', minWidth: 160 },
  { field: 'updatedAt', title: '更新时间', minWidth: 160 },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    resizable: false,
    width: 'auto',
  },
];
