<script setup lang="ts">
import type { DescriptionsProps } from 'antdv-next';

import type { MemberTeam } from '#/api/member/team/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Descriptions } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { memberTeamAgentLevel } from '#/api/member/team';

const emit = defineEmits<{ reload: [] }>();

const currentUser = ref<MemberTeam | null>(null);

const agentLevelOptions = [
  { label: '三级（仅三级）', value: 3 },
  { label: '四级（含四级）', value: 4 },
  { label: '五级（含五级）', value: 5 },
];

const radioButton = { buttonStyle: 'solid' as const, optionType: 'button' as const };

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
      component: 'RadioGroup',
      componentProps: {
        ...radioButton,
        class: 'inline-flex flex-nowrap whitespace-nowrap',
        options: agentLevelOptions,
      },
      fieldName: 'agentLevel',
      formItemClass: 'items-center [&_.ant-radio-group]:flex-nowrap',
      label: '代理层级',
      labelClass: 'justify-start',
      rules: 'selectRequired',
    },
  ],
  showDefaultActions: false,
  commonConfig: {
    labelWidth: 84,
    labelClass: 'justify-start',
    componentProps: {
      class: 'w-auto',
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
    agentLevel: record.agentLevel ?? 3,
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
    await memberTeamAgentLevel({
      userId: String(data.userId),
      agentLevel: Number(data.agentLevel),
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
    { label: '当前层级', content: currentUser.value.agentLevel ?? '-' },
  ];
});
</script>

<template>
  <BasicModal
    :close-on-click-modal="false"
    :fullscreen-button="false"
    class="w-[560px]"
    title="代理层级"
  >
    <div class="flex flex-col gap-3">
      <Descriptions bordered :column="1" :items="items" size="small" />
      <BasicForm />
    </div>
  </BasicModal>
</template>
