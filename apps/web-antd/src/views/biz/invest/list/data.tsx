/** 投信列表：筛选 schema 与表格列（字段对齐 fb_fund / Java fbfund.vue） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Image, Tag } from 'antdv-next';

const statusTagMap: Record<number, { color: string; label: string }> = {
  0: { color: 'warning', label: '禁用' },
  1: { color: 'processing', label: '启用' },
};

const soldOutTagMap: Record<number, { color: string; label: string }> = {
  0: { color: 'success', label: '进行中' },
  1: { color: 'default', label: '已售罄' },
};

const rateModeTagMap: Record<string, { color: string; label: string }> = {
  RANGE: { color: 'warning', label: '区间' },
  FIXED: { color: 'processing', label: '固定' },
  range: { color: 'warning', label: '区间' },
  fixed: { color: 'processing', label: '固定' },
};

/** 小数收益率 → 百分数字符串展示 */
export function formatRatePercent(rate?: number | null) {
  if (rate === null || rate === undefined) {
    return '-';
  }
  const n = Number(rate) * 100;
  if (!Number.isFinite(n)) {
    return '-';
  }
  const rounded = Math.round(n * 100) / 100;
  const nearestInt = Math.round(rounded);
  if (Math.abs(rounded - nearestInt) < 1e-9) {
    return String(nearestInt);
  }
  return rounded.toFixed(2).replace(/\.?0+$/, '');
}

export function formatAmount(value?: number | null) {
  if (value === null || value === undefined) {
    return '-';
  }
  const n = Number(value);
  if (!Number.isFinite(n)) {
    return '-';
  }
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

/** 海报预览地址：相对路径拼 origin */
export function resolvePosterSrc(poster?: string) {
  const p = poster?.trim();
  if (!p) {
    return '';
  }
  if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('data:')) {
    return p;
  }
  if (p.startsWith('/')) {
    return `${window.location.origin}${p}`;
  }
  return p;
}

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
    component: 'Select',
    componentProps: {
      getPopupContainer,
      allowClear: true,
      class: 'w-[100px]',
      options: [
        { label: '进行中', value: '0' },
        { label: '已售罄', value: '1' },
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
    field: 'code',
    title: '投信代码',
    minWidth: 110,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'name',
    title: '投信名称',
    minWidth: 140,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'poster',
    title: '海报',
    minWidth: 80,
    slots: {
      default: ({ row }) => {
        const src = resolvePosterSrc(row.poster);
        return src ? (
          <Image
            class="rounded object-cover"
            height={32}
            preview={{ src }}
            src={src}
            width={48}
          />
        ) : (
          '-'
        );
      },
    },
  },
  {
    field: 'description',
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
        const item = statusTagMap[Number(row.status)] ?? {
          color: 'default',
          label: row.status ?? '-',
        };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
  },
  {
    field: 'soldOut',
    title: '售罄',
    minWidth: 90,
    slots: {
      default: ({ row }) => {
        const item = soldOutTagMap[Number(row.soldOut)] ?? {
          color: 'default',
          label: row.soldOut ?? '-',
        };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
  },
  {
    field: 'sort',
    title: '排序',
    minWidth: 70,
    formatter({ cellValue }) {
      return cellValue ?? '-';
    },
  },
  {
    field: 'rateMin',
    title: '收益率显示',
    minWidth: 130,
    slots: {
      default: ({ row }) =>
        `${formatRatePercent(row.rateMin)}% ~ ${formatRatePercent(row.rateMax)}%`,
    },
  },
  {
    field: 'rate',
    title: '收益率',
    minWidth: 90,
    slots: {
      default: ({ row }) => `${formatRatePercent(row.rate)}%`,
    },
  },
  {
    field: 'maxAmount',
    title: '可投入金额',
    minWidth: 140,
    slots: {
      default: ({ row }) =>
        `${formatAmount(row.minAmount)}~${formatAmount(row.maxAmount)}`,
    },
  },
  {
    field: 'minAppendAmount',
    title: '最低追投金额',
    minWidth: 120,
    slots: {
      default: ({ row }) => formatAmount(row.minAppendAmount),
    },
  },
  {
    field: 'period',
    title: '周期',
    minWidth: 80,
    slots: {
      default: ({ row }) => (row.period != null ? `${row.period}天` : '-'),
    },
  },
  {
    field: 'rateMode',
    title: '收益率类型',
    minWidth: 100,
    slots: {
      default: ({ row }) => {
        const key = String(row.rateMode ?? '');
        const item = rateModeTagMap[key] ?? {
          color: 'default',
          label: key || '-',
        };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
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
