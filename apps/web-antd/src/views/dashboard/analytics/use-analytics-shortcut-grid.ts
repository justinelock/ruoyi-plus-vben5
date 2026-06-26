import type { VxeGridProps } from '#/adapter/vxe-table';
import type { DashboardStatisticsType } from '#/api/dashboard/model';

import { nextTick, onMounted, watch } from 'vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

type ShortcutPage = {
  currentPage: number;
  pageSize: number;
};

/**
 * 分析页快捷表格：无筛选表单，挂载后主动 query。
 * 列表仅按待审状态筛选，不按时间裁切（待办常跨日；与全量管理页默认可无日期一致）。
 * 顶部四卡统计仍按 statisticsType 汇总。
 */
export function useAnalyticsShortcutGrid(options: {
  columns: VxeGridProps['columns'];
  gridId: string;
  queryFn: (page: ShortcutPage) => Promise<unknown>;
  statisticsType: () => DashboardStatisticsType;
}) {
  const gridOptions: VxeGridProps = {
    columns: options.columns,
    height: 280,
    keepSource: true,
    pagerConfig: { pageSize: 10 },
    proxyConfig: {
      autoLoad: true,
      ajax: {
        query: async ({ page }) =>
          options.queryFn({
            currentPage: page.currentPage,
            pageSize: page.pageSize || 10,
          }),
      },
    },
    headerCellConfig: { height: 40 },
    cellConfig: { height: 44 },
    rowConfig: { keyField: 'id' },
    id: options.gridId,
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({
    showSearchForm: false,
    gridOptions,
  });

  async function reload() {
    if (!tableApi.grid?.commitProxy) {
      return;
    }
    await tableApi.query();
  }

  onMounted(async () => {
    await nextTick();
    await reload();
  });

  watch(options.statisticsType, () => reload());

  return { BasicTable, tableApi, reload };
}
