<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { InvestPosition } from '#/api/biz/invest/position/model';

import { Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { investPositionList } from '#/api/biz/invest/position';

import { bizInlineFormBase, bizTimeMapping } from '../../shared/form-options';
import { columns, querySchema } from './data';
import PositionProfitOrderDrawer from './position-profit-order-drawer.vue';
import PositionUpdateProfitModal from './position-update-profit-modal.vue';

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
        investPositionList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        }),
    },
  },
  headerCellConfig: { height: 44 },
  cellConfig: { height: 48 },
  rowConfig: { keyField: 'id' },
  id: 'invest-position-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

const [ProfitOrderDrawer, profitOrderDrawerApi] = useVbenDrawer({
  connectedComponent: PositionProfitOrderDrawer,
});

const [UpdateProfitModal, updateProfitModalApi] = useVbenModal({
  connectedComponent: PositionUpdateProfitModal,
});

/** 打开收益订单抽屉，传入 userId + positionId 查 fb_fund_profit_log */
function handleProfitOrders(row: InvestPosition) {
  profitOrderDrawerApi.setData({
    userId: row.userId,
    positionId: row.id,
    username: row.username,
    realName: row.realName,
  });
  profitOrderDrawerApi.open();
}

/** 打开修改收益弹窗，选日期后查 profitBefore 再提交 */
function handleUpdateProfit(row: InvestPosition) {
  updateProfitModalApi.setData(row);
  updateProfitModalApi.open();
}

function handleExport() {}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden" table-title="持仓订单">
      <template #expand-after>
        <a-button
          v-access:code="['invest:position:list']"
          type="primary"
          @click="handleExport"
        >
          导出
        </a-button>
      </template>
      <template #action="{ row }">
        <table-action-space>
          <action-button
            v-access:code="['invest:position:list']"
            @click.stop="handleProfitOrders(row)"
          >
            收益订单
          </action-button>
          <action-button
            v-access:code="['invest:position:list']"
            @click.stop="handleUpdateProfit(row)"
          >
            修改收益
          </action-button>
        </table-action-space>
      </template>
    </BasicTable>
    <ProfitOrderDrawer />
    <UpdateProfitModal @reload="tableApi.reload" />
  </Page>
</template>
