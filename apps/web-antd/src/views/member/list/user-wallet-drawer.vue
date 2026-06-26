<script setup lang="ts">
import type { MemberWallet } from '#/api/member/wallet/model';
import type { TableColumnsType } from 'antdv-next';

import { ref } from 'vue';

import { useVbenDrawer, useVbenModal } from '@vben/common-ui';

import { Table } from 'antdv-next';

import { memberWalletList } from '#/api/member/wallet';

import type { WalletActionType } from './wallet-action-data';
import WalletActionModal from './wallet-action-modal.vue';

const filterKeyword = ref('');
const filterUserId = ref('');
const loading = ref(false);
const walletRows = ref<MemberWallet[]>([]);
const drawerTitle = ref('用户钱包');

const [WalletActionModalComp, walletActionModalApi] = useVbenModal({
  connectedComponent: WalletActionModal,
});

/** 打开合并操作弹窗（±款、开/关账户等单按钮入口） */
function handleOpenWalletAction(
  actionType: WalletActionType,
  row: MemberWallet,
) {
  walletActionModalApi.setData({ actionType, wallet: row });
  walletActionModalApi.open();
}

function formatAmount(value?: number) {
  if (value === null || value === undefined) {
    return '0.00';
  }
  return Number(value).toFixed(2);
}

/** 手动请求钱包列表，避免抽屉内 VxeGrid proxy reload 触发 commitProxy 错误 */
async function loadWalletRows() {
  if (!filterKeyword.value && !filterUserId.value) {
    walletRows.value = [];
    return;
  }
  loading.value = true;
  try {
    const resp = await memberWalletList({
      pageNum: 1,
      pageSize: 10,
      keyword: filterKeyword.value,
      userId: filterUserId.value,
    });
    walletRows.value = resp.rows ?? [];
  } finally {
    loading.value = false;
  }
}

/** 抽屉右上角刷新按钮：沿用当前 userId/keyword 重新加载 */
async function handleRefresh() {
  await loadWalletRows();
}

const walletColumns: TableColumnsType<MemberWallet> = [
  { dataIndex: 'accountType', key: 'accountType', title: '钱包类型' },
  { dataIndex: 'balance', key: 'balance', title: '可用余额' },
  { dataIndex: 'frozenAmount', key: 'frozenAmount', title: '冻结金额' },
  { dataIndex: 'drawTicket', key: 'drawTicket', title: '券数量' },
  { dataIndex: 'currency', key: 'currency', title: '货币' },
  {
    key: 'action',
    title: '操作',
    width: 300,
  },
];

const [BasicDrawer, drawerApi] = useVbenDrawer({
  async onOpenChange(isOpen) {
    if (isOpen) {
      const { realName, userId, username } = drawerApi.getData() as {
        realName?: string;
        userId?: string;
        username?: string;
      };
      // 用户列表点击余额后透传 userId；username 作为 keyword 兼容旧查询口径
      filterUserId.value = userId || '';
      filterKeyword.value = username || '';
      drawerTitle.value =
        realName || username ? `${realName || username}的钱包` : '用户钱包';
      await loadWalletRows();
    } else {
      filterUserId.value = '';
      filterKeyword.value = '';
      walletRows.value = [];
      drawerTitle.value = '用户钱包';
    }
  },
});
</script>

<template>
  <BasicDrawer :title="drawerTitle" class="w-[980px]">
    <template #extra>
      <a-button size="small" @click="handleRefresh">刷新</a-button>
    </template>
    <Table
      :columns="walletColumns"
      :data-source="walletRows"
      :loading="loading"
      :pagination="false"
      row-key="id"
      size="small"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'balance'">
          {{ formatAmount(record.balance) }}
        </template>
        <template v-else-if="column.key === 'frozenAmount'">
          {{ formatAmount(record.frozenAmount) }}
        </template>
        <template v-else-if="column.key === 'drawTicket'">
          {{ record.drawTicket ?? 0 }}
        </template>
        <template v-else-if="column.key === 'action'">
          <table-action-space class="py-2" wrap>
            <a-button
              size="small"
              type="link"
              @click="handleOpenWalletAction('balance', record)"
            >
              ±款
            </a-button>
            <a-button
              size="small"
              type="link"
              @click="handleOpenWalletAction('account', record)"
            >
              开/关账户
            </a-button>
            <a-button
              size="small"
              type="link"
              @click="handleOpenWalletAction('frozen', record)"
            >
              冻/解金额
            </a-button>
            <a-button
              size="small"
              type="link"
              @click="handleOpenWalletAction('ticket', record)"
            >
              ±抽奖券
            </a-button>
            <a-button
              size="small"
              type="link"
              @click="handleOpenWalletAction('transfer', record)"
            >
              划转
            </a-button>
          </table-action-space>
        </template>
      </template>
    </Table>
    <WalletActionModalComp @reload="loadWalletRows" />
  </BasicDrawer>
</template>
