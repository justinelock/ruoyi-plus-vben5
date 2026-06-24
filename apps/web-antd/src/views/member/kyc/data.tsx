import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Image, Space, Tag } from 'antdv-next';

/** 认证状态筛选项（业务字典未接入前使用固定选项） */
export const authStatusOptions = [
  { label: '未认证', value: '0' },
  { label: '已认证', value: '1' },
  { label: '认证中', value: '2' },
  { label: '已拒绝', value: '3' },
];

const authStatusTagMap: Record<
  string,
  { color: string; label: string }
> = {
  '0': { color: 'default', label: '未认证' },
  '1': { color: 'success', label: '已认证' },
  '2': { color: 'processing', label: '认证中' },
  '3': { color: 'error', label: '已拒绝' },
};

function renderAuthStatus(status?: string) {
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
    field: 'userName',
    title: '用户名',
    minWidth: 120,
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
    field: 'phoneNumber',
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
                key={index}
                class="rounded object-cover"
                height={32}
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
    field: 'authStatus',
    title: '认证状态',
    minWidth: 100,
    slots: {
      default: ({ row }) => renderAuthStatus(row.authStatus),
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
    field: 'submitTime',
    title: '提交时间',
    minWidth: 160,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'authTime',
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
