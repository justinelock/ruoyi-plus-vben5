<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { NotifyNews } from '#/api/biz/notify/news/model';

import { Page, useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { notifyNewsList } from '#/api/biz/notify/news';

import { bizInlineFormBase, bizTimeMapping } from '../../shared/form-options';
import { columns, querySchema } from './data';
import NotifyNewsModal from './notify-news-modal.vue';

const formOptions: VbenFormProps = {
  ...bizInlineFormBase,
  schema: querySchema(),
  // publishTime 映射为 params[beginTime]/params[endTime]
  fieldMappingTime: [bizTimeMapping('publishTime')],
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
        notifyNewsList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        }),
    },
  },
  headerCellConfig: { height: 44 },
  cellConfig: { height: 48 },
  rowConfig: { keyField: 'id' },
  id: 'notify-news-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

const [NewsModal, newsModalApi] = useVbenModal({
  connectedComponent: NotifyNewsModal,
});

function handleAdd() {
  newsModalApi.setData({});
  newsModalApi.open();
}

function handleEdit(row: NotifyNews) {
  newsModalApi.setData({ id: row.id });
  newsModalApi.open();
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden" table-title="市场新闻">
      <template #expand-after>
        <a-button
          v-access:code="['notify:news:list']"
          type="primary"
          @click="handleAdd"
        >
          新增
        </a-button>
      </template>
      <template #action="{ row }">
        <table-action-space>
          <action-button
            v-access:code="['notify:news:list']"
            @click.stop="handleEdit(row)"
          >
            编辑
          </action-button>
        </table-action-space>
      </template>
    </BasicTable>
    <NewsModal @reload="tableApi.query()" />
  </Page>
</template>
