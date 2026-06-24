<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { MemberUser } from '#/api/member/user/model';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { Space, Tag } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { memberUserList, memberUserStats } from '#/api/member/user';

import { columns, querySchema } from './data';

/** 是否查看已删用户（切换后重新查询） */
const showDeleted = ref(false);

/** 标题 Tag：活跃用户数（与列表同筛选条件，来自 GET /member/user/stats） */
const totalActiveSessions = ref(0);

/** 拉取活跃会话数，筛选条件与列表查询保持一致 */
async function loadActiveSessions(formValues: Record<string, any> = {}) {
  const stats = await memberUserStats({
    ...formValues,
    deleted: showDeleted.value ? '1' : '0',
  });
  totalActiveSessions.value = stats.totalActiveSessions ?? 0;
}

// 1. 单行 inline 筛选：关键词 + 认证状态 + 时间，与操作按钮同一行
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
      'createTime',
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
        const params = {
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          deleted: showDeleted.value ? '1' : '0',
          ...formValues,
        };
        // 列表与活跃统计并行请求，保证标题 Tag 与当前筛选一致
        const [listResp] = await Promise.all([
          memberUserList(params),
          loadActiveSessions(formValues),
        ]);
        return listResp;
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
  id: 'member-user-list-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

function handleView(_row: MemberUser) {
  // 详情页待业务接口就绪后接入
}

function handleEdit(_row: MemberUser) {
  // 编辑抽屉待业务接口就绪后接入
}

function handleExport() {
  // 导出待业务接口就绪后接入
}

function handleToggleDeleted() {
  // 切换「已删用户」视图并刷新列表
  showDeleted.value = !showDeleted.value;
  tableApi.reload();
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable class="overflow-hidden">
      <template #table-title>
        <div class="flex items-center gap-2 text-[1rem] font-bold">
          <span>用户列表</span>
          <Tag color="processing">活跃用户:{{ totalActiveSessions }}</Tag>
        </div>
      </template>
      <template #expand-after>
        <a-button
          v-access:code="['member:list:list']"
          type="primary"
          @click="handleExport"
        >
          导出
        </a-button>
        <a-button
          v-access:code="['member:list:list']"
          :type="showDeleted ? 'primary' : 'default'"
          @click="handleToggleDeleted"
        >
          已删用户
        </a-button>
      </template>
      <template #action="{ row }">
        <Space>
          <action-button
            v-access:code="['member:list:list']"
            @click.stop="handleView(row)"
          >
            详情
          </action-button>
          <action-button
            v-access:code="['member:list:list']"
            @click.stop="handleEdit(row)"
          >
            {{ $t('pages.common.edit') }}
          </action-button>
        </Space>
      </template>
    </BasicTable>
  </Page>
</template>
