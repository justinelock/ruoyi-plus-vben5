import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Image, Space, Tag } from 'antdv-next';

import { renderCopyableValue } from '#/utils/render-copyable';

/** 认证状态筛选项 */
export const authStatusOptions = [
  { label: '未认证', value: 'UNVERIFIED' },
  { label: '已认证', value: 'VERIFIED' },
  { label: '认证中', value: 'PENDING' },
  { label: '已拒绝', value: 'REJECTED' },
];

/** 列表/详情共用：认证状态 Tag 配色与文案 */
export const authStatusTagMap: Record<
  string,
  { color: string; label: string }
> = {
  UNVERIFIED: { color: 'default', label: '未认证' },
  VERIFIED: { color: 'success', label: '已通过' },
  PENDING: { color: 'processing', label: '认证中' },
  REJECTED: { color: 'error', label: '已拒绝' },
};

export function renderAuthStatus(status?: string) {
  const item = authStatusTagMap[status ?? ''] ?? {
    color: 'default',
    label: status || '-',
  };
  return <Tag color={item.color}>{item.label}</Tag>;
}

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'keyword',
    componentProps: {
      placeholder: '用户名/手机号/身份证号',
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
    fieldName: 'submitTime',
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
    field: 'idCardNo',
    title: '身份证号',
    minWidth: 170,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'idCardFront',
    title: '证件照片',
    minWidth: 120,
    slots: {
      default: ({ row }) => {
        const photos = [row.idCardFront, row.idCardBack].filter(Boolean);
        if (photos.length === 0) {
          return '-';
        }
        return (
          <Space size={4}>
            {photos.map((url: string, index: number) => (
              <Image
                class="rounded object-cover"
                height={32}
                key={index}
                src={url}
                width={48}
              />
            ))}
          </Space>
        );
      },
    },
  },
  {
    field: 'status',
    title: '认证状态',
    minWidth: 100,
    slots: {
      default: ({ row }) => renderAuthStatus(row.status),
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
  {
    field: 'createdAt',
    title: '提交时间',
    minWidth: 160,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'verifiedAt',
    title: '认证时间',
    minWidth: 160,
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
