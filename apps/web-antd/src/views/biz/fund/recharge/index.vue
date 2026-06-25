<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { FundRecharge } from '#/api/biz/fund/recharge/model';

import { Page, useVbenModal } from '@vben/common-ui';

import { Popconfirm } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  fundRechargeApproved,
  fundRechargeList,
} from '#/api/biz/fund/recharge';

import { columns, querySchema } from './data';
import RechargeRejectModal from './recharge-reject-modal.vue';

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
        fundRechargeList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        }),
    },
  },
  headerCellConfig: { height: 44 },
  cellConfig: { height: 48 },
  rowConfig: { keyField: 'id' },
  id: 'fund-recharge-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

const [RejectModal, rejectModalApi] = useVbenModal({
  connectedComponent: RechargeRejectModal,
});

function canAudit(status: string) {
  return status === 'PENDING' || status === 'REVIEWING';
}

async function handleApproved(row: FundRecharge) {
  await fundRechargeApproved(row.id);
  await tableApi.query();
}

function handleReject(row: FundRecharge) {
  rejectModalApi.setData(row);
  rejectModalApi.open();
}

function handleExport() {}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden" table-title="充值管理">
      <template #expand-after>
        <a-button
          v-access:code="['fund:recharge:list']"
          type="primary"
          @click="handleExport"
        >
          导出
        </a-button>
      </template>
      <template #action="{ row }">
        <table-action-space v-if="canAudit(row.status)">
          <Popconfirm
            placement="left"
            title="确认批准该充值申请？批准后将入账到用户钱包。"
            @confirm="handleApproved(row)"
          >
            <action-button
              v-access:code="['fund:recharge:list']"
              @click.stop=""
            >
              批准
            </action-button>
          </Popconfirm>
          <action-button
            v-access:code="['fund:recharge:list']"
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
