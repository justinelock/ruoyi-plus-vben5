<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { TradeEntrust } from '#/api/biz/trade/entrust/model';

import { Page } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { tradeEntrustList } from '#/api/biz/trade/entrust';

import { bizInlineFormBase, bizTimeMapping } from '../../shared/form-options';
import { columns, querySchema } from './data';

// 1. 单行 inline 筛选 + entrustTime 时间范围映射（对接 GET /trade/entrust/list）
const formOptions: VbenFormProps = {
  ...bizInlineFormBase,
  schema: querySchema(),
  fieldMappingTime: [bizTimeMapping('entrustTime')],
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
        tradeEntrustList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        }),
    },
  },
  headerCellConfig: { height: 44 },
  cellConfig: { height: 48 },
  rowConfig: { keyField: 'id' },
  id: 'trade-entrust-index',
};

const [BasicTable] = useVbenVxeGrid({ formOptions, gridOptions });

function handleView(_row: TradeEntrust) {}

function handleExport() {}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden" table-title="委托订单">
      <template #expand-after>
        <a-button
          v-access:code="['trade:entrust:list']"
          type="primary"
          @click="handleExport"
        >
          导出
        </a-button>
      </template>
      <template #action="{ row }">
        <table-action-space>
          <action-button
            v-access:code="['trade:entrust:list']"
            @click.stop="handleView(row)"
          >
            详情
          </action-button>
        </table-action-space>
      </template>
    </BasicTable>
  </Page>
</template>
