import type { FormSchemaGetter } from '#/adapter/form';

import { getPopupContainer } from '@vben/utils';

/** 新闻来源选项 */
export const newsSourceOptions = [
  { label: '金色财经', value: '金色财经' },
  { label: 'Reuters', value: 'Reuters' },
  { label: 'Gelonghui', value: 'Gelonghui' },
];

/** 新闻分类选项 */
export const newsCategoryOptions = [
  { label: '币圈', value: '币圈' },
  { label: '期货', value: '期货' },
  { label: '股票', value: '股票' },
];

/** 市场新闻新增/编辑表单（对齐 Java FbMarketNewsDTO） */
export const notifyNewsFormSchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    dependencies: { show: () => false, triggerFields: [''] },
    fieldName: 'id',
    label: 'ID',
  },
  {
    component: 'Input',
    componentProps: { maxlength: 255, showCount: true },
    fieldName: 'title',
    label: '新闻标题',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Textarea',
    componentProps: { maxlength: 500, rows: 2, showCount: true },
    fieldName: 'summary',
    label: '新闻摘要',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Textarea',
    componentProps: { rows: 6, placeholder: '新闻正文' },
    fieldName: 'content',
    label: '新闻内容',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      class: 'w-full',
      options: newsSourceOptions,
      placeholder: '请选择新闻来源',
    },
    defaultValue: '金色财经',
    fieldName: 'source',
    label: '新闻来源',
    rules: 'selectRequired',
    formItemClass: 'col-span-1',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      class: 'w-full',
      options: newsCategoryOptions,
      placeholder: '请选择新闻分类',
    },
    defaultValue: '币圈',
    fieldName: 'category',
    label: '新闻分类',
    rules: 'selectRequired',
    formItemClass: 'col-span-1',
  },
  {
    component: 'Input',
    componentProps: { maxlength: 255, placeholder: 'https://' },
    fieldName: 'url',
    label: '新闻链接',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    componentProps: { maxlength: 255, placeholder: '图片 URL' },
    fieldName: 'imageUrl',
    label: '新闻图片',
    formItemClass: 'col-span-2',
  },
  {
    component: 'InputNumber',
    componentProps: { class: 'w-full', min: 0, precision: 0 },
    defaultValue: 0,
    fieldName: 'viewCount',
    label: '浏览次数',
    formItemClass: 'col-span-1',
  },
  {
    component: 'DatePicker',
    componentProps: {
      class: 'w-full',
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: '请选择发布时间',
    },
    fieldName: 'publishTime',
    label: '发布时间',
    formItemClass: 'col-span-1',
  },
];
