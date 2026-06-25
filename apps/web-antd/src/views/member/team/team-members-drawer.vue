<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { memberTeamMembers } from '#/api/member/team';

import { teamMemberColumns } from './data';

const currentUserId = ref('');
/** 抽屉标题：真实姓名优先，否则用户名 */
const displayName = ref('用户');

const gridOptions: VxeGridProps = {
  columns: teamMemberColumns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        if (!currentUserId.value) {
          return { rows: [], total: 0 };
        }
        return memberTeamMembers(currentUserId.value, {
          pageNum: page.currentPage,
          pageSize: page.pageSize,
        });
      },
    },
  },
  rowConfig: { keyField: 'username' },
  id: 'member-team-members-drawer',
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

const drawerTitle = computed(() => `${displayName.value}的团队成员`);
</script>

<template>
  <BasicDrawer :title="drawerTitle" class="w-[1000px]">
    <BasicTable />
  </BasicDrawer>
</template>
