<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { productHistoryList } from '#/api/biz/product/history';

import { bizInlineFormBase, bizTimeMapping } from '../../shared/form-options';
import { columns, querySchema } from './data';

// 1. 单行 inline 筛选 + tradeDate 时间范围映射（对接 GET /product/history/list）
const formOptions: VbenFormProps = {
  ...bizInlineFormBase,
  schema: querySchema(),
  fieldMappingTime: [bizTimeMapping('tradeDate')],
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
        productHistoryList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        }),
    },
  },
  headerCellConfig: { height: 44 },
  cellConfig: { height: 48 },
  rowConfig: { keyField: 'id' },
  id: 'product-history-index',
};

const [BasicTable] = useVbenVxeGrid({ formOptions, gridOptions });

function handleExport() {}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden" table-title="产品历史数据">
      <template #expand-after>
        <a-button
          v-access:code="['product:history:list']"
          type="primary"
          @click="handleExport"
        >
          导出
        </a-button>
      </template>
    </BasicTable>
  </Page>
</template>
