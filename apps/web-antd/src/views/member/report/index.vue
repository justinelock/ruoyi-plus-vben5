<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { MemberReport } from '#/api/member/report/model';

import { useVbenDrawer } from '@vben/common-ui';
import { Page } from '@vben/common-ui';

import { Space } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { memberReportList } from '#/api/member/report';

import ReportFlowDrawer from './report-flow-drawer.vue';
import { columns, querySchema } from './data';

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
        memberReportList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        }),
    },
  },
  headerCellConfig: { height: 44 },
  cellConfig: { height: 48 },
  rowConfig: { keyField: 'id' },
  id: 'member-report-index',
};

const [BasicTable] = useVbenVxeGrid({ formOptions, gridOptions });

const [FlowDrawer, flowDrawerApi] = useVbenDrawer({
  connectedComponent: ReportFlowDrawer,
  destroyOnClose: true,
});

/** 打开流水抽屉：按 userId 分页拉取 fb_account_flow_records */
function handleViewFlow(row: MemberReport) {
  flowDrawerApi.setData({
    userId: row.userId,
    realName: row.realName,
    username: row.username,
  });
  flowDrawerApi.open();
}

function handleExport() {}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden" table-title="用户报表">
      <template #expand-after>
        <a-button
          v-access:code="['member:report:list']"
          type="primary"
          @click="handleExport"
        >
          导出
        </a-button>
      </template>
      <template #action="{ row }">
        <table-action-space>
          <action-button
            v-access:code="['member:report:list']"
            @click.stop="handleViewFlow(row)"
          >
            查看流水
          </action-button>
        </table-action-space>
      </template>
    </BasicTable>
    <FlowDrawer />
  </Page>
</template>
