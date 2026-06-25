<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { fundWalletApplyLoginLog } from '#/api/biz/fund/walletApply';

import { walletApplyLoginLogColumns } from './data';

const currentUserId = ref('');
const displayName = ref('用户');

const gridOptions: VxeGridProps = {
  columns: walletApplyLoginLogColumns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        if (!currentUserId.value) {
          return { rows: [], total: 0 };
        }
        return fundWalletApplyLoginLog(currentUserId.value, {
          pageNum: page.currentPage,
          pageSize: page.pageSize,
        });
      },
    },
  },
  rowConfig: { keyField: 'id' },
  id: 'fund-wallet-apply-login-log-drawer',
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

const drawerTitle = computed(() => `${displayName.value}的登录记录`);
</script>

<template>
  <BasicDrawer :title="drawerTitle" class="w-[1100px]">
    <BasicTable />
  </BasicDrawer>
</template>
