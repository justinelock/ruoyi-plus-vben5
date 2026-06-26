<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { FundWalletApply } from '#/api/biz/fund/walletApply/model';

import { Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { fundWalletApplyList } from '#/api/biz/fund/walletApply';

import { columns, querySchema } from './data';
import WalletApplyAuditModal from './wallet-apply-audit-modal.vue';
import WalletApplyDetailModal from './wallet-apply-detail-modal.vue';
import WalletApplyFlowDrawer from './wallet-apply-flow-drawer.vue';
import WalletApplyLoginLogDrawer from './wallet-apply-login-log-drawer.vue';

// 1. 单行 inline 筛选 + applyTime 映射 params[beginTime/endTime]（后端读 a.created_at）
const formOptions: VbenFormProps = {
  schema: querySchema(),
  layout: 'inline',
  actionLayout: 'inline',
  compact: true,
  showCollapseButton: false,
  commonConfig: { hideLabel: true, componentProps: { allowClear: true } },
  wrapperClass: 'items-center',
  actionWrapperClass: 'pb-0 flex-shrink-0',
  resetButtonOptions: { show: false },
  submitButtonOptions: { content: '查询', variant: 'default' },
  fieldMappingTime: [
    [
      'applyTime',
      ['params[beginTime]', 'params[endTime]'],
      ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59'],
    ],
  ],
};

// 2. 分页表格
const gridOptions: VxeGridProps = {
  checkboxConfig: { highlight: true, reserve: true, trigger: 'default' },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) =>
        fundWalletApplyList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        }),
    },
  },
  headerCellConfig: { height: 44 },
  cellConfig: { height: 48 },
  rowConfig: { keyField: 'id' },
  id: 'fund-wallet-apply-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

const [DetailModal, detailModalApi] = useVbenModal({
  connectedComponent: WalletApplyDetailModal,
});

const [AuditModal, auditModalApi] = useVbenModal({
  connectedComponent: WalletApplyAuditModal,
});

const [FlowDrawer, flowDrawerApi] = useVbenDrawer({
  connectedComponent: WalletApplyFlowDrawer,
  destroyOnClose: true,
});

const [LoginLogDrawer, loginLogDrawerApi] = useVbenDrawer({
  connectedComponent: WalletApplyLoginLogDrawer,
  destroyOnClose: true,
});

function openUserDrawer(
  api: { open: () => void; setData: (d: object) => void },
  row: FundWalletApply,
) {
  api.setData({
    userId: row.userId,
    realName: row.realName,
    username: row.username,
  });
  api.open();
}

function handleView(row: FundWalletApply) {
  detailModalApi.setData({ id: row.id });
  detailModalApi.open();
}

function handleFlow(row: FundWalletApply) {
  openUserDrawer(flowDrawerApi, row);
}

function handleLoginLog(row: FundWalletApply) {
  openUserDrawer(loginLogDrawerApi, row);
}

function handleAudit(row: FundWalletApply) {
  auditModalApi.setData(row);
  auditModalApi.open();
}
function handleExport() {}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden" table-title="钱包申请">
      <template #expand-after>
        <a-button
          v-access:code="['fund:walletApply:list']"
          type="primary"
          @click="handleExport"
        >
          导出
        </a-button>
      </template>
      <template #action="{ row }">
        <table-action-space>
          <action-button
            v-access:code="['fund:walletApply:list']"
            @click.stop="handleView(row)"
          >
            详情
          </action-button>
          <action-button
            v-access:code="['fund:walletApply:list']"
            @click.stop="handleFlow(row)"
          >
            最近流水
          </action-button>
          <action-button
            v-access:code="['fund:walletApply:list']"
            @click.stop="handleLoginLog(row)"
          >
            登录记录
          </action-button>
          <action-button
            v-if="row.status === 'PENDING'"
            v-access:code="['fund:walletApply:list']"
            @click.stop="handleAudit(row)"
          >
            审核
          </action-button>
        </table-action-space>
      </template>
    </BasicTable>
    <DetailModal />
    <FlowDrawer />
    <LoginLogDrawer />
    <AuditModal @reload="tableApi.query()" />
  </Page>
</template>
