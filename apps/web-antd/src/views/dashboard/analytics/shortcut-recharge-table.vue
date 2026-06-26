<script setup lang="ts">
import type { FundRecharge } from '#/api/biz/fund/recharge/model';

import { useVbenModal } from '@vben/common-ui';

import { Popconfirm } from 'antdv-next';

import {
  fundRechargeApproved,
  fundRechargeList,
} from '#/api/biz/fund/recharge';
import RechargeRejectModal from '#/views/biz/fund/recharge/recharge-reject-modal.vue';

import { rechargeShortcutColumns } from './shortcut-columns';
import { useAnalyticsShortcutGrid } from './use-analytics-shortcut-grid';

const props = defineProps<{
  statisticsType: import('#/api/dashboard/model').DashboardStatisticsType;
}>();

const emit = defineEmits<{ changed: [] }>();

const { BasicTable, reload } = useAnalyticsShortcutGrid({
  columns: rechargeShortcutColumns,
  gridId: 'dashboard-shortcut-recharge',
  statisticsType: () => props.statisticsType,
  // 待审；REVIEWING 走充值管理全页（后端单 status 条件）
  queryFn: (page) =>
    fundRechargeList({
      pageNum: page.currentPage,
      pageSize: page.pageSize,
      status: 'PENDING',
    }),
});

const [RejectModal, rejectModalApi] = useVbenModal({
  connectedComponent: RechargeRejectModal,
});

function canAudit(status: string) {
  return status === 'PENDING' || status === 'REVIEWING';
}

async function handleApproved(row: FundRecharge) {
  await fundRechargeApproved(row.id);
  await reload();
  emit('changed');
}

function handleReject(row: FundRecharge) {
  rejectModalApi.setData(row);
  rejectModalApi.open();
}

async function onRejectReload() {
  await reload();
  emit('changed');
}

defineExpose({ reload });
</script>

<template>
  <BasicTable class="overflow-hidden">
    <template #action="{ row }">
      <table-action-space v-if="canAudit(row.status)">
        <Popconfirm
          placement="left"
          title="确认批准该充值申请？"
          @confirm="handleApproved(row)"
        >
          <action-button v-access:code="['fund:recharge:list']" @click.stop="">
            批准
          </action-button>
        </Popconfirm>
        <action-button
          v-access:code="['fund:recharge:list']"
          danger
          @click.stop="handleReject(row)"
        >
          拒绝
        </action-button>
      </table-action-space>
    </template>
  </BasicTable>
  <RejectModal @reload="onRejectReload" />
</template>
