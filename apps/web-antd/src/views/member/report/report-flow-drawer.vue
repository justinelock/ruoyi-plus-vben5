<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { memberReportFlow } from '#/api/member/report';

import { flowColumns } from './data';

const currentUserId = ref('');

const gridOptions: VxeGridProps = {
  columns: flowColumns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        if (!currentUserId.value) {
          return { rows: [], total: 0 };
        }
        return memberReportFlow(currentUserId.value, {
          pageNum: page.currentPage,
          pageSize: page.pageSize,
        });
      },
    },
  },
  rowConfig: { keyField: 'id' },
  id: 'member-report-flow-drawer',
};

const [BasicTable, tableApi] = useVbenVxeGrid({ gridOptions });

const [BasicDrawer, drawerApi] = useVbenDrawer({
  async onOpenChange(isOpen) {
    if (isOpen) {
      const { userId } = drawerApi.getData() as { userId?: string };
      currentUserId.value = userId ?? '';
      await tableApi.reload();
    } else {
      currentUserId.value = '';
    }
  },
});

const drawerTitle = computed(() => {
  const { realName } = drawerApi.getData() as { realName?: string };
  return realName ? `${realName}的流水记录` : '流水记录';
});
</script>

<template>
  <BasicDrawer :title="drawerTitle" class="w-[900px]">
    <BasicTable />
  </BasicDrawer>
</template>
