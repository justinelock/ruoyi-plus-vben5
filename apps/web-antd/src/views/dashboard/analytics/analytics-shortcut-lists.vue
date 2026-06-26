<script setup lang="ts">
import type { DashboardStatisticsType } from '#/api/dashboard/model';

import { Card } from 'antdv-next';

import ShortcutKycTable from './shortcut-kyc-table.vue';
import ShortcutRechargeTable from './shortcut-recharge-table.vue';
import ShortcutWalletTable from './shortcut-wallet-table.vue';
import ShortcutWithdrawTable from './shortcut-withdraw-table.vue';

defineProps<{
  statisticsType: DashboardStatisticsType;
}>();

const emit = defineEmits<{ changed: [] }>();

function handleChanged() {
  emit('changed');
}
</script>

<template>
  <div class="mt-5 flex flex-col gap-4">
    <Card size="small" title="实名认证">
      <ShortcutKycTable
        :statistics-type="statisticsType"
        @changed="handleChanged"
      />
    </Card>
    <Card size="small" title="钱包申请">
      <ShortcutWalletTable
        :statistics-type="statisticsType"
        @changed="handleChanged"
      />
    </Card>
    <Card size="small" title="充值申请">
      <ShortcutRechargeTable
        :statistics-type="statisticsType"
        @changed="handleChanged"
      />
    </Card>
    <Card size="small" title="提现申请">
      <ShortcutWithdrawTable
        :statistics-type="statisticsType"
        @changed="handleChanged"
      />
    </Card>
  </div>
</template>

<style scoped>
:deep(.ant-card-body) {
  padding-top: 8px;
}
</style>
