/** 充值管理列表：筛选 schema 与表格列（字段对齐 FundRechargeItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Image, Tag } from 'antdv-next';

import { renderCopyableValue } from '#/utils/render-copyable';

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
      options: statusOptions,
      placeholder: '状态',
    },
    fieldName: 'status',
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
    field: 'userName',
    title: '用户名',
    minWidth: 140,
    slots: {
      default: ({ row }) => renderCopyableValue(row.userName),
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
  {
    field: 'realName',
    title: '真实姓名',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'rechargeAmount',
    title: '充值金额',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue ?? '0.00';
    },
  },
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
    field: 'rechargeImage',
    title: '充值截图',
    minWidth: 100,
    slots: {
      default: ({ row }) =>
        row.rechargeImage ? (
          <Image
            class="rounded object-cover"
            height={32}
            src={row.rechargeImage}
            width={48}
          />
        ) : (
          '-'
        ),
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
  { field: 'createTime', title: '创建时间', minWidth: 160 },
  { field: 'updateTime', title: '更新时间', minWidth: 160 },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    resizable: false,
    width: 'auto',
  },
];
