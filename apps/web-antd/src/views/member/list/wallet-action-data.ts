import type { FormSchemaGetter } from '#/adapter/form';

/** 钱包抽屉操作分组（±款、开关账户等合并为单按钮弹窗） */
export type WalletActionType =
  | 'account'
  | 'balance'
  | 'frozen'
  | 'ticket'
  | 'transfer';

export const walletActionTitles: Record<WalletActionType, string> = {
  balance: '加减款',
  account: '开关账户',
  frozen: '冻解金额',
  ticket: '加减抽奖券',
  transfer: '划转',
};

type FlowTypeOption = {
  label: string;
  value: string;
};

/** 管理端用户钱包「加款」可选 flowType（充值/彩金/团队分红/划转） */
export const adminAddAmountTypeOptions: FlowTypeOption[] = [
  { value: 'ADD_AMOUNT', label: '充值' },
  { value: 'ADD_BONUS', label: '彩金' },
  { value: 'ADD_DIVIDEND', label: '团队分红' },
  { value: 'ADD_TRANSFER', label: '划转' },
];

/** 管理端用户钱包「减款」可选 flowType（减款/划转） */
export const adminSubtractAmountTypeOptions: FlowTypeOption[] = [
  { value: 'SUBTRACT_AMOUNT', label: '减款' },
  { value: 'ADD_TRANSFER', label: '划转' },
];

const accountTypeLabelMap: Record<string, string> = {
  main: '主账户',
  sub: '子账户',
};

function readonlyInput(label: string, fieldName: string) {
  return {
    component: 'Input' as const,
    componentProps: {
      disabled: true,
    },
    fieldName,
    label,
  };
}

