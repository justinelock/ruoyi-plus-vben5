/** 产品配置列表：筛选与表格列（对齐 fb_fund_product / Java fbfundproduct.vue） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Tag } from 'antdv-next';

const productTypeOptions = [
  { label: '外汇', value: 'FOREX' },
  { label: '股票', value: 'STOCK' },
  { label: '投信', value: 'FUND' },
  { label: '期货', value: 'FUTURE' },
  { label: '指数', value: 'INDEX' },
  { label: '期权', value: 'OPTION' },
];

const productTypeTagMap: Record<string, { color: string; label: string }> = {
  STOCK: { color: 'processing', label: '股票' },
  FOREX: { color: 'warning', label: '外汇' },
  FUND: { color: 'success', label: '投信' },
  FUTURE: { color: 'default', label: '期货' },
  INDEX: { color: 'default', label: '指数' },
  OPTION: { color: 'default', label: '期权' },
};

const marketLabelMap: Record<string, string> = {
  STOCK_US: '美股',
  STOCK_HK: '港股',
  STOCK_CN: 'A股',
  FOREX_US: '外汇美金',
  FOREX_EUR: '外汇欧元',
  FOREX_GBP: '外汇英镑',
  FOREX_AUD: '外汇澳元',
  FUND_STOCK: '股票投信',
  FUND_BOND: '债券投信',
  FUND_MIXED: '混合投信',
  FUND_INDEX: '指数投信',
};

export const marketOptions = Object.entries(marketLabelMap).map(
  ([value, label]) => ({ label, value }),
);

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      allowClear: true,
      class: 'w-[120px]',
      options: productTypeOptions,
      placeholder: '类型',
    },
    fieldName: 'type',
    formItemClass: 'pb-0',
  },
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
    component: 'Select',
    componentProps: {
      getPopupContainer,
      allowClear: true,
      class: 'w-[100px]',
      options: [
        { label: '禁用', value: '0' },
        { label: '启用', value: '1' },
      ],
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
    field: 'code',
    title: '产品代码',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'alias',
    title: '产品别名',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'tradePair',
    title: '交易对',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'name',
    title: '产品名称',
    minWidth: 140,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'type',
    title: '产品类型',
    minWidth: 90,
    slots: {
      default: ({ row }) => {
        const key = String(row.type ?? '');
        const item = productTypeTagMap[key] ?? {
          color: 'default',
          label: key || '-',
        };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
  },
  {
    field: 'market',
    title: '市场',
    minWidth: 100,
    slots: {
      default: ({ row }) => (
        <Tag>{marketLabelMap[row.market as string] ?? row.market ?? '-'}</Tag>
      ),
    },
  },
  {
    field: 'odds',
    title: '赔率',
    minWidth: 80,
    formatter({ cellValue }) {
      return cellValue ?? '-';
    },
  },
  {
    field: 'tradingHours',
    title: '交易时间',
    minWidth: 180,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'currency',
    title: '支持币种',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'status',
    title: '状态',
    minWidth: 80,
    slots: {
      default: ({ row }) => (
        <Tag color={Number(row.status) === 1 ? 'processing' : 'warning'}>
          {Number(row.status) === 1 ? '启用' : '禁用'}
        </Tag>
      ),
    },
  },
  {
    field: 'createTime',
    title: '创建/更新时间',
    minWidth: 180,
    slots: {
      default: ({ row }) => (
        <div class="text-sm leading-5">
          <div>{row.createTime || '-'}</div>
          <div>{row.updateTime || '-'}</div>
        </div>
      ),
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
