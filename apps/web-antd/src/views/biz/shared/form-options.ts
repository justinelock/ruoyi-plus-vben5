import type { VbenFormProps } from '@vben/common-ui';

/** 业务列表页通用 inline 查询表单配置 */
export const bizInlineFormBase: Omit<VbenFormProps, 'schema'> = {
  layout: 'inline',
  actionLayout: 'inline',
  compact: true,
  showCollapseButton: false,
  commonConfig: { hideLabel: true, componentProps: { allowClear: true } },
  wrapperClass: 'items-center flex-wrap',
  actionWrapperClass: 'pb-0 flex-shrink-0',
  resetButtonOptions: { show: false },
  submitButtonOptions: { content: '查询', variant: 'default' },
};

/** 将 RangePicker 字段映射为后端 PageReq 的 params[beginTime]/params[endTime] */
export const bizTimeMapping = (
  field: string,
  begin = 'params[beginTime]',
  end = 'params[endTime]',
) =>
  [
    field,
    [begin, end],
    ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59'],
  ] as const;
