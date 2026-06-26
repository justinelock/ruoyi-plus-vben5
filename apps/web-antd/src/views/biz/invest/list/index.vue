<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { InvestList } from '#/api/biz/invest/list/model';

import { Page, useVbenModal } from '@vben/common-ui';

import { Popconfirm } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { investListList, investListRemove } from '#/api/biz/invest/list';

import { bizInlineFormBase, bizTimeMapping } from '../../shared/form-options';
import { columns, querySchema } from './data';
import InvestFundModal from './invest-fund-modal.vue';

const formOptions: VbenFormProps = {
  ...bizInlineFormBase,
  schema: querySchema(),
  fieldMappingTime: [bizTimeMapping('createTime')],
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
        investListList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        }),
    },
  },
  headerCellConfig: { height: 44 },
  cellConfig: { height: 48 },
  rowConfig: { keyField: 'id' },
  id: 'invest-list-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

const [FundModal, fundModalApi] = useVbenModal({
  connectedComponent: InvestFundModal,
});

function handleAdd() {
  fundModalApi.setData({});
  fundModalApi.open();
}

function handleEdit(row: InvestList) {
  fundModalApi.setData({ id: row.id });
  fundModalApi.open();
}

async function handleDelete(row: InvestList) {
  await investListRemove(row.id);
  await tableApi.query();
}

async function handleBatchDelete() {
  const rows = tableApi.grid.getCheckboxRecords() as InvestList[];
  if (!rows?.length) {
    return;
  }
  const ids = rows.map((r) => r.id).join(',');
  await investListRemove(ids);
  await tableApi.query();
}

/** 批量删除入口暂隐藏，改 true 即可恢复 */
const showBatchDelete = false;
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden" table-title="投信列表">
      <template #expand-after>
        <a-button
          v-access:code="['invest:list:list']"
          type="primary"
          @click="handleAdd"
        >
          新增
        </a-button>
        <Popconfirm
          v-if="showBatchDelete"
          title="确认删除所选投信？"
          @confirm="handleBatchDelete"
        >
          <a-button v-access:code="['invest:list:list']" danger>批量删除</a-button>
        </Popconfirm>
      </template>
      <template #action="{ row }">
        <table-action-space>
          <action-button
            v-access:code="['invest:list:list']"
            @click.stop="handleEdit(row)"
          >
            修改
          </action-button>
          <Popconfirm title="确认删除该投信？" @confirm="handleDelete(row)">
            <action-button v-access:code="['invest:list:list']" danger>
              删除
            </action-button>
          </Popconfirm>
        </table-action-space>
      </template>
    </BasicTable>
    <FundModal @reload="tableApi.query()" />
  </Page>
</template>
