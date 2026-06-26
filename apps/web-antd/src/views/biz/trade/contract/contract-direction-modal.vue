<script setup lang="ts">
import type { TradeContract } from '#/api/biz/trade/contract/model';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { tradeContractDirection } from '#/api/biz/trade/contract';

const emit = defineEmits<{ reload: [] }>();

const currentRow = ref<null | TradeContract>(null);

const directionOptions = [
  { label: '1 买入做多', value: 1 },
  { label: '2 卖出做空', value: 2 },
];

const [BasicModal, modalApi] = useVbenModal({
  onClosed: handleClosed,
  onConfirm: handleSubmit,
  onOpenChange: handleOpenChange,
});

const [BasicForm, formApi] = useVbenForm({
  layout: 'horizontal',
  schema: [
    {
      component: 'Input',
      dependencies: {
        show: () => false,
        triggerFields: [''],
      },
      fieldName: 'id',
      label: 'ID',
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        options: directionOptions,
      },
      fieldName: 'direction',
      label: '交易方向',
      labelClass: 'justify-start',
      rules: 'selectRequired',
    },
  ],
  showDefaultActions: false,
  commonConfig: {
    labelWidth: 90,
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
  const row = modalApi.getData() as TradeContract;
  currentRow.value = row;
  await formApi.setValues({
    id: row.id,
    direction: row.direction === 2 ? 2 : 1,
  });
}

function handleClosed() {
  currentRow.value = null;
  formApi.resetForm();
}

async function handleSubmit() {
  const { valid } = await formApi.validate();
  if (!valid) {
    return;
  }
  const values = await formApi.getValues();
  modalApi.modalLoading(true);
  try {
    await tradeContractDirection(
      values.id as string,
      values.direction as number,
    );
    emit('reload');
    modalApi.close();
  } finally {
    modalApi.modalLoading(false);
  }
}
</script>

<template>
  <BasicModal class="w-[420px]" title="修改交易方向">
    <BasicForm />
  </BasicModal>
</template>
