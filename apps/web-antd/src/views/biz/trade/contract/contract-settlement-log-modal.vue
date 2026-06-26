<script setup lang="tsx">
import type { DescriptionsProps } from 'antdv-next';

import type { TradeContractSettlementLog } from '#/api/biz/trade/contract/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Descriptions } from 'antdv-next';

import { tradeContractSettlementDetail } from '#/api/biz/trade/contract';

import { formatGlobalControlState, parseContractSettlementLog } from './data';

const log = ref<TradeContractSettlementLog | null>(null);

const [BasicModal, modalApi] = useVbenModal({
  async onOpenChange(isOpen) {
    if (!isOpen) {
      return;
    }
    modalApi.modalLoading(true);
    try {
      const row = modalApi.getData() as { id: string };
      const resp = await tradeContractSettlementDetail(row.id);
      log.value = parseContractSettlementLog(resp.detail);
    } finally {
      modalApi.modalLoading(false);
    }
  },
  onClosed() {
    log.value = null;
  },
});

function display(value: unknown) {
  if (value === undefined || value === null || value === '') {
    return '-';
  }
  return String(value);
}

function renderWinResult(value?: boolean, text?: string) {
  if (value === undefined && !text) {
    return '-';
  }
  const label =
    text ?? (value === undefined ? '-' : value ? '盈利' : '亏损');
  if (value === undefined) {
    return label;
  }
  const color = value ? 'text-[#52c41a]' : 'text-[#ff4d4f]';
  return <span class={color}>{label}</span>;
}

const sections = computed(() => {
  const d = log.value;
  if (!d) {
    return [] as { title: string; items: DescriptionsProps['items'] }[];
  }

  const blocks: { title: string; items: DescriptionsProps['items'] }[] = [];

  if (d.settlementStart) {
    blocks.push({
      title: '开始结算',
      items: [
        { label: '时间', content: display(d.settlementStart.time) },
        { label: '结算类型', content: display(d.settlementStart.settlementType) },
      ],
    });
  }

  if (d.orderBasicInfo) {
    blocks.push({
      title: '订单基本信息',
      items: [
        { label: '时间', content: display(d.orderBasicInfo.time) },
        { label: '账户', content: display(d.orderBasicInfo.account) },
        { label: '方向', content: display(d.orderBasicInfo.direction) },
        { label: '金额', content: display(d.orderBasicInfo.amount) },
        { label: '开仓价', content: display(d.orderBasicInfo.openingPrice) },
      ],
    });
  }

  if (d.priceInfo) {
    blocks.push({
      title: '价格信息',
      items: [
        { label: '时间', content: display(d.priceInfo.time) },
        { label: '系统价格', content: display(d.priceInfo.systemPrice) },
        { label: '用户价格', content: display(d.priceInfo.userPrice) },
        { label: '采用价格', content: display(d.priceInfo.usedPriceType) },
        { label: '用户开仓价', content: display(d.priceInfo.userOpeningPrice) },
        { label: '用户方向', content: display(d.priceInfo.userDirection) },
      ],
    });
  }

  if (d.naturalResult) {
    blocks.push({
      title: '自然结果',
      items: [
        { label: '时间', content: display(d.naturalResult.time) },
        { label: '说明', content: display(d.naturalResult.resultDescription) },
        {
          label: '自然结果',
          content: renderWinResult(
            d.naturalResult.isWin,
            d.naturalResult.result,
          ),
        },
        {
          label: '实际开仓价',
          content: display(d.naturalResult.actualOpeningPrice),
        },
      ],
    });
  }

  if (d.userControlInfo) {
    blocks.push({
      title: '用户控单',
      items: [
        { label: '时间', content: display(d.userControlInfo.time) },
        {
          label: '控单状态',
          content: display(d.userControlInfo.controlState),
        },
        {
          label: '控单结果',
          content: renderWinResult(
            d.userControlInfo.finalResult,
            d.userControlInfo.controlResult,
          ),
        },
      ],
    });
  }

  if (d.orderControlInfo) {
    blocks.push({
      title: '订单控单',
      items: [
        { label: '时间', content: display(d.orderControlInfo.time) },
        {
          label: '是否有控单',
          content: d.orderControlInfo.hasControl ? '是' : '否',
        },
        {
          label: '控单状态',
          content: display(d.orderControlInfo.controlState),
        },
        {
          label: '控单结果',
          content: renderWinResult(
            d.orderControlInfo.finalResult,
            d.orderControlInfo.controlResult,
          ),
        },
      ],
    });
  }

  if (d.globalControlInfo) {
    const skipReason = d.globalControlInfo.skippedByUserControl
      ? '用户控单已生效'
      : d.globalControlInfo.skippedByOrderControl
        ? '订单控单已生效'
        : undefined;
    blocks.push({
      title: '全局控盘',
      items: [
        { label: '时间', content: display(d.globalControlInfo.time) },
        {
          label: '今日全局控盘',
          content: formatGlobalControlState(d.globalControlInfo.controlState),
        },
        {
          label: '是否生效',
          content: d.globalControlInfo.controlApplied ? '是' : '否',
        },
        ...(skipReason
          ? [{ label: '跳过原因', content: skipReason }]
          : []),
        {
          label: '最终结果',
          content: renderWinResult(d.globalControlInfo.finalResult),
        },
      ],
    });
  }

  if (d.priceAdjustment) {
    blocks.push({
      title: '价格调整',
      items: [
        { label: '时间', content: display(d.priceAdjustment.time) },
        {
          label: '最终结果',
          content: renderWinResult(d.priceAdjustment.finalResult),
        },
        {
          label: '调整前价格',
          content: display(d.priceAdjustment.priceBeforeAdjustment),
        },
        {
          label: '调整说明',
          content: display(d.priceAdjustment.adjustmentDescription),
        },
      ],
    });
  }

  if (d.finalPrice) {
    blocks.push({
      title: '最终价格',
      items: [
        { label: '时间', content: display(d.finalPrice.time) },
        { label: '价格来源', content: display(d.finalPrice.priceSource) },
        {
          label: '结算价格',
          content: renderWinResult(
            d.finalPrice.isWin,
            display(d.finalPrice.finalPrice),
          ),
        },
      ],
    });
  }

  if (d.profitCalculation) {
    blocks.push({
      title: '盈亏计算',
      items: [
        { label: '时间', content: display(d.profitCalculation.time) },
        {
          label: '计算说明',
          content: display(d.profitCalculation.calculationDescription),
        },
      ],
    });
  }

  if (d.orderStatusUpdate) {
    blocks.push({
      title: '订单状态',
      items: [
        { label: '时间', content: display(d.orderStatusUpdate.time) },
        { label: '状态', content: display(d.orderStatusUpdate.state) },
        {
          label: '结算价格',
          content: display(d.orderStatusUpdate.closingPrice),
        },
        {
          label: '实际盈亏',
          content: display(d.orderStatusUpdate.actualProfit),
        },
      ],
    });
  }

  return blocks;
});
</script>

<template>
  <BasicModal
    :footer="false"
    :fullscreen-button="false"
    class="w-[720px]"
    title="结算日志"
  >
    <div
      v-if="sections.length"
      class="flex max-h-[70vh] flex-col gap-4 overflow-y-auto"
    >
      <Descriptions
        v-for="section in sections"
        :key="section.title"
        bordered
        :column="2"
        :items="section.items"
        size="small"
        :title="section.title"
      />
    </div>
  </BasicModal>
</template>
