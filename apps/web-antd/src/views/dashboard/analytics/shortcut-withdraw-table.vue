<script setup lang="ts">
import type { FundWithdraw } from '#/api/biz/fund/withdraw/model';

import { useVbenModal } from '@vben/common-ui';

import { Popconfirm } from 'antdv-next';

import {
  fundWithdrawApproved,
  fundWithdrawList,
} from '#/api/biz/fund/withdraw';
import WithdrawRejectModal from '#/views/biz/fund/withdraw/withdraw-reject-modal.vue';

import { withdrawShortcutColumns } from './shortcut-columns';
import { useAnalyticsShortcutGrid } from './use-analytics-shortcut-grid';

const props = defineProps<{
  statisticsType: import('#/api/dashboard/model').DashboardStatisticsType;
}>();

const emit = defineEmits<{ changed: [] }>();

const { BasicTable, reload } = useAnalyticsShortcutGrid({
  columns: withdrawShortcutColumns,
  gridId: 'dashboard-shortcut-withdraw',
  statisticsType: () => props.statisticsType,
  queryFn: (page) =>
    fundWithdrawList({
      pageNum: page.currentPage,
      pageSize: page.pageSize,
      status: 'PENDING',
    }),
});

const [RejectModal, rejectModalApi] = useVbenModal({
  connectedComponent: WithdrawRejectModal,
});

async function handleApproved(row: FundWithdraw) {
  await fundWithdrawApproved(row.id);
  await reload();
  emit('changed');
}

function handleReject(row: FundWithdraw) {
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
      <table-action-space v-if="row.status === 'PENDING'">
        <Popconfirm
          placement="left"
          title="确认批准该提现申请？"
          @confirm="handleApproved(row)"
        >
          <action-button v-access:code="['fund:withdraw:list']" @click.stop="">
            批准
          </action-button>
        </Popconfirm>
        <action-button
          v-access:code="['fund:withdraw:list']"
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
