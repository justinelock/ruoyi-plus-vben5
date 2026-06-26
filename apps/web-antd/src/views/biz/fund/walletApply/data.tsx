/** 钱包申请列表：筛选 schema 与表格列（字段对齐 FundWalletApplyItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Tag } from 'antdv-next';

import { renderCopyableValue } from '#/utils/render-copyable';

const accountTypeOptions = [
  { label: '主账户', value: 'main' },
  { label: '投信账户', value: 'fund' },
  { label: '外汇账户', value: 'forex' },
  { label: '期货账户', value: 'future' },
];

const statusOptions = [
  { label: '待审核', value: 'PENDING' },
  { label: '已通过', value: 'APPROVED' },
  { label: '已拒绝', value: 'REJECTED' },
];

const statusTagMap: Record<string, { color: string; label: string }> = {
  PENDING: { color: 'processing', label: '待审核' },
  APPROVED: { color: 'success', label: '已通过' },
  REJECTED: { color: 'error', label: '已拒绝' },
};

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'keyword',
    componentProps: {
      placeholder: '用户名/手机号/姓名',
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
  {
    field: 'username',
    title: '用户名',
    minWidth: 140,
    slots: {
      default: ({ row }) => renderCopyableValue(row.username),
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
    field: 'mobile',
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
    field: 'riskAssessmentScore',
    title: '风险评估分',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue ?? '-';
    },
  },
  {
    field: 'rejectReason',
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
    field: 'auditUser',
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

/** 最近流水抽屉列 */
export const walletApplyFlowColumns: VxeGridProps['columns'] = [
  {
    field: 'flowType',
    title: '交易类型',
    minWidth: 120,
  },
  {
    field: 'flowAmount',
    title: '变动金额',
    minWidth: 110,
    formatter({ cellValue }) {
      const num = Number(cellValue ?? 0);
      return num.toFixed(2);
    },
  },
  {
    field: 'beforeAmount',
    title: '交易前余额',
    minWidth: 110,
    formatter({ cellValue }) {
      const num = Number(cellValue ?? 0);
      return num.toFixed(2);
    },
  },
  {
    field: 'afterAmount',
    title: '交易后余额',
    minWidth: 110,
    formatter({ cellValue }) {
      const num = Number(cellValue ?? 0);
      return num.toFixed(2);
    },
  },
  { field: 'status', title: '交易状态', minWidth: 90 },
  {
    field: 'description',
    title: '交易描述',
    minWidth: 140,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
];

/** 登录记录抽屉列 */
export const walletApplyLoginLogColumns: VxeGridProps['columns'] = [
  { field: 'loginTime', title: '登录时间', minWidth: 160 },
  { field: 'loginIp', title: '登录IP', minWidth: 130 },
  {
    field: 'loginLocation',
    title: '登录地点',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  { field: 'loginType', title: '登录方式', minWidth: 100 },
  { field: 'loginResult', title: '登录结果', minWidth: 90 },
  {
    field: 'failReason',
    title: '失败原因',
    minWidth: 120,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  { field: 'riskLevel', title: '风险等级', minWidth: 90 },
];
