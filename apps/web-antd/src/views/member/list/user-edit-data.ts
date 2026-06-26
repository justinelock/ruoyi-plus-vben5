import type { FormSchemaGetter } from '#/adapter/form';

const radioButton = {
  buttonStyle: 'solid' as const,
  optionType: 'button' as const,
};

/** 实名认证状态 */
export const memberVerificationStatusOptions = [
  { label: '认证中', value: 'PENDING' },
  { label: '已认证', value: 'VERIFIED' },
  { label: '已拒绝', value: 'REJECTED' },
];

/** 用户状态 */
export const memberUserStatusOptions = [
  { label: '正常', value: 'ACTIVE' },
  { label: '禁用', value: 'DISABLED' },
];

/** 是否锁定 */
export const memberAccountLockedOptions = [
  { label: '否', value: false },
  { label: '是', value: true },
];

/** 是否已实名 */
export const memberVerifiedOptions = [
  { label: '未认证', value: false },
  { label: '已认证', value: true },
];

/** 合约控制 */
export const memberContractControlOptions = [
  { label: '赢', value: 1 },
  { label: '输', value: 2 },
  { label: '自然', value: 3 },
];

/** 编辑抽屉表单（双列，对齐管理端用户编辑） */
export const memberUserEditSchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    componentProps: { disabled: true },
    fieldName: 'id',
    label: '用户ID',
    formItemClass: 'col-span-1',
  },
  {
    component: 'Input',
    fieldName: 'username',
    label: '用户名',
    formItemClass: 'col-span-1',
    rules: 'required',
  },
  {
    component: 'InputPassword',
    componentProps: { placeholder: '密码' },
    fieldName: 'password',
    label: '密码',
    formItemClass: 'col-span-1',
  },
  {
    component: 'InputPassword',
    componentProps: { placeholder: '交易密码(MD5加密)' },
    fieldName: 'payPassword',
    label: '交易密码',
    formItemClass: 'col-span-1',
  },
  {
    component: 'Input',
    componentProps: { placeholder: '邮箱' },
    fieldName: 'email',
    label: '邮箱',
    formItemClass: 'col-span-1',
  },
  {
    component: 'Input',
    componentProps: { placeholder: '手机号' },
    fieldName: 'mobile',
    label: '手机号',
    formItemClass: 'col-span-1',
  },
  {
    component: 'Input',
    fieldName: 'realName',
    label: '真实姓名',
    formItemClass: 'col-span-1',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'idCard',
    label: '身份证号',
    formItemClass: 'col-span-1',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: { placeholder: '密保问题' },
    fieldName: 'securityQuestion',
    label: '密保问题',
    formItemClass: 'col-span-1',
  },
  {
    component: 'Input',
    componentProps: { placeholder: '密保答案' },
    fieldName: 'securityAnswer',
    label: '密保答案',
    formItemClass: 'col-span-1',
  },
  {
    component: 'Input',
    componentProps: { placeholder: '上级代理ID' },
    fieldName: 'parentId',
    label: '上级代理ID',
    formItemClass: 'col-span-1',
  },
  {
    component: 'Input',
    fieldName: 'inviteCode',
    label: '邀请码',
    formItemClass: 'col-span-1',
  },
  {
    component: 'InputNumber',
    componentProps: { class: 'w-full', min: 0, precision: 2, step: 0.01 },
    fieldName: 'commissionRate',
    label: '佣金比例',
    formItemClass: 'col-span-1',
  },
  {
    component: 'InputNumber',
    componentProps: { class: 'w-full', min: 0, precision: 2, step: 0.01 },
    fieldName: 'totalCommission',
    label: '累计佣金',
    formItemClass: 'col-span-1',
  },
  {
    component: 'Input',
    componentProps: { disabled: true },
    fieldName: 'role',
    label: '用户角色',
    formItemClass: 'col-span-1',
  },
  {
    component: 'InputNumber',
    componentProps: { class: 'w-full', min: 0, precision: 0 },
    fieldName: 'creditScore',
    label: '信用分数',
    formItemClass: 'col-span-1',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      ...radioButton,
      options: memberVerificationStatusOptions,
    },
    fieldName: 'verificationStatus',
    label: '实名认证状态',
    formItemClass: 'col-span-1',
    rules: 'selectRequired',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      ...radioButton,
      options: memberAccountLockedOptions,
    },
    fieldName: 'accountLocked',
    label: '账户是否锁定',
    formItemClass: 'col-span-1',
    rules: 'selectRequired',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      ...radioButton,
      options: memberUserStatusOptions,
    },
    fieldName: 'status',
    label: '用户状态',
    formItemClass: 'col-span-1',
    rules: 'selectRequired',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      ...radioButton,
      options: memberVerifiedOptions,
    },
    fieldName: 'verified',
    label: '是否已实名认证',
    formItemClass: 'col-span-1',
    rules: 'selectRequired',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      ...radioButton,
      options: memberContractControlOptions,
    },
    fieldName: 'contractControl',
    label: '合约控制',
    formItemClass: 'col-span-1',
    rules: 'selectRequired',
  },
  {
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
    fieldName: 'avatar',
  },
  {
    component: 'Textarea',
    componentProps: { placeholder: '说明', rows: 3 },
    fieldName: 'remark',
    label: '说明',
    formItemClass: 'col-span-2',
  },
];
