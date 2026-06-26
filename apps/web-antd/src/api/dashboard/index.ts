import type { DashboardStatistics, DashboardStatisticsType } from './model';

import { alovaInstance } from '#/utils/http';

enum Api {
  statistics = '/dashboard/statistics',
}

/**
 * 分析页四卡概览统计
 * @see GET /dashboard/statistics
 */
export function dashboardStatistics(type: DashboardStatisticsType = 0) {
  return alovaInstance.get<DashboardStatistics>(Api.statistics, {
    params: { type },
  });
}
