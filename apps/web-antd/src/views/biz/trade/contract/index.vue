<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { TradeContract } from '#/api/biz/trade/contract/model';

import { ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { Popconfirm } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  tradeContractBatchCurrentPageDirectional,
  tradeContractList,
  tradeContractLose,
  tradeContractWin,
} from '#/api/biz/trade/contract';

import { bizInlineFormBase, bizTimeMapping } from '../../shared/form-options';
import ContractDirectionModal from './contract-direction-modal.vue';
import ContractSettlementLogModal from './contract-settlement-log-modal.vue';
import {
  batchDirectionalActions,
  canContractChangeDirection,
  canContractShowSettlementLog,
  canContractWinLose,
  columns,
  querySchema,
} from './data';

const formOptions: VbenFormProps = {
  ...bizInlineFormBase,
  schema: querySchema(),
  fieldMappingTime: [bizTimeMapping('createTime')],
};

const lastListQuery = ref<Record<string, unknown>>({});

const gridOptions: VxeGridProps = {
  checkboxConfig: { highlight: true, reserve: true, trigger: 'default' },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        const params = {
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        };
        lastListQuery.value = params;
        return tradeContractList(params);
      },
    },
  },
  headerCellConfig: { height: 44 },
  cellConfig: { height: 48 },
  rowConfig: { keyField: 'id' },
  id: 'trade-contract-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

const [DirectionModal, directionModalApi] = useVbenModal({
  connectedComponent: ContractDirectionModal,
});

const [SettlementLogModal, settlementLogModalApi] = useVbenModal({
  connectedComponent: ContractSettlementLogModal,
});

async function handleWin(row: TradeContract) {
  await tradeContractWin(row.id);
  await tableApi.query();
}

async function handleLose(row: TradeContract) {
  await tradeContractLose(row.id);
  await tableApi.query();
}

function handleOpenDirection(row: TradeContract) {
  directionModalApi.setData(row);
  directionModalApi.open();
}

function handleOpenSettlementLog(row: TradeContract) {
  settlementLogModalApi.setData(row);
  settlementLogModalApi.open();
}

function buildBatchPayload(controlState: string) {
  const q = lastListQuery.value;
  return {
    pageNum: q.pageNum as number | undefined,
    pageSize: q.pageSize as number | undefined,
    keyword: q.keyword as string | undefined,
    status: q.status as string | undefined,
    beginTime: q['params[beginTime]'] as string | undefined,
    endTime: q['params[endTime]'] as string | undefined,
    controlState,
  };
}

async function handleBatchDirectional(controlState: string) {
  await tradeContractBatchCurrentPageDirectional(
    buildBatchPayload(controlState),
  );
  await tableApi.query();
}

function handleExport() {}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden" table-title="合约订单">
      <template #expand-after>
        <a-button
          v-access:code="['trade:contract:list']"
          type="primary"
          @click="handleExport"
        >
          导出
        </a-button>
      </template>
      <template #toolbar-tools>
        <table-action-space>
          <Popconfirm
            v-for="item in batchDirectionalActions"
            :key="item.controlState"
            placement="bottom"
            :overlay-inner-style="{ maxWidth: '320px' }"
            @confirm="handleBatchDirectional(item.controlState)"
          >
            <template #title>
              <div class="max-w-[300px] whitespace-normal text-left leading-relaxed">
                {{ item.title }}
              </div>
            </template>
            <a-button
              v-access:code="['trade:contract:list']"
              @click.stop=""
            >
              {{ item.label }}
            </a-button>
          </Popconfirm>
        </table-action-space>
      </template>
      <template #action="{ row }">
        <table-action-space
          v-if="
            canContractShowSettlementLog(row)
              || canContractWinLose(row)
              || canContractChangeDirection(row)
          "
        >
          <action-button
            v-if="canContractShowSettlementLog(row)"
            v-access:code="['trade:contract:list']"
            @click.stop="handleOpenSettlementLog(row)"
          >
            日志
          </action-button>
          <Popconfirm
            v-if="canContractWinLose(row)"
            placement="left"
            title="确认将该订单控为必赢？"
            @confirm="handleWin(row)"
          >
            <action-button
              v-access:code="['trade:contract:list']"
              @click.stop=""
            >
              赢
            </action-button>
          </Popconfirm>
          <Popconfirm
            v-if="canContractWinLose(row)"
            placement="left"
            title="确认将该订单控为必输？"
            @confirm="handleLose(row)"
          >
            <action-button
              v-access:code="['trade:contract:list']"
              danger
              @click.stop=""
            >
              输
            </action-button>
          </Popconfirm>
          <action-button
            v-if="canContractChangeDirection(row)"
            v-access:code="['trade:contract:list']"
            @click.stop="handleOpenDirection(row)"
          >
            交易方向
          </action-button>
        </table-action-space>
      </template>
    </BasicTable>
    <DirectionModal @reload="tableApi.query()" />
    <SettlementLogModal />
  </Page>
</template>
