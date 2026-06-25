<script setup lang="ts">
import type { MemberWallet } from '#/api/member/wallet/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { cloneDeep } from '@vben/utils';

import { useVbenForm } from '#/adapter/form';
import { memberWalletAction } from '#/api/member/wallet';
import { defaultFormValueGetter, useBeforeCloseDiff } from '#/utils/popup';

import {
  buildWalletActionFormValues,
  createWalletActionSchema,
  walletActionTitles,
} from './wallet-action-data';
import type { WalletActionType } from './wallet-action-data';

const emit = defineEmits<{ reload: [] }>();

const actionType = ref<WalletActionType>('balance');
const title = computed(() => walletActionTitles[actionType.value]);

const [BasicForm, formApi] = useVbenForm({
  layout: 'vertical',
  commonConfig: {
    labelWidth: 100,
    componentProps: {
      class: 'w-full',
    },
  },
  schema: createWalletActionSchema('balance'),
  showDefaultActions: false,
});

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff(
  {
    initializedGetter: defaultFormValueGetter(formApi),
    currentGetter: defaultFormValueGetter(formApi),
  },
);

const [BasicModal, modalApi] = useVbenModal({
  fullscreenButton: false,
  class: 'w-[520px]',
  onBeforeClose,
  onClosed: handleClosed,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    modalApi.modalLoading(true);

    const { actionType: type, wallet } = modalApi.getData() as {
      actionType: WalletActionType;
      wallet: MemberWallet;
    };
    actionType.value = type;
    // 按操作类型切换表单项（加减款/开关账户等字段不同）
    await formApi.setState({
      schema: createWalletActionSchema(type),
    });
    await formApi.setValues(buildWalletActionFormValues(wallet));
    await markInitialized();

    modalApi.modalLoading(false);
  },
});

/** 提交钱包操作；后端接口未就绪时由 API 层返回占位提示 */
async function handleConfirm() {
  try {
    modalApi.lock(true);
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    const data = cloneDeep(await formApi.getValues());
    const result = await memberWalletAction({
      actionType: actionType.value,
      ...data,
    });
    if (result === 'ok') {
      window.message.success('操作成功');
    } else {
      window.message.info('钱包操作接口待后端接入，表单校验已通过');
    }
    resetInitialized();
    emit('reload');
    modalApi.close();
  } catch (error) {
    console.error(error);
  } finally {
    modalApi.lock(false);
  }
}

async function handleClosed() {
  await formApi.resetForm();
  resetInitialized();
}
</script>

<template>
  <BasicModal :title="title">
    <BasicForm />
  </BasicModal>
</template>
