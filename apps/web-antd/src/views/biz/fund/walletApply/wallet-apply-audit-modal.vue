<script setup lang="ts">
import type { FundWalletApply } from '#/api/biz/fund/walletApply/model';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm, z } from '#/adapter/form';
import { fundWalletApplyVerify } from '#/api/biz/fund/walletApply';

const emit = defineEmits<{ reload: [] }>();

const currentRow = ref<FundWalletApply | null>(null);

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
        buttonStyle: 'solid',
        optionType: 'button',
        options: [
          { label: '通过', value: 'APPROVED' },
          { label: '拒绝', value: 'REJECTED' },
        ],
      },
      defaultValue: 'APPROVED',
      fieldName: 'state',
      label: '审核结果',
      labelClass: 'justify-start',
      rules: 'required',
    },
    {
      component: 'Textarea',
      componentProps: {
        allowClear: true,
        maxlength: 200,
        placeholder: '请输入审核意见',
        rows: 4,
        showCount: true,
      },
      fieldName: 'remark',
      label: '审核意见',
      labelClass: 'justify-start',
      rules: z
        .string()
        .min(1, { message: '请输入审核意见' })
        .min(5, { message: '审核意见至少5个字符' }),
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
  const row = modalApi.getData() as FundWalletApply;
  currentRow.value = row;
  await formApi.setValues({ id: row.id, state: 'APPROVED', remark: '' });
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
    await fundWalletApplyVerify({
      id: values.id as string,
      state: values.state as 'APPROVED' | 'REJECTED',
      remark: (values.remark as string).trim(),
    });
    emit('reload');
    modalApi.close();
  } finally {
    modalApi.modalLoading(false);
  }
}
</script>

<template>
  <BasicModal class="w-[520px]" title="钱包申请审核">
    <BasicForm />
  </BasicModal>
</template>
