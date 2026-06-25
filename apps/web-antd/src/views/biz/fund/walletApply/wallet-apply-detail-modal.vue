<script setup lang="tsx">
import type { DescriptionsProps } from 'antdv-next';

import type { FundWalletApplyDetail } from '#/api/biz/fund/walletApply/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Descriptions, Tag } from 'antdv-next';

import { fundWalletApplyDetail } from '#/api/biz/fund/walletApply';

const detail = ref<FundWalletApplyDetail>();

const statusTagMap: Record<string, { color: string; label: string }> = {
  PENDING: { color: 'processing', label: '待审核' },
  APPROVED: { color: 'success', label: '已通过' },
  REJECTED: { color: 'error', label: '已拒绝' },
};

const [BasicModal, modalApi] = useVbenModal({
  async onOpenChange(isOpen) {
    if (!isOpen) {
      return;
    }
    modalApi.modalLoading(true);
    try {
      const row = modalApi.getData() as { id: string };
      detail.value = await fundWalletApplyDetail(row.id);
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
  const item = statusTagMap[status] ?? { color: 'default', label: status };
  return <Tag color={item.color}>{item.label}</Tag>;
}

const basicItems = computed<DescriptionsProps['items']>(() => {
  const b = detail.value?.basicInfo;
  if (!b) {
    return [];
  }
  return [
    { label: '申请ID', content: b.id || '-' },
    { label: '用户名', content: b.username || '-' },
    { label: '账户类型', content: b.accountType || '-' },
    { label: '风险评估分', content: b.riskAssessmentScore ?? '-' },
    { label: '状态', content: renderStatus(b.status) },
    { label: '申请时间', content: b.applyTime || '-' },
    { label: '审核时间', content: b.auditTime || '-' },
    { label: '审核意见', content: b.rejectReason || '-' },
    { label: '备注', content: b.remark || '-' },
  ];
});

const securityItems = computed<DescriptionsProps['items']>(() => {
  const s = detail.value?.securityInfo;
  if (!s) {
    return [];
  }
  return [
    { label: '双因素认证', content: s.twoFactorEnabled ? '已开启' : '未开启' },
    { label: '安全评分', content: s.securityScore ?? '-' },
    { label: '实名认证', content: s.identityVerified ? '已通过' : '未通过' },
  ];
});

const loginItems = computed<DescriptionsProps['items']>(() => {
  const l = detail.value?.loginStats;
  if (!l) {
    return [];
  }
  return [
    { label: '常用登录IP', content: l.commonLoginIp || '-' },
    { label: '最近登录', content: l.lastLoginTime || '-' },
    { label: '常用登录地区', content: l.commonLoginArea || '-' },
    { label: '本月登录次数', content: l.monthLoginCount ?? '-' },
  ];
});

const flowItems = computed<DescriptionsProps['items']>(() => {
  const f = detail.value?.flowStats;
  if (!f) {
    return [];
  }
  const typeStats = f.typeStatsMap
    ? Object.entries(f.typeStatsMap)
        .map(([k, v]) => `${k}: ${v}`)
        .join('、')
    : '-';
  return [
    { label: '交易成功率', content: f.tradeSuccessRate ? `${f.tradeSuccessRate}%` : '-' },
    { label: '本月流水笔数', content: f.monthFlowCount ?? '-' },
    { label: '日均交易额', content: f.dailyAvgAmount?.toFixed(2) ?? '-' },
    { label: '本月收入', content: f.monthIncome?.toFixed(2) ?? '-' },
    { label: '本月支出', content: f.monthExpense?.toFixed(2) ?? '-' },
    { label: '类型分布', content: typeStats },
  ];
});
</script>

<template>
  <BasicModal
    :footer="false"
    :fullscreen-button="false"
    class="w-[920px]"
    title="申请详情"
  >
    <div v-if="detail" class="flex flex-col gap-4">
      <Descriptions
        bordered
        :column="2"
        :items="basicItems"
        size="small"
        title="基本信息"
      />
      <Descriptions
        bordered
        :column="3"
        :items="securityItems"
        size="small"
        title="安全认证"
      />
      <Descriptions
        bordered
        :column="2"
        :items="loginItems"
        size="small"
        title="登录统计"
      />
      <Descriptions
        bordered
        :column="2"
        :items="flowItems"
        size="small"
        title="流水统计"
      />
    </div>
  </BasicModal>
</template>
