/** 提现管理列表：筛选 schema 与表格列（对齐 Java selectPageWithUser） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Tag } from 'antdv-next';

import { renderCopyableValue } from '#/utils/render-copyable';

const statusOptions = [
  { label: '待审核', value: 'PENDING' },
  { label: '已通过', value: 'SUCCESS' },
  { label: '已拒绝', value: 'REJECTED' },
];

const withdrawTypeOptions = [
  { label: 'USDT', value: 'USDT' },
  { label: 'CNY', value: 'CNY' },
];

export const statusTagMap: Record<string, { color: string; label: string }> = {
  PENDING: { color: 'processing', label: '待审核' },
  SUCCESS: { color: 'success', label: '已通过' },
  REJECTED: { color: 'error', label: '已拒绝' },
};

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'keyword',
    componentProps: {
      placeholder: '用户名/手机号/订单号',
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
      options: statusOptions,
      placeholder: '状态',
    },
    fieldName: 'status',
    formItemClass: 'pb-0',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      allowClear: true,
      class: 'w-[120px]',
      options: withdrawTypeOptions,
      placeholder: '提现类型',
    },
    fieldName: 'type',
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
  {
    field: 'orderNo',
    title: '订单号',
    minWidth: 200,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'amount',
    title: '提现金额',
    minWidth: 110,
    formatter({ cellValue }) {
      const num = Number(cellValue ?? 0);
      return num.toFixed(2);
    },
  },
  {
    field: 'withdrawType',
    title: '提现类型',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'bankName',
    title: '银行/链',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'bankCardNo',
    title: '卡号/地址',
    minWidth: 180,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'status',
    title: '状态',
    minWidth: 100,
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
    field: 'rejectReason',
    title: '拒绝原因',
    minWidth: 140,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
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
