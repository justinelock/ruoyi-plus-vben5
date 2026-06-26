<script setup lang="tsx">
import type { DescriptionsProps } from 'antdv-next';

import type { FundStatement } from '#/api/biz/fund/statement/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Descriptions, Tag } from 'antdv-next';

import { fundStatementDetail } from '#/api/biz/fund/statement';
import {
  formatAccountType,
  formatFlowAmount,
  formatFlowType,
} from '#/views/member/report/flow-labels';

const detail = ref<FundStatement>();

const [BasicModal, modalApi] = useVbenModal({
  async onOpenChange(isOpen) {
    if (!isOpen) {
      return;
    }
    modalApi.modalLoading(true);
    try {
      const row = modalApi.getData() as { id: string };
      detail.value = await fundStatementDetail(row.id);
    } finally {
      modalApi.modalLoading(false);
    }
  },
  onClosed() {
    detail.value = undefined;
  },
});

function renderStatus(status?: string) {
  if (!status) {
    return '-';
  }
  return (
    <Tag color={status === 'SUCCESS' ? 'success' : 'default'}>{status}</Tag>
  );
}

function renderFlowAmount(amount?: number) {
  const num = Number(amount ?? 0);
  const text = formatFlowAmount(num);
  const color = num > 0 ? 'text-[#52c41a]' : (num < 0 ? 'text-[#ff4d4f]' : '');
  return <span class={color}>{text}</span>;
}

const items = computed<DescriptionsProps['items']>(() => {
  const d = detail.value;
  if (!d) {
    return [];
  }
  return [
    { label: '流水ID', content: d.id || '-' },
    { label: '用户ID', content: d.userId || '-' },
    { label: '用户名', content: d.username || '-' },
    { label: '手机号', content: d.mobile || '-' },
    { label: '真实姓名', content: d.realName || '-' },
    { label: '账户类型', content: formatAccountType(d.accountType) },
    { label: '交易类型', content: formatFlowType(d.flowType) },
    { label: '变动金额', content: renderFlowAmount(d.flowAmount) },
    { label: '交易前余额', content: formatFlowAmount(d.beforeAmount) },
    { label: '交易后余额', content: formatFlowAmount(d.afterAmount) },
    { label: '交易状态', content: renderStatus(d.status) },
    { label: '币种', content: d.currency || '-' },
    { label: '业务单号', content: d.businessNo || '-' },
    { label: '钱包ID', content: d.walletId || '-' },
    { label: '交易时间', content: d.createdAt || '-' },
    { label: '更新时间', content: d.updatedAt || '-' },
    { label: '交易描述', content: d.description || '-' },
    { label: '备注', content: d.remark || '-' },
  ];
});
</script>

<template>
  <BasicModal
    :footer="false"
    :fullscreen-button="false"
    class="w-[720px]"
    title="流水详情"
  >
    <Descriptions
      v-if="detail"
      bordered
      :column="2"
      :items="items"
      size="small"
    />
  </BasicModal>
</template>
