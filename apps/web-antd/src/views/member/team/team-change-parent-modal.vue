<script setup lang="ts">
import type { DescriptionsProps } from 'antdv-next';

import type { MemberTeam } from '#/api/member/team/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Descriptions } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { memberTeamChangeParent } from '#/api/member/team';

const emit = defineEmits<{ reload: [] }>();

const currentUser = ref<MemberTeam | null>(null);

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
      fieldName: 'userId',
      label: '用户ID',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        readonly: true,
      },
      fieldName: 'parentId',
      label: '上级代理ID',
      labelClass: 'justify-start',
    },
    {
      component: 'Input',
      componentProps: {
        allowClear: true,
        placeholder: '请输入新上级用户名',
      },
      fieldName: 'parentUsername',
      label: '上级代理用户名',
      labelClass: 'justify-start',
      rules: 'required',
    },
  ],
  showDefaultActions: false,
  commonConfig: {
    labelWidth: 120,
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
  const { record } = modalApi.getData() as { record: MemberTeam };
  currentUser.value = record;
  await formApi.setValues({
    userId: record.id,
    parentId: record.agent?.id || '-',
    parentUsername: record.agent?.username ?? '',
  });
}

async function handleSubmit() {
  try {
    modalApi.modalLoading(true);
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    const data = await formApi.getValues();
    const parentUsername = String(data.parentUsername ?? '').trim();
    if (!parentUsername) {
      window.message.warning('上级代理用户名不能为空');
      return;
    }
    await memberTeamChangeParent({
      userId: String(data.userId),
      username: parentUsername,
    });
    window.message.success('操作成功');
    emit('reload');
    await handleClosed();
  } catch (error) {
    console.error(error);
  } finally {
    modalApi.modalLoading(false);
  }
}

async function handleClosed() {
  modalApi.close();
  await formApi.resetForm();
  currentUser.value = null;
}

const items = computed<DescriptionsProps['items']>(() => {
  if (!currentUser.value) {
    return [];
  }
  return [
    { label: '用户ID', content: currentUser.value.id },
    { label: '用户名', content: currentUser.value.username || '-' },
    {
      label: '当前上级',
      content: currentUser.value.agent?.username || '-',
    },
  ];
});
</script>

<template>
  <BasicModal
    :close-on-click-modal="false"
    :fullscreen-button="false"
    class="w-[560px]"
    title="更换上级"
  >
    <div class="flex flex-col gap-3">
      <Descriptions bordered :column="1" :items="items" size="small" />
      <BasicForm />
    </div>
  </BasicModal>
</template>
