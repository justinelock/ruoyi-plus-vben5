/** 团队管理列表：筛选 schema 与表格列（字段对齐 MemberTeamItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';
import { getPopupContainer } from '@vben/utils';

import { getDictOptions } from '#/utils/dict';
import { renderCopyableValue } from '#/utils/render-copyable';
import { renderDict } from '#/utils/render';

/** 金额展示：对齐详情弹窗 $ 0.00 */
export function formatTeamMoney(value?: number | null) {
  const num = Number(value ?? 0);
  return `$ ${num.toFixed(2)}`;
}

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
  {
    field: 'username',
    title: '用户名',
    minWidth: 140,
    slots: {
      default: ({ row }) => renderCopyableValue(row.username),
    },
  },
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
    field: 'agent',
    title: '上级代理',
    minWidth: 110,
    formatter({ cellValue }) {
      if (!cellValue) {
        return '-';
      }
      return cellValue.username || '-';
    },
  },
  { field: 'level1Members', title: '一级成员', minWidth: 90 },
  { field: 'level2Members', title: '二级成员', minWidth: 90 },
  { field: 'level3Members', title: '三级成员', minWidth: 90 },
  { field: 'level4Members', title: '四级成员', minWidth: 90 },
  { field: 'level5Members', title: '五级成员', minWidth: 90 },
  { field: 'agentLevel', title: '代理层级', minWidth: 90 },
  {
    field: 'teamSize',
    title: '团队规模',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue ?? 0;
    },
  },
  {
    field: 'totalTeamBalance',
    title: '团队总余额',
    minWidth: 110,
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
  { field: 'createdAt', title: '注册时间', minWidth: 160 },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    resizable: false,
    width: 'auto',
  },
];

/** 下级团队抽屉列 */
export const teamMemberColumns: VxeGridProps['columns'] = [
  {
    field: 'level',
    title: '级别',
    minWidth: 80,
    formatter({ cellValue }) {
      return cellValue ?? '-';
    },
  },
  {
    field: 'username',
    title: '用户名',
    minWidth: 140,
    slots: {
      default: ({ row }) => renderCopyableValue(row.username),
    },
  },
  {
    field: 'totalAssets',
    title: '总资产',
    minWidth: 120,
    formatter({ cellValue }) {
      return formatTeamMoney(cellValue);
    },
  },
  {
    field: 'totalDeposit',
    title: '总充值',
    minWidth: 120,
    formatter({ cellValue }) {
      return formatTeamMoney(cellValue);
    },
  },
  {
    field: 'totalInvest',
    title: '总投信',
    minWidth: 120,
    formatter({ cellValue }) {
      return formatTeamMoney(cellValue);
    },
  },
  {
    field: 'totalWithdraw',
    title: '总提现',
    minWidth: 120,
    formatter({ cellValue }) {
      return formatTeamMoney(cellValue);
    },
  },
];
