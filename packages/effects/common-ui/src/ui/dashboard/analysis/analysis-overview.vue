<script setup lang="ts">
import type { AnalysisOverviewItem } from '../typing';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  VbenCountToAnimator,
  VbenIcon,
} from '@vben-core/shadcn-ui';

interface Props {
  items?: AnalysisOverviewItem[];
  /** 紧凑模式：分析页四卡高度约为默认 3/4 */
  compact?: boolean;
}

defineOptions({
  name: 'AnalysisOverview',
});

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  compact: false,
});

/** 主数字样式：加粗，充值绿 / 提现红 */
function mainValueClass(item: AnalysisOverviewItem) {
  const size = props.compact ? 'text-base' : 'text-xl';
  const tone =
    item.valueTone === 'success'
      ? 'text-green-600'
      : item.valueTone === 'danger'
        ? 'text-red-500'
        : '';
  return [size, 'font-bold', tone].filter(Boolean).join(' ');
}

/** 底部数字样式：金额行可与主数字分色（提现仅底部红色） */
function footerValueClass(item: AnalysisOverviewItem) {
  const tone = item.totalValuePrefix?.startsWith('-')
    ? 'text-red-500'
    : item.valueTone === 'success'
      ? 'text-green-600'
      : item.valueTone === 'danger'
        ? 'text-red-500'
        : '';
  return ['font-bold', tone].filter(Boolean).join(' ');
}
</script>

<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    :class="props.compact ? 'gap-3' : 'gap-4'"
  >
    <template v-for="item in items" :key="item.title">
      <Card :title="item.title" class="w-full">
        <CardHeader :class="props.compact ? 'px-4 py-2' : undefined">
          <CardTitle :class="props.compact ? 'text-base' : 'text-xl'">
            {{ item.title }}
          </CardTitle>
        </CardHeader>

        <CardContent
          class="flex items-center justify-between"
          :class="props.compact ? 'px-4 py-2' : undefined"
        >
          <VbenCountToAnimator
            :end-val="item.value"
            :start-val="1"
            :class="mainValueClass(item)"
            :decimals="item.valueDecimals ?? 0"
            :prefix="item.valuePrefix ?? ''"
          />
          <VbenIcon
            :icon="item.icon"
            :class="props.compact ? 'size-6 shrink-0' : 'size-8 shrink-0'"
          />
        </CardContent>
        <CardFooter
          class="justify-between"
          :class="props.compact ? 'px-4 py-2 text-sm' : undefined"
        >
          <span>{{ item.totalTitle }}</span>
          <VbenCountToAnimator
            :end-val="item.totalValue"
            :start-val="1"
            :class="footerValueClass(item)"
            :decimals="item.totalValueDecimals ?? 0"
            :prefix="item.totalValuePrefix ?? ''"
          />
        </CardFooter>
      </Card>
    </template>
  </div>
</template>
