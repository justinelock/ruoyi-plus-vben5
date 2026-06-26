<script setup lang="ts">
/** 收益订单抽屉：按 userId + positionId 分页展示 fb_fund_profit_log */
import type { VxeGridProps } from '#/adapter/vxe-table';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { investPositionOrderList } from '#/api/biz/invest/position';

import { orderColumns } from './data';

const userId = ref('');
const positionId = ref('');
const displayName = ref('用户');

const gridOptions: VxeGridProps = {
  columns: orderColumns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        // 抽屉打开时须已带入 userId、positionId
        if (!userId.value || !positionId.value) {
          return { rows: [], total: 0 };
        }
        return investPositionOrderList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          userId: userId.value,
          positionId: positionId.value,
        });
      },
    },
  },
  rowConfig: { keyField: 'id' },
  id: 'invest-position-profit-order-drawer',
};

const [BasicTable, tableApi] = useVbenVxeGrid({ gridOptions });

const [BasicDrawer, drawerApi] = useVbenDrawer({
  async onOpenChange(isOpen) {
    if (isOpen) {
      // 从父页带入 userId、positionId 后刷新表格
      const data = drawerApi.getData() as {
        positionId?: string;
        realName?: string;
        userId?: string;
        username?: string;
      };
      userId.value = data.userId ?? '';
      positionId.value = data.positionId ?? '';
      displayName.value =
        data.realName?.trim() || data.username?.trim() || '用户';
      await tableApi.reload();
    } else {
      userId.value = '';
      positionId.value = '';
      displayName.value = '用户';
    }
  },
});

const drawerTitle = computed(() => `${displayName.value}的收益订单`);
</script>

<template>
  <BasicDrawer :title="drawerTitle" class="w-[900px]">
    <BasicTable />
  </BasicDrawer>
</template>
