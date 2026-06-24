<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { KlineMain } from '#/api/biz/kline/main/model';

import { Page } from '@vben/common-ui';

import { Space } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { klineMainList } from '#/api/biz/kline/main';

import { bizInlineFormBase } from '../../shared/form-options';
import { columns, querySchema } from './data';

// 1. 单行 inline 筛选（对接 GET /kline/main/list）
const formOptions: VbenFormProps = {
  ...bizInlineFormBase,
  schema: querySchema(),
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
        klineMainList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        }),
    },
  },
  headerCellConfig: { height: 44 },
  cellConfig: { height: 48 },
  rowConfig: { keyField: 'id' },
  id: 'kline-main-index',
};

const [BasicTable] = useVbenVxeGrid({ formOptions, gridOptions });

function handleView(_row: KlineMain) {}

function handleExport() {}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden" table-title="K线管理">
      <template #expand-after>
        <a-button
          v-access:code="['kline:main:list']"
          type="primary"
          @click="handleExport"
        >
          导出
        </a-button>
      </template>
      <template #action="{ row }">
        <Space>
          <action-button
            v-access:code="['kline:main:list']"
            @click.stop="handleView(row)"
          >
            详情
          </action-button>
        </Space>
      </template>
    </BasicTable>
  </Page>
</template>