/** 按操作类型生成弹窗表单 schema（字典类型编辑弹窗同款 VbenForm） */
export function createWalletActionSchema(
  actionType: WalletActionType,
  onBalanceDirectionChange?: (direction: 'add' | 'sub') => void,
): ReturnType<FormSchemaGetter> {
  const base = [
    {
      component: 'Input' as const,
      dependencies: {
        show: () => false,
        triggerFields: [''],
      },
      fieldName: 'walletId',
      label: 'walletId',
    },
    {
      ...readonlyInput('钱包类型', 'accountType'),
      formItemClass: 'col-span-1',
    },
    {
      ...readonlyInput('货币', 'currency'),
      dependencies: {
        // 加减款弹窗隐藏货币（保留字段，便于后续恢复）
        show: () => actionType !== 'balance',
        triggerFields: [''],
      },
    },
    {
      component: 'Input' as const,
      componentProps: {
        disabled: true,
      },
      fieldName: 'balance',
      formItemClass: 'col-span-1',
      label: '可用余额',
    },
    {
      component: 'Input' as const,
      componentProps: {
        disabled: true,
      },
      dependencies: {
        show: () => actionType === 'frozen',
        triggerFields: [''],
      },
      fieldName: 'frozenAmount',
      label: '当前冻结金额',
    },
  ];

  const remarkField = {
    component: 'Textarea' as const,
    fieldName: 'remark',
    label: '备注',
  };

  switch (actionType) {
    case 'balance': {
      return [
        ...base,
        {
          component: 'RadioGroup',
          componentProps: {
            buttonStyle: 'solid',
            onChange: (event: any) => {
              const direction =
                event?.target?.value === 'sub' || event === 'sub'
                  ? 'sub'
                  : 'add';
              onBalanceDirectionChange?.(direction);
            },
            optionType: 'button',
            options: [
              { label: '加款', value: 'add' },
              { label: '减款', value: 'sub' },
            ],
          },
          defaultValue: 'add',
          fieldName: 'direction',
          label: '操作类型',
          rules: 'selectRequired',
        },
        {
          component: 'RadioGroup',
          componentProps: {
            buttonStyle: 'solid',
            options: adminAddAmountTypeOptions,
            optionType: 'button',
          },
          dependencies: {
            show: ({ direction }: Record<string, string>) =>
              direction === 'add',
            triggerFields: ['direction'],
          },
          fieldName: 'flowType',
          label: '流水类型',
          rules: 'selectRequired',
        },
        {
          component: 'RadioGroup',
          componentProps: {
            buttonStyle: 'solid',
            options: adminSubtractAmountTypeOptions,
            optionType: 'button',
          },
          dependencies: {
            show: ({ direction }: Record<string, string>) =>
              direction === 'sub',
            triggerFields: ['direction'],
          },
          fieldName: 'flowType',
          label: '流水类型',
          rules: 'selectRequired',
        },
        {
          component: 'InputNumber',
          componentProps: {
            min: 0.01,
            precision: 2,
            class: 'w-full',
            placeholder: '请输入金额',
          },
          fieldName: 'amount',
          label: '金额',
          rules: 'required',
        },
        remarkField,
      ];
    }
    case 'account': {
      return [
        ...base,
        {
          component: 'RadioGroup',
          componentProps: {
            buttonStyle: 'solid',
            optionType: 'button',
            options: [
              { label: '开账户', value: 'open' },
              { label: '关账户', value: 'close' },
            ],
          },
          defaultValue: 'open',
          fieldName: 'direction',
          label: '操作类型',
          rules: 'selectRequired',
        },
        remarkField,
      ];
    }
    case 'frozen': {
      return [
        ...base,
        {
          component: 'RadioGroup',
          componentProps: {
            buttonStyle: 'solid',
            optionType: 'button',
            options: [
              { label: '冻金额', value: 'freeze' },
              { label: '解金额', value: 'unfreeze' },
            ],
          },
          defaultValue: 'freeze',
          fieldName: 'direction',
          label: '操作类型',
          rules: 'selectRequired',
        },
        {
          component: 'InputNumber',
          componentProps: {
            min: 0.01,
            precision: 2,
            class: 'w-full',
            placeholder: '请输入金额',
          },
          fieldName: 'amount',
          label: '金额',
          rules: 'required',
        },
        remarkField,
      ];
    }
    case 'ticket': {
      return [
        ...base,
        {
          component: 'RadioGroup',
          componentProps: {
            buttonStyle: 'solid',
            optionType: 'button',
            options: [
              { label: '加抽奖券', value: 'add' },
              { label: '减抽奖券', value: 'sub' },
            ],
          },
          defaultValue: 'add',
          fieldName: 'direction',
          label: '操作类型',
          rules: 'selectRequired',
        },
        {
          component: 'InputNumber',
          componentProps: {
            min: 1,
            precision: 0,
            class: 'w-full',
            placeholder: '请输入数量',
          },
          fieldName: 'quantity',
          label: '券数量',
          rules: 'required',
        },
        remarkField,
      ];
    }
    case 'transfer': {
      return [
        ...base,
        {
          component: 'Select',
          componentProps: {
            class: 'w-full',
            options: [
              { label: accountTypeLabelMap.main, value: 'main' },
              { label: accountTypeLabelMap.sub, value: 'sub' },
            ],
            placeholder: '请选择目标钱包类型',
          },
          fieldName: 'targetAccountType',
          label: '目标钱包',
          rules: 'selectRequired',
        },
        {
          component: 'InputNumber',
          componentProps: {
            min: 0.01,
            precision: 2,
            class: 'w-full',
            placeholder: '请输入划转金额',
          },
          fieldName: 'amount',
          label: '划转金额',
          rules: 'required',
        },
        remarkField,
      ];
    }
    default: {
      return base;
    }
  }
}

/** 打开弹窗时写入只读展示字段 */
export function buildWalletActionFormValues(wallet: {
  accountType?: string;
  balance?: number;
  currency?: string;
  drawTicket?: number;
  frozenAmount?: number;
  id?: string;
}) {
  const accountType = wallet.accountType || '-';
  return {
    walletId: wallet.id,
    accountType: accountTypeLabelMap[accountType] ?? accountType,
    currency: wallet.currency || '-',
    balance:
      wallet.balance === undefined ? '0.00' : Number(wallet.balance).toFixed(2),
    frozenAmount:
      wallet.frozenAmount === undefined
        ? '0.00'
        : Number(wallet.frozenAmount).toFixed(2),
    drawTicket: wallet.drawTicket ?? 0,
  };
}
