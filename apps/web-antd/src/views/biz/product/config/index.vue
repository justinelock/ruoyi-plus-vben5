<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { ProductConfig } from '#/api/biz/product/config/model';

import { Page, useVbenModal } from '@vben/common-ui';

import { Popconfirm } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  productConfigList,
  productConfigRemove,
} from '#/api/biz/product/config';

import { bizInlineFormBase, bizTimeMapping } from '../../shared/form-options';
import { columns, querySchema } from './data';
import ProductConfigModal from './product-config-modal.vue';

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
        productConfigList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        }),
    },
  },
  headerCellConfig: { height: 44 },
  cellConfig: { height: 48 },
  rowConfig: { keyField: 'id' },
  id: 'product-config-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

const [ConfigModal, configModalApi] = useVbenModal({
  connectedComponent: ProductConfigModal,
});

function handleAdd() {
  configModalApi.setData({});
  configModalApi.open();
}

function handleEdit(row: ProductConfig) {
  configModalApi.setData({ id: row.id });
  configModalApi.open();
}

async function handleDelete(row: ProductConfig) {
  await productConfigRemove(row.id);
  await tableApi.query();
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden" table-title="产品配置">
      <template #expand-after>
        <a-button
          v-access:code="['product:config:list']"
          type="primary"
          @click="handleAdd"
        >
          新增
        </a-button>
      </template>
      <template #action="{ row }">
        <table-action-space>
          <action-button
            v-access:code="['product:config:list']"
            @click.stop="handleEdit(row)"
          >
            编辑
          </action-button>
          <Popconfirm title="确认删除该产品？" @confirm="handleDelete(row)">
            <action-button v-access:code="['product:config:list']" danger>
              删除
            </action-button>
          </Popconfirm>
        </table-action-space>
      </template>
    </BasicTable>
    <ConfigModal @reload="tableApi.query()" />
  </Page>
</template>
