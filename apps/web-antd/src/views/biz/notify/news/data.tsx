/** 市场新闻列表：筛选 schema 与表格列（字段对齐 NotifyNewsItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Image } from 'antdv-next';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'keyword',
    componentProps: {
      placeholder: '新闻标题/摘要',
      class: 'w-[200px]',
    },
    formItemClass: 'pb-0',
  },
  {
    component: 'Input',
    fieldName: 'source',
    componentProps: {
      placeholder: '新闻来源',
      class: 'w-[120px]',
    },
    formItemClass: 'pb-0',
  },
  {
    component: 'RangePicker',
    fieldName: 'publishTime',
    componentProps: {
      class: 'w-[280px]',
      placeholder: ['发布开始', '发布结束'],
    },
    formItemClass: 'pb-0',
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    field: 'title',
    title: '新闻标题',
    minWidth: 180,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'summary',
    title: '新闻摘要',
    minWidth: 160,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'content',
    title: '新闻内容',
    minWidth: 200,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'source',
    title: '新闻来源',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'link',
    title: '新闻链接',
    minWidth: 160,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'image',
    title: '新闻图片',
    minWidth: 100,
    slots: {
      default: ({ row }) =>
        row.image ? (
          <Image
            class="rounded object-cover"
            height={32}
            src={row.image}
            width={48}
          />
        ) : (
          '-'
        ),
    },
  },
  {
    field: 'viewCount',
    title: '浏览次数',
    minWidth: 90,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'publishTime',
    title: '发布时间',
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
