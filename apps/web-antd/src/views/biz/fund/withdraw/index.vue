<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { FundWithdraw } from '#/api/biz/fund/withdraw/model';

import { Page, useVbenModal } from '@vben/common-ui';

import { Popconfirm } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  fundWithdrawApproved,
  fundWithdrawList,
} from '#/api/biz/fund/withdraw';

import { columns, querySchema } from './data';
import WithdrawRejectModal from './withdraw-reject-modal.vue';

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
      'createTime',
      ['params[beginTime]', 'params[endTime]'],
      ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59'],
    ],
  ],
};

const gridOptions: VxeGridProps = {
  checkboxConfig: { highlight: true, reserve: true, trigger: 'default' },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) =>
        fundWithdrawList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        }),
    },
  },
  headerCellConfig: { height: 44 },
  cellConfig: { height: 48 },
  rowConfig: { keyField: 'id' },
  id: 'fund-withdraw-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

const [RejectModal, rejectModalApi] = useVbenModal({
  connectedComponent: WithdrawRejectModal,
});

async function handleApproved(row: FundWithdraw) {
  await fundWithdrawApproved(row.id);
  await tableApi.query();
}

function handleReject(row: FundWithdraw) {
  rejectModalApi.setData(row);
  rejectModalApi.open();
}

function handleExport() {}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden" table-title="提现管理">
      <template #expand-after>
        <a-button
          v-access:code="['fund:withdraw:list']"
          type="primary"
          @click="handleExport"
        >
          导出
        </a-button>
      </template>
      <template #action="{ row }">
        <table-action-space v-if="row.status === 'PENDING'">
          <Popconfirm
            placement="left"
            title="确认批准该提现申请？"
            @confirm="handleApproved(row)"
          >
            <action-button
              v-access:code="['fund:withdraw:list']"
              @click.stop=""
            >
              批准
            </action-button>
          </Popconfirm>
          <action-button
            v-access:code="['fund:withdraw:list']"
            danger
            @click.stop="handleReject(row)"
          >
            拒绝
          </action-button>
        </table-action-space>
      </template>
    </BasicTable>
    <RejectModal @reload="tableApi.query()" />
  </Page>
</template>
