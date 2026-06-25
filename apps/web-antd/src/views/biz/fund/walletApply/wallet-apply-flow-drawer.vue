<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { fundWalletApplyCurrentMonthFlow } from '#/api/biz/fund/walletApply';

import { walletApplyFlowColumns } from './data';

const currentUserId = ref('');
/** 抽屉标题：真实姓名优先，否则用户名 */
const displayName = ref('用户');

const gridOptions: VxeGridProps = {
  columns: walletApplyFlowColumns,
  height: 'auto',
  keepSource: true,
  pagerConfig: { enabled: false },
  proxyConfig: {
    ajax: {
      query: async () => {
        if (!currentUserId.value) {
          return { rows: [], total: 0 };
        }
        return fundWalletApplyCurrentMonthFlow(currentUserId.value);
      },
    },
  },
  rowConfig: { keyField: 'id' },
  id: 'fund-wallet-apply-flow-drawer',
};

const [BasicTable, tableApi] = useVbenVxeGrid({ gridOptions });

const [BasicDrawer, drawerApi] = useVbenDrawer({
  async onOpenChange(isOpen) {
    if (isOpen) {
      const data = drawerApi.getData() as {
        userId?: string;
        realName?: string;
        username?: string;
      };
      currentUserId.value = data.userId ?? '';
      displayName.value =
        data.realName?.trim() || data.username?.trim() || '用户';
      await tableApi.reload();
    } else {
      currentUserId.value = '';
      displayName.value = '用户';
    }
  },
});

const drawerTitle = computed(() => `${displayName.value}的最近流水`);
</script>

<template>
  <BasicDrawer :title="drawerTitle" class="w-[1100px]">
    <BasicTable />
  </BasicDrawer>
</template>
