<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { MemberUser } from '#/api/member/user/model';

import { useVbenDrawer } from '@vben/common-ui';

import { Popconfirm } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { memberUserList, memberUserRestore } from '#/api/member/user';

import { createColumns, querySchema } from './data';

const emit = defineEmits<{ reload: [] }>();

const formOptions: VbenFormProps = {
  schema: querySchema(),
  layout: 'inline',
  actionLayout: 'inline',
  compact: true,
  showCollapseButton: false,
  commonConfig: {
    hideLabel: true,
    componentProps: {
      allowClear: true,
    },
  },
  wrapperClass: 'items-center',
  actionWrapperClass: 'pb-0 flex-shrink-0',
  resetButtonOptions: {
    show: false,
  },
  submitButtonOptions: {
    content: '查询',
    variant: 'default',
  },
  fieldMappingTime: [
    [
      'createTime',
      ['params[beginTime]', 'params[endTime]'],
      ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59'],
    ],
  ],
};

const gridOptions: VxeGridProps = {
  columns: createColumns({ onOpenWallet: () => {} }, { deletedList: true }),
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) =>
        memberUserList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          deleted: '1',
          ...formValues,
        }),
    },
  },
  headerCellConfig: {
    height: 44,
  },
  cellConfig: {
    height: 48,
  },
  rowConfig: {
    keyField: 'id',
  },
  id: 'member-user-deleted-drawer',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [BasicDrawer, drawerApi] = useVbenDrawer({
  async onOpenChange(isOpen) {
    if (!isOpen) {
      return;
    }
    const { query } = drawerApi.getData() as {
      query?: Record<string, unknown>;
    };
    if (query && Object.keys(query).length > 0) {
      await tableApi.formApi.setValues(query);
      tableApi.formApi.setLatestSubmissionValues(query);
    }
    await tableApi.reload();
  },
});

async function handleRestore(row: MemberUser) {
  await memberUserRestore([row.id]);
  await tableApi.query();
  emit('reload');
}
</script>

<template>
  <BasicDrawer class="w-[1100px]" title="已删除用户列表">
    <BasicTable>
      <template #action="{ row }">
        <table-action-space>
          <Popconfirm
            placement="left"
            title="确认恢复该用户？"
            @confirm="handleRestore(row)"
          >
            <action-button
              v-access:code="['member:list:list']"
              @click.stop=""
            >
              恢复
            </action-button>
          </Popconfirm>
        </table-action-space>
      </template>
    </BasicTable>
  </BasicDrawer>
</template>
