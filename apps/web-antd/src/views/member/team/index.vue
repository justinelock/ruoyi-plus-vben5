<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { MemberTeam, MemberTeamStats } from '#/api/member/team/model';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Space } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { memberTeamList, memberTeamStats } from '#/api/member/team';

import { columns, querySchema } from './data';
import TeamStats from './team-stats.vue';

// 1. 顶部统计卡片：GET /member/team/stats，与列表筛选条件联动
const defaultStats: MemberTeamStats = {
  level1Count: 0,
  level2Count: 0,
  level3Count: 0,
  level4Count: 0,
  level5Count: 0,
  totalMembers: 0,
  totalBalance: '0.00',
};

const teamStats = ref<MemberTeamStats>({ ...defaultStats });

// 2. 单行 inline 筛选 + 注册时间范围
const inlineFormConfig: VbenFormProps = {
  schema: querySchema(),
  layout: 'inline',
  actionLayout: 'inline',
  compact: true,
  showCollapseButton: false,
  showDefaultActions: true,
  commonConfig: { hideLabel: true, componentProps: { allowClear: true } },
  wrapperClass: 'items-center',
  actionWrapperClass: 'pb-0 flex-shrink-0',
  resetButtonOptions: { show: false },
  submitButtonOptions: { content: '查询', variant: 'default' },
  fieldMappingTime: [
    [
      'registerTime',
      ['params[beginTime]', 'params[endTime]'],
      ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59'],
    ],
  ],
};

// 3. 按当前筛选条件刷新代理统计
async function loadStats(formValues: Record<string, any> = {}) {
  teamStats.value = await memberTeamStats(formValues);
}

const [QueryForm, queryFormApi] = useVbenForm({
  ...inlineFormConfig,
  handleSubmit: async () => {
    const values = await queryFormApi.getValues();
    queryFormApi.setLatestSubmissionValues(values);
    await loadStats(values);
    await tableApi.reload(values);
  },
});

// 4. 分页表格：GET /member/team/list
const gridOptions: VxeGridProps = {
  checkboxConfig: { highlight: true, reserve: true, trigger: 'default' },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) =>
        memberTeamList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        }),
    },
  },
  headerCellConfig: { height: 44 },
  cellConfig: { height: 48 },
  rowConfig: { keyField: 'id' },
  id: 'member-team-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({ gridOptions });

onMounted(async () => {
  await loadStats();
  await tableApi.reload({});
});

function handleView(_row: MemberTeam) {}
function handleExport() {
  queryFormApi.submitForm();
}
</script>

<template>
  <Page :auto-content-height="true">
    <div class="flex h-full flex-col overflow-hidden rounded-md bg-card">
      <div class="border-b p-2">
        <QueryForm>
          <template #expand-after>
            <a-button
              v-access:code="['member:team:list']"
              type="primary"
              @click="handleExport"
            >
              导出
            </a-button>
          </template>
        </QueryForm>
      </div>
      <div class="px-2 py-3">
        <TeamStats :stats="teamStats" />
      </div>
      <BasicTable class="min-h-0 flex-1 overflow-hidden" table-title="团队管理">
        <template #action="{ row }">
          <Space>
            <action-button
              v-access:code="['member:team:list']"
              @click.stop="handleView(row)"
            >
              详情
            </action-button>
          </Space>
        </template>
      </BasicTable>
    </div>
  </Page>
</template>
