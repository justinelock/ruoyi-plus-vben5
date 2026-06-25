import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';
import { getPopupContainer } from '@vben/utils';

import { Tag } from 'antdv-next';

import { renderDict } from '#/utils/render';

/** 认证状态筛选项（业务字典未接入前使用固定选项） */
const authStatusOptions = [
  { label: '未认证', value: '0' },
  { label: '已认证', value: '1' },
  { label: '认证中', value: '2' },
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
      class: 'w-[140px]',
      options: authStatusOptions,
      placeholder: '认证状态',
    },
    fieldName: 'authStatus',
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
    field: 'username',
    title: '用户名',
    minWidth: 120,
  },
  {
    field: 'totalBalance',
    title: '账户总余额',
    minWidth: 120,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
  {
    field: 'fundPositionAmount',
    title: '投信持仓/分红',
    minWidth: 140,
    slots: {
      default: ({ row }) => {
        const position = row.fundPositionAmount ?? 0;
        const dividend = row.fundPositionDividend ?? 0;
        return `${position}/${dividend}`;
      },
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
    field: 'onlineStatus',
    title: '在线状态',
    minWidth: 100,
    slots: {
      default: ({ row }) => {
        const online = row.onlineStatus === 1;
        return (
          <Tag color={online ? 'success' : 'default'}>
            {online ? '在线' : '离线'}
          </Tag>
        );
      },
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
  {
    field: 'inviteCode',
    title: '邀请码',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'createdAt',
    title: '创建时间',
    minWidth: 160,
  },
  {
    field: 'lastLogin',
    title: '最后登录时间',
    minWidth: 160,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'id',
    title: 'ID',
    minWidth: 180,
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

export { authStatusOptions };
