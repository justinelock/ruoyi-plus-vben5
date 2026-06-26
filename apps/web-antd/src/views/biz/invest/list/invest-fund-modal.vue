<script setup lang="ts">
/** 投信新增/编辑弹窗：字段对齐 Java fbfund-add-or-update，海报 base64 提交由后端落盘 */
import type { InvestList, InvestListSaveReq } from '#/api/biz/invest/list/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import {
  investListAdd,
  investListInfo,
  investListUpdate,
} from '#/api/biz/invest/list';

import { resolvePosterSrc } from './data';
import { fundFormSchema } from './invest-fund-form-data';

const emit = defineEmits<{ reload: [] }>();

const editingId = ref('');
const posterPreview = ref('');
const posterFileInputRef = ref<HTMLInputElement | null>(null);

const modalTitle = computed(() =>
  editingId.value ? '修改投信' : '新增投信',
);

const hasPosterPreview = computed(() => !!posterPreview.value.trim());

const [BasicForm, formApi] = useVbenForm({
  layout: 'horizontal',
  schema: fundFormSchema(),
  showDefaultActions: false,
  commonConfig: {
    labelWidth: 120,
    labelClass: 'justify-start',
    componentProps: { class: 'w-full' },
  },
  wrapperClass: 'grid-cols-2',
});

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[860px]',
  onClosed: handleClosed,
  onConfirm: handleSubmit,
  onOpenChange: handleOpenChange,
});

/** 百分数 → 库存小数（两位） */
function percentToDecimal(percent: number) {
  return Math.round(percent * 100) / 10000;
}

/** 库存小数 → 百分数展示 */
function decimalToPercent(decimal: number) {
  return Math.round(decimal * 100 * 100) / 100;
}

async function handleOpenChange(open: boolean) {
  if (!open) {
    return;
  }
  const data = modalApi.getData() as { id?: string };
  editingId.value = data?.id?.trim() ?? '';
  posterPreview.value = '';
  formApi.resetForm();
  if (editingId.value) {
    modalApi.modalLoading(true);
    try {
      const detail = await investListInfo(editingId.value);
      await applyDetail(detail);
    } finally {
      modalApi.modalLoading(false);
    }
  } else {
    await formApi.setValues({
      currency: 'USD',
      soldOut: 0,
      sort: 0,
      rateMinPct: 15,
      rateMaxPct: 25,
      ratePct: 20,
      minAppendAmount: 100,
    });
  }
}

/** 详情回显：小数收益率转百分数输入框 */
async function applyDetail(detail: InvestList) {
  posterPreview.value = detail.poster?.trim() ?? '';
  await formApi.setValues({
    id: detail.id,
    poster: detail.poster ?? '',
    code: detail.code ?? '',
    symbol: detail.symbol ?? '',
    name: detail.name ?? '',
    company: detail.company ?? '',
    ev: detail.ev ?? '',
    price: detail.price ?? 0,
    currency: detail.currency || 'USD',
    description: detail.description ?? '',
    rateMinPct: detail.rateMin != null ? decimalToPercent(detail.rateMin) : undefined,
    rateMaxPct: detail.rateMax != null ? decimalToPercent(detail.rateMax) : undefined,
    ratePct: detail.rate != null ? decimalToPercent(detail.rate) : undefined,
    minAmount: detail.minAmount ?? 0,
    maxAmount: detail.maxAmount ?? 0,
    minAppendAmount: detail.minAppendAmount ?? 100,
    period: detail.period ?? 1,
    soldOut: detail.soldOut === 1 ? 1 : 0,
    sort: detail.sort ?? 0,
  });
}

function handleClosed() {
  editingId.value = '';
  posterPreview.value = '';
  formApi.resetForm();
}

function triggerPosterFileInput() {
  posterFileInputRef.value?.click();
}

function handlePosterFileUpload(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = '';
  if (!file) {
    return;
  }
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!validTypes.includes(file.type)) {
    message.warning('请上传 jpg、png 或 jpeg 格式的图片');
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    message.warning('图片大小不能超过 5MB');
    return;
  }
  const reader = new FileReader();
  reader.onload = (evt) => {
    const dataUrl = String((evt.target as FileReader)?.result || '');
    posterPreview.value = dataUrl;
    formApi.setFieldValue('poster', dataUrl);
  };
  reader.readAsDataURL(file);
}

function removePoster() {
  posterPreview.value = '';
  formApi.setFieldValue('poster', '');
}

async function handleSubmit() {
  const { valid } = await formApi.validate();
  if (!valid) {
    return;
  }
  const values = await formApi.getValues();
  const ratePct = Number(values.ratePct);
  if (!Number.isFinite(ratePct) || ratePct <= 0) {
    message.warning('固定收益率必须大于 0');
    return;
  }
  const payload: InvestListSaveReq = {
    id: values.id as string | undefined,
    code: String(values.code ?? '').trim(),
    symbol: String(values.symbol ?? '').trim(),
    name: String(values.name ?? '').trim(),
    company: String(values.company ?? '').trim(),
    ev: String(values.ev ?? '').trim(),
    price: Number(values.price ?? 0),
    currency: String(values.currency ?? 'USD'),
    description: String(values.description ?? '').trim(),
    poster: String(values.poster ?? posterPreview.value ?? '').trim(),
    status: 1,
    soldOut: Number(values.soldOut ?? 0),
    rateMin: percentToDecimal(Number(values.rateMinPct ?? 0)),
    rateMax: percentToDecimal(Number(values.rateMaxPct ?? 0)),
    rate: percentToDecimal(ratePct),
    minAmount: Number(values.minAmount ?? 0),
    maxAmount: Number(values.maxAmount ?? 0),
    minAppendAmount: Number(values.minAppendAmount ?? 100),
    period: Number(values.period ?? 0),
    rateMode: 'FIXED',
    sort: Number(values.sort ?? 0),
  };
  modalApi.modalLoading(true);
  try {
    if (editingId.value) {
      await investListUpdate({ ...payload, id: editingId.value });
    } else {
      await investListAdd(payload);
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
    <div class="mb-4">
      <div class="mb-2 text-sm font-medium">投信海报</div>
      <div v-if="hasPosterPreview" class="flex items-start gap-3">
        <img
          :src="resolvePosterSrc(posterPreview)"
          alt="投信海报"
          class="h-[120px] rounded-lg border border-gray-200 object-cover"
        />
        <a-button danger size="small" @click="removePoster">删除</a-button>
      </div>
      <div
        v-else
        class="flex max-w-md cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-3 py-4 hover:border-primary hover:bg-blue-50/40"
        @click="triggerPosterFileInput"
      >
        <input
          ref="posterFileInputRef"
          accept="image/jpeg,image/png,image/jpg"
          class="hidden"
          type="file"
          @change="handlePosterFileUpload"
        />
        <div class="text-sm font-medium text-gray-800">点击上传投信海报</div>
        <div class="mt-1 text-xs text-gray-500">支持 JPG、PNG、JPEG，最大 5MB</div>
      </div>
    </div>
    <BasicForm />
  </BasicModal>
</template>
