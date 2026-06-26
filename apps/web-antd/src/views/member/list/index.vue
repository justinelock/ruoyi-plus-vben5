<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { MenuProps } from 'antdv-next';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { MemberUser } from '#/api/member/user/model';

import { computed, ref } from 'vue';

import { useAccess } from '@vben/access';
import { Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { Dropdown, Popconfirm, Tag } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  memberUserList,
  memberUserRemove,
  memberUserStats,
} from '#/api/member/user';

import { createColumns, querySchema } from './data';
import deletedUsersDrawer from './deleted-users-drawer.vue';
import userEditDrawer from './user-edit-drawer.vue';
import userResetPwdModal from './user-reset-pwd-modal.vue';
import UserWalletDrawer from './user-wallet-drawer.vue';

/** 标题 Tag：近 5 分钟全局活跃用户数 */
const totalActiveSessions = ref(0);

async function loadActiveSessions() {
  const stats = await memberUserStats();
  totalActiveSessions.value = stats.totalActiveSessions ?? 0;
}

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

const [WalletDrawer, walletDrawerApi] = useVbenDrawer({
  connectedComponent: UserWalletDrawer,
  destroyOnClose: true,
});

function handleOpenWallet(row: MemberUser) {
  walletDrawerApi.setData({
    userId: row.id,
    username: row.username,
    realName: row.realName,
  });
  walletDrawerApi.open();
}

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    highlight: true,
    reserve: true,
    trigger: 'default',
  },
  columns: createColumns({ onOpenWallet: handleOpenWallet }),
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        const params = {
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          deleted: '0',
          ...formValues,
        };
        const [listResp] = await Promise.all([
          memberUserList(params),
          loadActiveSessions(),
        ]);
        return listResp;
      },
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
  id: 'member-user-list-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [UserEditDrawer, userEditDrawerApi] = useVbenDrawer({
  connectedComponent: userEditDrawer,
  destroyOnClose: true,
});

const [DeletedUsersDrawer, deletedUsersDrawerApi] = useVbenDrawer({
  connectedComponent: deletedUsersDrawer,
  destroyOnClose: true,
});

const [UserResetPwdModal, userResetPwdModalApi] = useVbenModal({
  connectedComponent: userResetPwdModal,
});

function handleEdit(row: MemberUser) {
  userEditDrawerApi.setData({ id: row.id });
  userEditDrawerApi.open();
}

async function handleDelete(row: MemberUser) {
  await memberUserRemove([row.id]);
  await tableApi.query();
}

function handleResetPwd(row: MemberUser) {
  userResetPwdModalApi.setData({ record: row });
  userResetPwdModalApi.open();
}

function handleExport() {
  // 导出待业务接口就绪后接入
}

async function handleOpenDeleted() {
  const query = await tableApi.formApi.getValues();
  deletedUsersDrawerApi.setData({ query });
  deletedUsersDrawerApi.open();
}

const { hasAccessByCodes } = useAccess();
const menuItems = computed(() => {
  const items: MenuProps['items'] = [];
  if (hasAccessByCodes(['member:list:list'])) {
    items.push({ key: 'resetPwd', label: '重置密码' });
  }
  return items;
});

function handleMenuClick(key: string, row: MemberUser) {
  if (key === 'resetPwd') {
    handleResetPwd(row);
  }
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden">
      <template #table-title>
        <div class="flex items-center gap-2 text-[1rem] font-bold">
          <span>用户列表</span>
          <Tag color="processing">活跃用户:{{ totalActiveSessions }}</Tag>
        </div>
      </template>
      <template #expand-after>
        <a-button
          v-access:code="['member:list:list']"
          type="primary"
          @click="handleExport"
        >
          导出
        </a-button>
        <a-button
          v-access:code="['member:list:list']"
          @click="handleOpenDeleted"
        >
          已删用户
        </a-button>
      </template>
      <template #action="{ row }">
        <table-action-space>
          <action-button
            v-access:code="['member:list:list']"
            @click.stop="handleEdit(row)"
          >
            {{ $t('pages.common.edit') }}
          </action-button>
          <Popconfirm
            placement="left"
            title="确认删除？"
            @confirm="handleDelete(row)"
          >
            <action-button
              danger
              v-access:code="['member:list:list']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </action-button>
          </Popconfirm>

          <Dropdown
            placement="bottomRight"
            :menu="{
              items: menuItems,
              onClick: (info) => handleMenuClick(String(info.key), row),
            }"
          >
            <a-button size="small" type="link">
              {{ $t('pages.common.more') }}
            </a-button>
          </Dropdown>
        </table-action-space>
      </template>
    </BasicTable>
    <WalletDrawer />
    <UserEditDrawer @reload="tableApi.query()" />
    <DeletedUsersDrawer @reload="tableApi.query()" />
    <UserResetPwdModal @reload="tableApi.query()" />
  </Page>
</template>
