import type { Component } from 'vue';

interface AnalysisOverviewItem {
  icon: Component | string;
  title: string;
  totalTitle: string;
  totalValue: number;
  value: number;
  /** 数字强调色：充值 success(绿)、提现 danger(红) */
  valueTone?: 'danger' | 'default' | 'success';
  /** 主数字前缀 */
  valuePrefix?: string;
  /** 底部数值前缀 */
  totalValuePrefix?: string;
  /** 主数字小数位，默认 0 */
  valueDecimals?: number;
  /** 底部数值小数位，金额类常用 2 */
  totalValueDecimals?: number;
}

interface WorkbenchProjectItem {
  color?: string;
  content: string;
  date: string;
  group: string;
  icon: Component | string;
  title: string;
  url?: string;
}

interface WorkbenchTrendItem {
  avatar: string;
  content: string;
  date: string;
  title: string;
}

interface WorkbenchTodoItem {
  completed: boolean;
  content: string;
  date: string;
  title: string;
}

interface WorkbenchQuickNavItem {
  color?: string;
  icon: Component | string;
  title: string;
  url?: string;
}

export type {
  AnalysisOverviewItem,
  WorkbenchProjectItem,
  WorkbenchQuickNavItem,
  WorkbenchTodoItem,
  WorkbenchTrendItem,
};
