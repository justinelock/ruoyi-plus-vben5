<script setup lang="ts">
/** 修改收益弹窗：选日期查 profitBefore，校验后 PUT /invest/position/profit（对齐 Java profitBefore / updateProfit） */
import type { InvestPosition } from '#/api/biz/invest/position/model';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import {
  investPositionProfitBefore,
  investPositionUpdateProfit,
} from '#/api/biz/invest/position';

const emit = defineEmits<{ reload: [] }>();

const positionId = ref('');
/** 是否已查到修改前收益；无流水时不允许提交 */
const hasProfitBefore = ref(false);

const [BasicModal, modalApi] = useVbenModal({
  onClosed: handleClosed,
  onConfirm: handleSubmit,
  onOpenChange: handleOpenChange,
});

const [BasicForm, formApi] = useVbenForm({
  layout: 'horizontal',
  schema: [
    {
      component: 'DatePicker',
      componentProps: {
        class: 'w-full',
        valueFormat: 'YYYY-MM-DD',
        placeholder: '请选择收益日期',
        onChange: () => loadProfitBefore(), // 日期变更即查修改前收益
      },
      fieldName: 'profitDate',
      label: '收益日期',
      labelClass: 'justify-start',
      rules: 'selectRequired',
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: 'w-full',
        disabled: true,
        min: 0,
        precision: 2,
        placeholder: '选择日期后自动查询',
      },
      fieldName: 'profitBefore',
      label: '修改前收益',
      labelClass: 'justify-start',
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: 'w-full',
        min: 0.01,
        precision: 2,
        placeholder: '请输入修改后收益',
      },
      fieldName: 'profit',
      label: '修改后收益',
      labelClass: 'justify-start',
      rules: 'required',
    },
  ],
  showDefaultActions: false,
  commonConfig: {
    labelWidth: 100,
    labelClass: 'justify-start',
    componentProps: {
      class: 'w-full',
    },
  },
  wrapperClass: 'grid-cols-1',
});

async function handleOpenChange(open: boolean) {
  if (!open) {
    return;
  }
  const row = modalApi.getData() as InvestPosition;
  positionId.value = row.id;
  hasProfitBefore.value = false;
  await formApi.resetForm();
}

function handleClosed() {
  positionId.value = '';
  hasProfitBefore.value = false;
  formApi.resetForm();
}

/** 按持仓与日期查询修改前收益；无流水则清空并提示 */
async function loadProfitBefore() {
  const values = await formApi.getValues();
  const profitDate = values.profitDate as string | undefined;
  if (!profitDate || !positionId.value) {
    hasProfitBefore.value = false;
    await formApi.setValues({ profitBefore: undefined, profit: undefined });
    return;
  }
  modalApi.modalLoading(true);
  try {
    const res = await investPositionProfitBefore({
      id: positionId.value,
      profitDate,
    });
    // 后端无流水时 profit 为 null
    if (res.profit === null || res.profit === undefined) {
      hasProfitBefore.value = false;
      await formApi.setValues({ profitBefore: undefined, profit: undefined });
      message.warning('该日期暂无收益记录');
      return;
    }
    hasProfitBefore.value = true;
    await formApi.setValues({
      profitBefore: Number(res.profit),
      profit: undefined,
    });
  } finally {
    modalApi.modalLoading(false);
  }
}

async function handleSubmit() {
  const { valid } = await formApi.validate();
  if (!valid) {
    return;
  }
  const values = await formApi.getValues();
  const profitDate = values.profitDate as string;
  const profitBefore = values.profitBefore as number | undefined;
  const profit = values.profit as number | undefined;

  // 修改前、修改后收益均不能为空（与产品规则一致）
  if (!hasProfitBefore.value || profitBefore === undefined || profitBefore === null) {
    message.error('修改前收益不能为空，请先选择有收益记录的日期');
    return;
  }
  if (profit === undefined || profit === null || Number(profit) <= 0) {
    message.error('修改后收益不能为空且必须大于 0');
    return;
  }

  modalApi.modalLoading(true);
  try {
    await investPositionUpdateProfit({
      id: positionId.value,
      profitDate,
      profit: Number(profit),
    });
    emit('reload');
    modalApi.close();
  } finally {
    modalApi.modalLoading(false);
  }
}
</script>

<template>
  <BasicModal class="w-[460px]" title="修改收益">
    <BasicForm />
  </BasicModal>
</template>
