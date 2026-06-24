<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { memberLoginLogList } from '#/api/member/loginLog';

import { columns, querySchema } from './data';

// 1. 单行 inline 筛选 + loginTime 时间范围映射（对接 GET /member/loginLog/list）
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
};

// 2. 分页表格
const gridOptions: VxeGridProps = {
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) =>
        memberLoginLogList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        }),
    },
  },
  headerCellConfig: { height: 44 },
  cellConfig: { height: 48 },
  rowConfig: { keyField: 'id' },
  id: 'member-login-log-index',
};

const [BasicTable] = useVbenVxeGrid({ formOptions, gridOptions });

function handleExport() {}
function handleSameIpCheck() {}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden" table-title="登录记录">
      <template #expand-after>
        <a-button
          v-access:code="['member:loginLog:list']"
          type="primary"
          @click="handleExport"
        >
          导出
        </a-button>
        <a-button
          v-access:code="['member:loginLog:list']"
          type="primary"
          class="!border-amber-500 !bg-amber-500 hover:!border-amber-600 hover:!bg-amber-600"
          @click="handleSameIpCheck"
        >
          同IP检测
        </a-button>
      </template>
    </BasicTable>
  </Page>
</template>
