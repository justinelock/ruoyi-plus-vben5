/** 登录记录列表：筛选 schema 与表格列（字段对齐 MemberLoginLogItem） */
import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Tag } from 'antdv-next';

const loginResultOptions = [
  { label: '成功', value: 'SUCCESS' },
  { label: '失败', value: 'FAIL' },
];

const loginMethodOptions = [
  { label: '密码登录', value: 'PASSWORD' },
  { label: '短信登录', value: 'SMS' },
  { label: '第三方登录', value: 'OAUTH' },
];

const riskLevelOptions = [
  { label: '低', value: 'LOW' },
  { label: '中', value: 'MEDIUM' },
  { label: '高', value: 'HIGH' },
];

const ipTypeOptions = [
  { label: 'IPv4', value: 'ipv4' },
  { label: 'IPv6', value: 'ipv6' },
  { label: '代理IP', value: 'proxy' },
];

const timeRangeOptions = [
  { label: '今天', value: 'today' },
  { label: '近7天', value: '7d' },
  { label: '近30天', value: '30d' },
  { label: '近90天', value: '90d' },
];

const failReasonOptions = [
  { label: '密码错误', value: 'bad_password' },
  { label: '账号锁定', value: 'locked' },
  { label: '验证码错误', value: 'bad_captcha' },
];

const deviceTypeOptions = [
  { label: 'PC', value: 'pc' },
  { label: 'Android', value: 'android' },
  { label: 'iOS', value: 'ios' },
  { label: 'H5', value: 'h5' },
];

const browserOptions = [
  { label: 'Chrome', value: 'chrome' },
  { label: 'Safari', value: 'safari' },
  { label: 'Firefox', value: 'firefox' },
  { label: 'Edge', value: 'edge' },
];

const selectField = (
  fieldName: string,
  placeholder: string,
  options: { label: string; value: string }[],
  widthClass = 'w-[120px]',
) => ({
  component: 'Select' as const,
  fieldName,
  formItemClass: 'pb-0',
  componentProps: {
    getPopupContainer,
    allowClear: true,
    class: widthClass,
    options,
    placeholder,
  },
});

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'keyword',
    formItemClass: 'pb-0',
    componentProps: {
      placeholder: '用户名/手机号/用户ID',
      class: 'w-[200px]',
    },
  },
  selectField('loginResult', '登录结果', loginResultOptions),
  selectField('loginMethod', '登录方式', loginMethodOptions),
  selectField('riskLevel', '风险等级', riskLevelOptions),
  selectField('ipType', 'IP类型', ipTypeOptions),
  selectField('timeRange', '时间范围', timeRangeOptions),
  selectField('failReason', '失败原因', failReasonOptions),
  selectField('deviceType', '设备类型', deviceTypeOptions),
  selectField('browser', '浏览器', browserOptions),
];

const riskColorMap: Record<string, string> = {
  LOW: 'success',
  MEDIUM: 'warning',
  HIGH: 'error',
};

export const columns: VxeGridProps['columns'] = [
  { field: 'username', title: '用户名', minWidth: 120 },
  {
    field: 'realName',
    title: '真实姓名',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'deviceId',
    title: '设备唯一标识',
    minWidth: 160,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  { field: 'loginTime', title: '登录时间', minWidth: 160 },
  { field: 'loginIp', title: '登录IP', minWidth: 130 },
  {
    field: 'loginLocation',
    title: '登录地点',
    minWidth: 140,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  { field: 'loginType', title: '登录方式', minWidth: 100 },
  {
    field: 'loginResult',
    title: '登录结果',
    minWidth: 90,
    slots: {
      default: ({ row }) => (
        <Tag color={row.loginResult === 'SUCCESS' ? 'success' : 'error'}>
          {row.loginResult === 'SUCCESS' ? '成功' : '失败'}
        </Tag>
      ),
    },
  },
  {
    field: 'failReason',
    title: '失败原因',
    minWidth: 120,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'riskLevel',
    title: '风险等级',
    minWidth: 90,
    slots: {
      default: ({ row }) => (
        <Tag color={riskColorMap[row.riskLevel] ?? 'default'}>
          {row.riskLevel || '-'}
        </Tag>
      ),
    },
  },
  {
    field: 'riskDetail',
    title: '风险详情',
    minWidth: 160,
    showOverflow: 'tooltip',
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
];
