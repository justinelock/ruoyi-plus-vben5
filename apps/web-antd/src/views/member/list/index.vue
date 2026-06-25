<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { MenuProps } from 'antdv-next';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { MemberUser } from '#/api/member/user/model';

import { computed, ref } from 'vue';

import { useAccess } from '@vben/access';
import { Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { Dropdown, Popconfirm, Space, Tag } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  memberUserList,
  memberUserRemove,
  memberUserStats,
} from '#/api/member/user';

import { createColumns, querySchema } from './data';
import userResetPwdModal from './user-reset-pwd-modal.vue';
import UserWalletDrawer from './user-wallet-drawer.vue';

/** 是否查看已删用户（切换后重新查询） */
const showDeleted = ref(false);

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
          deleted: showDeleted.value ? '1' : '0',
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

const [UserResetPwdModal, userResetPwdModalApi] = useVbenModal({
  connectedComponent: userResetPwdModal,
});

function handleEdit(_row: MemberUser) {
  // 编辑抽屉待业务接口就绪后接入
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

function handleToggleDeleted() {
  showDeleted.value = !showDeleted.value;
  tableApi.reload();
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
          :type="showDeleted ? 'primary' : 'default'"
          @click="handleToggleDeleted"
        >
          已删用户
        </a-button>
      </template>
      <template #action="{ row }">
        <Space>
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
        </Space>
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
      </template>
    </BasicTable>
    <WalletDrawer />
    <UserResetPwdModal @reload="tableApi.query()" />
  </Page>
</template>
