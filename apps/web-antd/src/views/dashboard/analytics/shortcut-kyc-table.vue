<script setup lang="ts">
import type { MemberKyc } from '#/api/member/kyc/model';

import { useVbenModal } from '@vben/common-ui';

import { memberKycList } from '#/api/member/kyc';
import kycAuditModal from '#/views/member/kyc/kyc-audit-modal.vue';

import { kycShortcutColumns } from './shortcut-columns';
import { useAnalyticsShortcutGrid } from './use-analytics-shortcut-grid';

const props = defineProps<{
  statisticsType: import('#/api/dashboard/model').DashboardStatisticsType;
}>();

const emit = defineEmits<{ changed: [] }>();

const { BasicTable, reload } = useAnalyticsShortcutGrid({
  columns: kycShortcutColumns,
  gridId: 'dashboard-shortcut-kyc',
  statisticsType: () => props.statisticsType,
  queryFn: (page) =>
    memberKycList({
      pageNum: page.currentPage,
      pageSize: page.pageSize,
      authStatus: 'PENDING',
    }),
});

const [KycAuditModal, kycAuditModalApi] = useVbenModal({
  connectedComponent: kycAuditModal,
});

function handleAudit(row: MemberKyc) {
  kycAuditModalApi.setData(row);
  kycAuditModalApi.open();
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
          v-access:code="['member:kyc:list']"
          @click.stop="handleAudit(row)"
        >
          审核
        </action-button>
      </table-action-space>
    </template>
  </BasicTable>
  <KycAuditModal @reload="onAuditReload" />
</template>
