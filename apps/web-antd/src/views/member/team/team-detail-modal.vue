<script setup lang="ts">
import type { DescriptionsProps } from 'antdv-next';

import type { MemberTeamDetail } from '#/api/member/team/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Descriptions } from 'antdv-next';

import { memberTeamInfo } from '#/api/member/team';

import { formatTeamMoney } from './data';

const teamDetail = ref<MemberTeamDetail>();

const [BasicModal, modalApi] = useVbenModal({
  async onOpenChange(isOpen) {
    if (!isOpen) {
      return;
    }
    modalApi.modalLoading(true);
    try {
      const row = modalApi.getData() as { id: string };
      teamDetail.value = await memberTeamInfo(row.id);
    } finally {
      modalApi.modalLoading(false);
    }
  },
  onClosed() {
    teamDetail.value = undefined;
  },
});

const items = computed<DescriptionsProps['items']>(() => {
  const data = teamDetail.value;
  if (!data) {
    return [];
  }
  return [
    { label: '用户ID', content: data.id || '-' },
    { label: '用户名', content: data.username || '-' },
    { label: '代理层级', content: data.agentLevel ?? '-' },
    { label: '钱包数量', content: data.walletCount ?? 0 },
    {
      label: '总资产',
      content: formatTeamMoney(data.totalAssets),
    },
    {
      label: '总充值',
      content: formatTeamMoney(data.totalDeposit),
    },
    {
      label: '总提现',
      content: formatTeamMoney(data.totalWithdraw),
    },
    { label: '加入时间', content: data.createdAt || '-' },
  ];
});
</script>

<template>
  <BasicModal
    :footer="false"
    :fullscreen-button="false"
    class="w-[640px]"
    title="详情"
  >
    <Descriptions
      v-if="teamDetail"
      bordered
      :column="2"
      :items="items"
      size="small"
    />
  </BasicModal>
</template>
