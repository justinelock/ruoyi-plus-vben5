<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { MemberKyc } from '#/api/member/kyc/model';

import { Page, useVbenModal } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { memberKycList } from '#/api/member/kyc';

import { columns, querySchema } from './data';
import kycDetailModal from './kyc-detail-modal.vue';

// 1. 单行 inline 筛选（与用户列表同布局）
const formOptions: VbenFormProps = {
  schema: querySchema(),
  layout: 'inline',
  actionLayout: 'inline',
  compact: true,
  showCollapseButton: false,
  commonConfig: {
    hideLabel: true,
    componentProps: {
      allowClear: true,
    },
  },
  wrapperClass: 'items-center',
  actionWrapperClass: 'pb-0 flex-shrink-0',
  resetButtonOptions: {
    show: false,
  },
  submitButtonOptions: {
    content: '查询',
    variant: 'default',
  },
  fieldMappingTime: [
    [
      'submitTime',
      ['params[beginTime]', 'params[endTime]'],
      ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59'],
    ],
  ],
};

// 2. 分页表格
const gridOptions: VxeGridProps = {
  checkboxConfig: {
    highlight: true,
    reserve: true,
    trigger: 'default',
  },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        return await memberKycList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  headerCellConfig: {
    height: 44,
  },
  cellConfig: {
    height: 48,
  },
  rowConfig: {
    keyField: 'id',
  },
  id: 'member-kyc-index',
};

const [BasicTable] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [KycDetailModal, kycDetailModalApi] = useVbenModal({
  connectedComponent: kycDetailModal,
});

function handleView(row: MemberKyc) {
  kycDetailModalApi.setData(row);
  kycDetailModalApi.open();
}

function handleAudit(_row: MemberKyc) {
  // 审核通过/拒绝待业务接口就绪后接入
}

function handleExport() {
  // 导出待业务接口就绪后接入
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden" table-title="实名认证">
      <template #expand-after>
        <a-button
          v-access:code="['member:kyc:list']"
          type="primary"
          @click="handleExport"
        >
          导出
        </a-button>
      </template>
      <template #action="{ row }">
        <table-action-space>
          <action-button
            v-access:code="['member:kyc:list']"
            @click.stop="handleView(row)"
          >
            详情
          </action-button>
          <action-button
            v-if="row.status === 'PENDING'"
            v-access:code="['member:kyc:list']"
            @click.stop="handleAudit(row)"
          >
            审核
          </action-button>
        </table-action-space>
      </template>
    </BasicTable>
    <KycDetailModal />
  </Page>
</template>
