<script setup lang="ts">
import type { FundWalletApply } from '#/api/biz/fund/walletApply/model';

import { useVbenModal } from '@vben/common-ui';

import { fundWalletApplyList } from '#/api/biz/fund/walletApply';
import WalletApplyAuditModal from '#/views/biz/fund/walletApply/wallet-apply-audit-modal.vue';

import { walletShortcutColumns } from './shortcut-columns';
import { useAnalyticsShortcutGrid } from './use-analytics-shortcut-grid';

const props = defineProps<{
  statisticsType: import('#/api/dashboard/model').DashboardStatisticsType;
}>();

const emit = defineEmits<{ changed: [] }>();

const { BasicTable, reload } = useAnalyticsShortcutGrid({
  columns: walletShortcutColumns,
  gridId: 'dashboard-shortcut-wallet',
  statisticsType: () => props.statisticsType,
  queryFn: (page) =>
    fundWalletApplyList({
      pageNum: page.currentPage,
      pageSize: page.pageSize,
      status: 'PENDING',
    }),
});

const [AuditModal, auditModalApi] = useVbenModal({
  connectedComponent: WalletApplyAuditModal,
});

function handleAudit(row: FundWalletApply) {
  auditModalApi.setData(row);
  auditModalApi.open();
}

async function onAuditReload() {
  await reload();
  emit('changed');
}

defineExpose({ reload });
</script>

<template>
  <BasicTable class="overflow-hidden">
    <template #action="{ row }">
      <table-action-space v-if="row.status === 'PENDING'">
        <action-button
          v-access:code="['fund:walletApply:list']"
          @click.stop="handleAudit(row)"
        >
          审核
        </action-button>
      </table-action-space>
    </template>
  </BasicTable>
  <AuditModal @reload="onAuditReload" />
</template>
