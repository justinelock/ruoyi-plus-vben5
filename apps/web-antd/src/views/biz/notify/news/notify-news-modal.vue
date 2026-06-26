<script setup lang="ts">
/** 市场新闻新增/编辑弹窗（对齐 Java FbMarketNewsController save/update） */
import type { NotifyNewsSaveReq } from '#/api/biz/notify/news/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import {
  notifyNewsAdd,
  notifyNewsInfo,
  notifyNewsUpdate,
} from '#/api/biz/notify/news';

import {
  newsCategoryOptions,
  newsSourceOptions,
  notifyNewsFormSchema,
} from './notify-news-form-data';

const emit = defineEmits<{ reload: [] }>();

const editingId = ref('');
const modalTitle = computed(() => (editingId.value ? '编辑新闻' : '新增新闻'));

const [BasicForm, formApi] = useVbenForm({
  layout: 'horizontal',
  schema: notifyNewsFormSchema(),
  showDefaultActions: false,
  commonConfig: {
    labelWidth: 100,
    labelClass: 'justify-start',
    componentProps: { class: 'w-full' },
  },
  wrapperClass: 'grid-cols-2',
});

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[720px]',
  onClosed: handleClosed,
  onConfirm: handleSubmit,
  onOpenChange: handleOpenChange,
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
      const detail = await notifyNewsInfo(editingId.value);
      const source = detail.source?.trim() || '金色财经';
      const category = detail.category?.trim() || '币圈';
      // 历史数据若不在预设选项内，临时补入选项以便下拉回显
      ensureSelectOption('source', source, newsSourceOptions);
      ensureSelectOption('category', category, newsCategoryOptions);
      await formApi.setValues({
        id: detail.id,
        title: detail.title ?? '',
        summary: detail.summary ?? '',
        content: detail.content ?? '',
        source,
        category,
        url: detail.url ?? '',
        imageUrl: detail.imageUrl ?? '',
        viewCount: detail.viewCount ?? 0,
        publishTime: detail.publishTime ?? undefined,
      });
    } finally {
      modalApi.modalLoading(false);
    }
  } else {
    await formApi.setValues({
      source: '金色财经',
      category: '币圈',
      viewCount: 0,
    });
  }
}

/** 编辑回显：选项列表不含历史值时动态追加一项 */
function ensureSelectOption(
  fieldName: 'category' | 'source',
  value: string,
  options: { label: string; value: string }[],
) {
  if (!value || options.some((o) => o.value === value)) {
    return;
  }
  const extra = [...options, { label: value, value }];
  formApi.updateSchema([
    {
      fieldName,
      componentProps: { options: extra },
    },
  ]);
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
  const payload: NotifyNewsSaveReq = {
    id: values.id as string | undefined,
    title: String(values.title ?? '').trim(),
    summary: String(values.summary ?? '').trim(),
    content: String(values.content ?? '').trim(),
    source: String(values.source ?? '').trim(),
    category: String(values.category ?? '').trim(),
    url: String(values.url ?? '').trim(),
    imageUrl: String(values.imageUrl ?? '').trim(),
    viewCount: Number(values.viewCount ?? 0),
    publishTime: values.publishTime as string | undefined,
  };
  modalApi.modalLoading(true);
  try {
    await (editingId.value
      ? notifyNewsUpdate({ ...payload, id: editingId.value })
      : notifyNewsAdd(payload));
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
