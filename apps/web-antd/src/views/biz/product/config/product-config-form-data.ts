import type { FormSchemaGetter } from '#/adapter/form';

import { marketOptions } from './data';

const productTypeOptions = [
  { label: '投信', value: 'FUND' },
  { label: '外汇', value: 'FOREX' },
  { label: '股票', value: 'STOCK' },
  { label: '指数', value: 'INDEX' },
  { label: '期货', value: 'FUTURE' },
  { label: '期权', value: 'OPTION' },
];

/** 产品配置新增/编辑表单（对齐 Java fbfundproduct-add-or-update.vue） */
export const productConfigFormSchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    dependencies: { show: () => false, triggerFields: [''] },
    fieldName: 'id',
    label: 'ID',
  },
  {
    component: 'Input',
    componentProps: { maxlength: 32 },
    fieldName: 'code',
    label: '产品代码',
    rules: 'required',
    formItemClass: 'col-span-1',
  },
  {
    component: 'Input',
    componentProps: { maxlength: 16, showCount: true },
    fieldName: 'alias',
    label: '产品别名',
    formItemClass: 'col-span-1',
  },
  {
    component: 'Input',
    componentProps: { maxlength: 16, placeholder: '如 BTC/USDT 或 EUR' },
    fieldName: 'tradePair',
    label: '交易对',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '产品名称',
    rules: 'required',
    formItemClass: 'col-span-2',
  },
  {
    component: 'RadioGroup',
    componentProps: { optionType: 'button', options: productTypeOptions },
    defaultValue: 'FUND',
    fieldName: 'type',
    label: '产品类型',
    rules: 'selectRequired',
    formItemClass: 'col-span-2',
  },
  {
    component: 'Select',
    componentProps: {
      class: 'w-full',
      options: marketOptions,
      placeholder: '请选择市场',
    },
    fieldName: 'market',
    label: '市场',
    rules: 'selectRequired',
    formItemClass: 'col-span-1',
  },
  {
    component: 'Input',
    fieldName: 'tradingHours',
    label: '交易时间',
    formItemClass: 'col-span-1',
  },
  {
    component: 'InputNumber',
    componentProps: { class: 'w-full', min: 0, step: 0.01, precision: 2 },
    fieldName: 'odds',
    label: '赔率',
    rules: 'required',
    formItemClass: 'col-span-1',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      optionType: 'button',
      options: [
        { label: '美元', value: 'USD' },
        { label: '欧元', value: 'EUR' },
      ],
    },
    defaultValue: 'USD',
    fieldName: 'currency',
    label: '币种',
    rules: 'selectRequired',
    formItemClass: 'col-span-1',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      optionType: 'button',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
    defaultValue: 1,
    fieldName: 'status',
    label: '状态',
    rules: 'selectRequired',
    formItemClass: 'col-span-2',
  },
];
