/** 通知发布列表：筛选 schema 与表格列（字段对齐 NotifyPublishItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Tag } from 'antdv-next';

const readStatusOptions = [
  { label: '未读', value: '0' },
  { label: '已读', value: '1' },
];

const readStatusTagMap: Record<string, { color: string; label: string }> = {
  '0': { color: 'processing', label: '未读' },
  '1': { color: 'success', label: '已读' },
};

const deletedTagMap: Record<string, { color: string; label: string }> = {
  '0': { color: 'success', label: '否' },
  '1': { color: 'error', label: '是' },
};

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'keyword',
    componentProps: {
      placeholder: '标题/接收用户ID',
      class: 'w-[200px]',
    },
    formItemClass: 'pb-0',
  },
  {
    component: 'Input',
    fieldName: 'notifyType',
    componentProps: {
      placeholder: '通知类型',
      class: 'w-[120px]',
    },
    formItemClass: 'pb-0',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      allowClear: true,
      class: 'w-[100px]',
      options: readStatusOptions,
      placeholder: '阅读状态',
    },
    fieldName: 'readStatus',
    formItemClass: 'pb-0',
  },
  {
    component: 'RangePicker',
    fieldName: 'sendTime',
    componentProps: {
      class: 'w-[280px]',
      placeholder: ['发送开始', '发送结束'],
    },
    formItemClass: 'pb-0',
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    field: 'receiveUserId',
    title: '接收用户ID',
    minWidth: 120,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'title',
    title: '通知标题',
    minWidth: 160,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'content',
    title: '通知内容',
    minWidth: 200,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'notifyType',
    title: '通知类型',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'readStatus',
    title: '阅读状态',
    minWidth: 90,
    slots: {
      default: ({ row }) => {
        const item = readStatusTagMap[row.readStatus] ?? {
          color: 'default',
          label: row.readStatus || '-',
        };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
  },
  {
    field: 'deleted',
    title: '删除标记',
    minWidth: 90,
    slots: {
      default: ({ row }) => {
        const item = deletedTagMap[row.deleted] ?? {
          color: 'default',
          label: row.deleted || '-',
        };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
  },
  {
    field: 'sendTime',
    title: '发送时间',
    minWidth: 160,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'expireTime',
    title: '过期时间',
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
