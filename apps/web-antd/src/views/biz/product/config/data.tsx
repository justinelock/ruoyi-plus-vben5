/** 产品配置列表：筛选 schema 与表格列（字段对齐 ProductConfigItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Tag } from 'antdv-next';

const statusOptions = [
  { label: '启用', value: '0' },
  { label: '停用', value: '1' },
];

const statusTagMap: Record<string, { color: string; label: string }> = {
  '0': { color: 'success', label: '启用' },
  '1': { color: 'default', label: '停用' },
};

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'keyword',
    componentProps: {
      placeholder: '产品代码/名称',
      class: 'w-[200px]',
    },
    formItemClass: 'pb-0',
  },
  {
    component: 'Input',
    fieldName: 'productType',
    componentProps: {
      placeholder: '产品类型',
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
      placeholder: ['创建开始', '创建结束'],
    },
    formItemClass: 'pb-0',
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    field: 'productCode',
    title: '产品代码',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'productAlias',
    title: '产品别名',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'symbol',
    title: '交易对',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'productName',
    title: '产品名称',
    minWidth: 140,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'productType',
    title: '产品类型',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'market',
    title: '市场',
    minWidth: 80,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'odds',
    title: '赔率',
    minWidth: 80,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'tradeTime',
    title: '交易时间',
    minWidth: 140,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'currencies',
    title: '支持币种',
    minWidth: 120,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'status',
    title: '状态',
    minWidth: 80,
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
    field: 'createUpdateTime',
    title: '创建/更新时间',
    minWidth: 200,
    slots: {
      default: ({ row }) =>
        `${row.createTime || '-'} / ${row.updateTime || '-'}`,
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
