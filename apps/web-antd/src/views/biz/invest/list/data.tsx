/** 投信列表列表：筛选 schema 与表格列（字段对齐 InvestListItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Image, Tag } from 'antdv-next';

const statusOptions = [
  { label: '上架', value: '0' },
  { label: '下架', value: '1' },
];

const statusTagMap: Record<string, { color: string; label: string }> = {
  '0': { color: 'success', label: '上架' },
  '1': { color: 'default', label: '下架' },
};

const soldOutTagMap: Record<string, { color: string; label: string }> = {
  '0': { color: 'success', label: '否' },
  '1': { color: 'error', label: '是' },
};

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'keyword',
    componentProps: {
      placeholder: '投信代码/名称',
      class: 'w-[200px]',
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
    component: 'Select',
    componentProps: {
      getPopupContainer,
      allowClear: true,
      class: 'w-[100px]',
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
      placeholder: '售罄',
    },
    fieldName: 'soldOut',
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
    field: 'investCode',
    title: '投信代码',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'investName',
    title: '投信名称',
    minWidth: 140,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'logo',
    title: 'Logo',
    minWidth: 80,
    slots: {
      default: ({ row }) =>
        row.logo ? (
          <Image
            class="rounded object-cover"
            height={32}
            src={row.logo}
            width={48}
          />
        ) : (
          '-'
        ),
    },
  },
  {
    field: 'productDesc',
    title: '产品描述',
    minWidth: 160,
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
    field: 'soldOut',
    title: '售罄',
    minWidth: 70,
    slots: {
      default: ({ row }) => {
        const item = soldOutTagMap[row.soldOut] ?? {
          color: 'default',
          label: row.soldOut || '-',
        };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
  },
  {
    field: 'sortOrder',
    title: '排序',
    minWidth: 70,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'yieldDisplay',
    title: '收益率显示',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'yieldRate',
    title: '收益率',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'investableAmount',
    title: '可投入金额',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'minAddAmount',
    title: '最低追投金额',
    minWidth: 120,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'period',
    title: '周期',
    minWidth: 80,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'yieldType',
    title: '收益率类型',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'expireDate',
    title: '到期日',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'createTime',
    title: '创建时间',
    minWidth: 160,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'updateTime',
    title: '更新时间',
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
