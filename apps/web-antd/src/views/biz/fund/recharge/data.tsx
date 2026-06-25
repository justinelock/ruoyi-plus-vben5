/** 充值管理列表：筛选 schema 与表格列（对齐 Java selectPageWithUser） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Image, Tag } from 'antdv-next';

import { renderCopyableValue } from '#/utils/render-copyable';

const statusOptions = [
  { label: '待审核', value: 'PENDING' },
  { label: '审核中', value: 'REVIEWING' },
  { label: '已通过', value: 'SUCCESS' },
  { label: '已取消', value: 'CANCELLED' },
];

export const statusTagMap: Record<string, { color: string; label: string }> = {
  PENDING: { color: 'processing', label: '待审核' },
  REVIEWING: { color: 'warning', label: '审核中' },
  SUCCESS: { color: 'success', label: '已通过' },
  CANCELLED: { color: 'error', label: '已取消' },
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
    title: '充值金额',
    minWidth: 110,
    formatter({ cellValue }) {
      const num = Number(cellValue ?? 0);
      return num.toFixed(2);
    },
  },
  {
    field: 'currency',
    title: '币种',
    minWidth: 80,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'targetAccount',
    title: '目标账户',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'paymentMethod',
    title: '支付方式',
    minWidth: 100,
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
    field: 'screenshot',
    title: '充值截图',
    minWidth: 100,
    slots: {
      default: ({ row }) =>
        row.screenshot ? (
          <Image
            class="rounded object-cover"
            height={32}
            src={row.screenshot}
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
