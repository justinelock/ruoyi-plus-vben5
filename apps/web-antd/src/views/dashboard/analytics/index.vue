<script lang="ts" setup>
import type { AnalysisOverviewItem } from '@vben/common-ui';
import type { TabOption } from '@vben/types';

import type { DashboardStatisticsType } from '#/api/dashboard/model';

import { onMounted, ref, watch } from 'vue';

import {
  AnalysisChartCard,
  AnalysisChartsTabs,
  AnalysisOverview,
} from '@vben/common-ui';
import {
  SvgBellIcon,
  SvgCakeIcon,
  SvgCardIcon,
  SvgDownloadIcon,
} from '@vben/icons';

import { RadioGroup, Spin, Tag } from 'antdv-next';

import { dashboardStatistics } from '#/api/dashboard';
import { memberUserStats } from '#/api/member/user';

import AnalyticsShortcutLists from './analytics-shortcut-lists.vue';
import AnalyticsTrends from './analytics-trends.vue';
import AnalyticsVisitsData from './analytics-visits-data.vue';
import AnalyticsVisitsSales from './analytics-visits-sales.vue';
import AnalyticsVisitsSource from './analytics-visits-source.vue';
import AnalyticsVisits from './analytics-visits.vue';

/** 时间维度选项，与 Java type 一致 */
const statisticsTypeOptions = [
  { label: '今日', value: 0 },
  { label: '本周', value: 1 },
  { label: '本月', value: 2 },
];

const statisticsType = ref<DashboardStatisticsType>(0); // 默认今日，与产品入口一致
const loading = ref(false);
/** 在线用户数（Redis online:user:*，与用户列表 stats 同源） */
const totalOnlineUsers = ref(0);
const overviewItems = ref<AnalysisOverviewItem[]>(buildOverviewItems());

/** 将接口数据映射为 AnalysisOverview 四卡 */
function buildOverviewItems(
  data?: Partial<{
    pendingUserCount: number;
    verifiedUserCount: number;
    pendingUserWalletCount: number;
    approvedUserWalletCount: number;
    depositCount: number;
    depositSum: number;
    withdrawCount: number;
    withdrawSum: number;
  }>,
): AnalysisOverviewItem[] {
  return [
    {
      icon: SvgCardIcon,
      title: '实名认证',
      totalTitle: '已通过',
      value: data?.pendingUserCount ?? 0,
      totalValue: data?.verifiedUserCount ?? 0,
    },
    {
      icon: SvgCakeIcon,
      title: '钱包申请',
      totalTitle: '已通过',
      value: data?.pendingUserWalletCount ?? 0,
      totalValue: data?.approvedUserWalletCount ?? 0,
    },
    {
      icon: SvgDownloadIcon,
      title: '充值申请',
      totalTitle: '成功金额',
      value: data?.depositCount ?? 0,
      totalValue: data?.depositSum ?? 0,
      valueTone: 'success',
      totalValuePrefix: '$ ',
      totalValueDecimals: 2,
    },
    {
      icon: SvgBellIcon,
      title: '提现申请',
      totalTitle: '成功金额',
      value: data?.withdrawCount ?? 0,
      totalValue: data?.withdrawSum ?? 0,
      valueTone: 'danger',
      totalValuePrefix: '-$ ',
    },
  ];
}

/** 拉取在线用户统计（复用 GET /member/user/stats） */
async function loadOnlineUsers() {
  try {
    const stats = await memberUserStats();
    totalOnlineUsers.value = stats.totalOnlineUsers ?? 0;
  } catch {
    // 统计失败不阻断分析页主流程
    totalOnlineUsers.value = 0;
  }
}

/** 拉取仪表盘统计并刷新四卡 */
async function loadStatistics() {
  loading.value = true;
  try {
    const data = await dashboardStatistics(statisticsType.value);
    overviewItems.value = buildOverviewItems(data);
  } catch {
    window.message.error('加载分析页统计失败');
  } finally {
    loading.value = false;
  }
}

watch(statisticsType, () => loadStatistics(), { immediate: true });

onMounted(() => {
  loadOnlineUsers();
});

const chartTabs: TabOption[] = [
  {
    label: '流量趋势',
    value: 'trends',
  },
  {
    label: '月访问量',
    value: 'visits',
  },
];
</script>

<template>
  <div class="p-5">
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
      <span class="text-base font-medium">业务概览</span>
      <div class="flex flex-wrap items-center gap-2">
        <Tag color="processing" size="small"
          >在线用户:{{ totalOnlineUsers }}</Tag
        >
        <RadioGroup
          v-model:value="statisticsType"
          class="analytics-statistics-type"
          :options="statisticsTypeOptions"
          button-style="solid"
          option-type="button"
          size="small"
        />
      </div>
    </div>
    <Spin :spinning="loading">
      <AnalysisOverview compact :items="overviewItems" />
    </Spin>
    <AnalyticsShortcutLists
      :statistics-type="statisticsType"
      @changed="loadStatistics"
    />
    <AnalysisChartsTabs :tabs="chartTabs" class="mt-5">
      <template #trends>
        <AnalyticsTrends />
      </template>
      <template #visits>
        <AnalyticsVisits />
      </template>
    </AnalysisChartsTabs>

    <div class="mt-5 w-full md:flex">
      <AnalysisChartCard class="mt-5 md:mt-0 md:mr-4 md:w-1/3" title="访问数量">
        <AnalyticsVisitsData />
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-5 md:mt-0 md:mr-4 md:w-1/3" title="访问来源">
        <AnalyticsVisitsSource />
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-5 md:mt-0 md:w-1/3" title="访问来源">
        <AnalyticsVisitsSales />
      </AnalysisChartCard>
    </div>
  </div>
</template>

<style scoped>
/* 与 small Tag 视觉对齐：略收紧按钮组高度 */
.analytics-statistics-type :deep(.ant-radio-button-wrapper) {
  height: 22px;
  padding-inline: 10px;
  font-size: 12px;
  line-height: 20px;
}
</style>
