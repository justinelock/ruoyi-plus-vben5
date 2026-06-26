import type { DashboardStatisticsType } from '#/api/dashboard/model';

import dayjs from 'dayjs';

/** 与后端 ResolveDateRange 一致的时间字符串格式 */
const TIME_FMT = 'YYYY-MM-DD HH:mm:ss';

export interface StatisticsDateRange {
  beginTime: string;
  endTime: string;
}

/**
 * 按分析页时间维度计算查询区间（本地时区，含当天结束时刻）
 * 对齐 app/system/internal/dal/fb_dashboard_stats.go ResolveDateRange
 */
export function resolveStatisticsDateRange(
  statType: DashboardStatisticsType,
): StatisticsDateRange {
  const now = dayjs();
  const todayStart = now.startOf('day');
  const end = now.endOf('day');

  let start = todayStart;
  if (statType === 1) {
    // 本周：周一 00:00（与 Go DayOfWeek.MONDAY 一致，不依赖 dayjs locale）
    const weekday = now.day(); // 0=周日 … 6=周六
    const mondayOffset = weekday === 0 ? 6 : weekday - 1;
    start = todayStart.subtract(mondayOffset, 'day');
  } else if (statType === 2) {
    // 本月：1 号 00:00
    start = now.startOf('month');
  }

  return {
    beginTime: start.format(TIME_FMT),
    endTime: end.format(TIME_FMT),
  };
}

/** 快捷列表统一带入的后端时间参数键（四卡统计用；快捷列表待办不按时间裁切） */
export function buildStatisticsTimeParams(statType: DashboardStatisticsType) {
  const { beginTime, endTime } = resolveStatisticsDateRange(statType);
  return {
    'params[beginTime]': beginTime,
    'params[endTime]': endTime,
  };
}
