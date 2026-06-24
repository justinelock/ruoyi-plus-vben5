<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { TradeDeal } from '#/api/biz/trade/deal/model';

import { Page } from '@vben/common-ui';

import { Space } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { tradeDealList } from '#/api/biz/trade/deal';

import { bizInlineFormBase, bizTimeMapping } from '../../shared/form-options';
import { columns, querySchema } from './data';

// 1. 单行 inline 筛选 + dealTime 时间范围映射（对接 GET /trade/deal/list）
const formOptions: VbenFormProps = {
  ...bizInlineFormBase,
  schema: querySchema(),
  fieldMappingTime: [bizTimeMapping('dealTime')],
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
        tradeDealList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        }),
    },
  },
  headerCellConfig: { height: 44 },
  cellConfig: { height: 48 },
  rowConfig: { keyField: 'id' },
  id: 'trade-deal-index',
};

const [BasicTable] = useVbenVxeGrid({ formOptions, gridOptions });

function handleView(_row: TradeDeal) {}

function handleExport() {}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden" table-title="成交订单">
      <template #expand-after>
        <a-button
          v-access:code="['trade:deal:list']"
          type="primary"
          @click="handleExport"
        >
          导出
        </a-button>
      </template>
      <template #action="{ row }">
        <Space>
          <action-button
            v-access:code="['trade:deal:list']"
            @click.stop="handleView(row)"
          >
            详情
          </action-button>
        </Space>
      </template>
    </BasicTable>
  </Page>
</template>
