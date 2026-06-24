<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { FundStatement } from '#/api/biz/fund/statement/model';

import { Page } from '@vben/common-ui';

import { Space } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { fundStatementList } from '#/api/biz/fund/statement';

import { columns, querySchema } from './data';

// 1. 单行 inline 筛选 + tradeTime 时间范围映射（对接 GET /fund/statement/list）
const formOptions: VbenFormProps = {
  schema: querySchema(),
  layout: 'inline',
  actionLayout: 'inline',
  compact: true,
  showCollapseButton: false,
  commonConfig: { hideLabel: true, componentProps: { allowClear: true } },
  wrapperClass: 'items-center flex-wrap',
  actionWrapperClass: 'pb-0 flex-shrink-0',
  resetButtonOptions: { show: false },
  submitButtonOptions: { content: '查询', variant: 'default' },
  fieldMappingTime: [
    [
      'tradeTime',
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
        fundStatementList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        }),
    },
  },
  headerCellConfig: { height: 44 },
  cellConfig: { height: 48 },
  rowConfig: { keyField: 'id' },
  id: 'fund-statement-index',
};

const [BasicTable] = useVbenVxeGrid({ formOptions, gridOptions });

function handleView(_row: FundStatement) {}
function handleExport() {}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden" table-title="账户流水">
      <template #expand-after>
        <a-button
          v-access:code="['fund:statement:list']"
          type="primary"
          @click="handleExport"
        >
          导出
        </a-button>
      </template>
      <template #action="{ row }">
        <Space>
          <action-button
            v-access:code="['fund:statement:list']"
            @click.stop="handleView(row)"
          >
            详情
          </action-button>
        </Space>
      </template>
    </BasicTable>
  </Page>
</template>
