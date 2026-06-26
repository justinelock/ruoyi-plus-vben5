<script setup lang="ts">
/** 产品配置新增/编辑弹窗（对齐 Java fbfundproduct-add-or-update.vue） */
import type {
  ProductConfigSaveReq,
} from '#/api/biz/product/config/model';

import { computed, ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import {
  productConfigAdd,
  productConfigInfo,
  productConfigUpdate,
} from '#/api/biz/product/config';

import { productConfigFormSchema } from './product-config-form-data';

const emit = defineEmits<{ reload: [] }>();

const editingId = ref('');
const isEdit = computed(() => !!editingId.value);

const modalTitle = computed(() => (isEdit.value ? '编辑产品' : '新增产品'));

const [BasicForm, formApi] = useVbenForm({
  layout: 'horizontal',
  schema: productConfigFormSchema(),
  showDefaultActions: false,
  commonConfig: {
    labelWidth: 100,
    labelClass: 'justify-start',
    componentProps: { class: 'w-full' },
  },
  wrapperClass: 'grid-cols-2',
});

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[640px]',
  onClosed: handleClosed,
  onConfirm: handleSubmit,
  onOpenChange: handleOpenChange,
});

// 编辑时产品代码不可改（对齐 Java readonly）
watch(isEdit, (edit) => {
  formApi.updateSchema([
    {
      fieldName: 'code',
      componentProps: { disabled: edit, maxlength: 32 },
    },
  ]);
});

async function handleOpenChange(open: boolean) {
  if (!open) {
    return;
  }
  const data = modalApi.getData() as { id?: string };
  editingId.value = data?.id?.trim() ?? '';
  formApi.resetForm();
  if (editingId.value) {
    modalApi.modalLoading(true);
    try {
      const detail = await productConfigInfo(editingId.value);
      await formApi.setValues({
        id: detail.id,
        code: detail.code ?? '',
        alias: detail.alias ?? '',
        tradePair: detail.tradePair ?? '',
        name: detail.name ?? '',
        type: detail.type ?? 'FUND',
        market: detail.market ?? '',
        tradingHours: detail.tradingHours ?? '',
        odds: detail.odds ?? 0,
        currency: detail.currency || 'USD',
        status: detail.status === 0 ? 0 : 1,
      });
    } finally {
      modalApi.modalLoading(false);
    }
  } else {
    await formApi.setValues({
      type: 'FUND',
      currency: 'USD',
      status: 1,
      odds: 1,
    });
  }
}

function handleClosed() {
  editingId.value = '';
  formApi.resetForm();
}

async function handleSubmit() {
  const { valid } = await formApi.validate();
  if (!valid) {
    return;
  }
  const values = await formApi.getValues();
  const payload: ProductConfigSaveReq = {
    id: values.id as string | undefined,
    code: String(values.code ?? '').trim(),
    alias: String(values.alias ?? '').trim(),
    tradePair: String(values.tradePair ?? '').trim(),
    name: String(values.name ?? '').trim(),
    type: String(values.type ?? ''),
    market: String(values.market ?? ''),
    tradingHours: String(values.tradingHours ?? '').trim(),
    status: Number(values.status ?? 1),
    currency: String(values.currency ?? 'USD'),
    odds: Number(values.odds ?? 0),
  };
  modalApi.modalLoading(true);
  try {
    if (editingId.value) {
      await productConfigUpdate({ ...payload, id: editingId.value });
    } else {
      await productConfigAdd(payload);
    }
    emit('reload');
    modalApi.close();
  } catch (error) {
    console.error(error);
  } finally {
    modalApi.modalLoading(false);
  }
}
</script>

<template>
  <BasicModal :title="modalTitle">
    <BasicForm />
  </BasicModal>
</template>
