<script setup lang="ts">
import type { FundRecharge } from '#/api/biz/fund/recharge/model';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { fundRechargeRejected } from '#/api/biz/fund/recharge';

const emit = defineEmits<{ reload: [] }>();

const currentRow = ref<FundRecharge | null>(null);

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
      component: 'Textarea',
      componentProps: {
        allowClear: true,
        maxlength: 255,
        placeholder: '请输入拒绝理由',
        rows: 4,
        showCount: true,
      },
      fieldName: 'remark',
      label: '拒绝理由',
      labelClass: 'justify-start',
      rules: 'required',
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
  const row = modalApi.getData() as FundRecharge;
  currentRow.value = row;
  await formApi.setValues({ id: row.id, remark: '' });
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
    await fundRechargeRejected({
      id: values.id as string,
      remark: values.remark as string,
    });
    emit('reload');
    modalApi.close();
  } finally {
    modalApi.modalLoading(false);
  }
}
</script>

<template>
  <BasicModal class="w-[520px]" title="拒绝充值">
    <BasicForm />
  </BasicModal>
</template>
