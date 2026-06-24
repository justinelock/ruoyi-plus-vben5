<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { MemberWallet } from '#/api/member/wallet/model';

import { Page } from '@vben/common-ui';

import { Space } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { memberWalletList } from '#/api/member/wallet';

import { columns, querySchema } from './data';

// 1. 单行 inline 筛选 + createTime 时间范围映射（对接 GET /member/wallet/list）
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
        memberWalletList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        }),
    },
  },
  headerCellConfig: { height: 44 },
  cellConfig: { height: 48 },
  rowConfig: { keyField: 'id' },
  id: 'member-wallet-index',
};

const [BasicTable] = useVbenVxeGrid({ formOptions, gridOptions });

function handleView(_row: MemberWallet) {}
function handleEdit(_row: MemberWallet) {}
function handleExport() {}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden" table-title="钱包管理">
      <template #expand-after>
        <a-button
          v-access:code="['member:wallet:list']"
          type="primary"
          @click="handleExport"
        >
          导出
        </a-button>
      </template>
      <template #action="{ row }">
        <Space>
          <action-button
            v-access:code="['member:wallet:list']"
            @click.stop="handleView(row)"
          >
            详情
          </action-button>
          <action-button
            v-access:code="['member:wallet:list']"
            @click.stop="handleEdit(row)"
          >
            编辑
          </action-button>
        </Space>
      </template>
    </BasicTable>
  </Page>
</template>
