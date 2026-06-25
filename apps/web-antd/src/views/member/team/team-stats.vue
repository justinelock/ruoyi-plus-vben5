<script setup lang="ts">
import type { MemberTeamStats } from '#/api/member/team/model';

defineProps<{
  stats: MemberTeamStats;
}>();

/** 代理统计卡片配置 */
const cards: Array<{
  key: keyof MemberTeamStats;
  label: string;
  money?: boolean;
  tone: string;
}> = [
  { key: 'level1Members', label: '一级代理', tone: 'level1' },
  { key: 'level2Members', label: '二级代理', tone: 'level2' },
  { key: 'level3Members', label: '三级代理', tone: 'level3' },
  { key: 'level4Members', label: '四级代理', tone: 'level4' },
  { key: 'level5Members', label: '五级代理', tone: 'level5' },
  { key: 'totalMembers', label: '团队成员总数', tone: 'members' },
  { key: 'totalTeamBalance', label: '团队总余额', tone: 'balance', money: true },
];
</script>

<template>
  <div class="flex flex-nowrap gap-3 overflow-x-auto">
    <div
      v-for="item in cards"
      :key="item.key"
      class="team-stat-card min-w-[128px] flex-1 shrink-0 rounded-xl border px-4 py-3 text-center shadow-sm"
      :class="`team-stat-card--${item.tone}`"
    >
      <div class="team-stat-card__label text-sm">{{ item.label }}</div>
      <div
        class="team-stat-card__value mt-1 text-2xl font-semibold"
        :class="{ 'team-stat-card__value--money': item.money }"
      >
        <template v-if="item.money">
          $ {{ stats.totalTeamBalance ?? 0 }}
        </template>
        <template v-else>{{ stats[item.key] ?? 0 }}</template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-stat-card {
  background-color: rgb(var(--team-stat-bg) / 80%);
  border-color: rgb(var(--team-stat-border) / 45%);
}

.team-stat-card__label {
  color: rgb(var(--team-stat-label));
}

.team-stat-card__value {
  color: rgb(var(--team-stat-value));
}

.team-stat-card__value--money {
  color: rgb(var(--team-stat-money));
}

.team-stat-card--level1 {
  --team-stat-bg: 237 233 254;
  --team-stat-border: 196 181 253;
  --team-stat-label: 91 33 182;
  --team-stat-value: 46 16 101;
  --team-stat-money: 22 101 52;
}

.team-stat-card--level2 {
  --team-stat-bg: 224 242 254;
  --team-stat-border: 125 211 252;
  --team-stat-label: 3 105 161;
  --team-stat-value: 12 74 110;
  --team-stat-money: 22 101 52;
}

.team-stat-card--level3 {
  --team-stat-bg: 254 243 199;
  --team-stat-border: 252 211 77;
  --team-stat-label: 161 98 7;
  --team-stat-value: 120 53 15;
  --team-stat-money: 22 101 52;
}

.team-stat-card--level4 {
  --team-stat-bg: 253 230 138;
  --team-stat-border: 250 204 21;
  --team-stat-label: 146 64 14;
  --team-stat-value: 113 63 18;
  --team-stat-money: 22 101 52;
}

.team-stat-card--level5 {
  --team-stat-bg: 254 249 195;
  --team-stat-border: 234 179 8;
  --team-stat-label: 133 77 14;
  --team-stat-value: 101 67 33;
  --team-stat-money: 22 101 52;
}

.team-stat-card--members {
  --team-stat-bg: 255 237 213;
  --team-stat-border: 253 186 116;
  --team-stat-label: 194 65 12;
  --team-stat-value: 124 45 18;
  --team-stat-money: 22 101 52;
}

.team-stat-card--balance {
  --team-stat-bg: 209 250 229;
  --team-stat-border: 110 231 183;
  --team-stat-label: 4 120 87;
  --team-stat-value: 6 78 59;
  --team-stat-money: 5 150 105;
}

.dark .team-stat-card--level1 {
  --team-stat-bg: 76 29 149;
  --team-stat-border: 167 139 250;
  --team-stat-label: 216 180 254;
  --team-stat-value: 245 243 255;
  --team-stat-money: 134 239 172;
}

.dark .team-stat-card--level2 {
  --team-stat-bg: 12 74 110;
  --team-stat-border: 56 189 248;
  --team-stat-label: 186 230 253;
  --team-stat-value: 240 249 255;
  --team-stat-money: 134 239 172;
}

.dark .team-stat-card--level3 {
  --team-stat-bg: 120 53 15;
  --team-stat-border: 251 191 36;
  --team-stat-label: 253 230 138;
  --team-stat-value: 255 251 235;
  --team-stat-money: 134 239 172;
}

.dark .team-stat-card--level4 {
  --team-stat-bg: 113 63 18;
  --team-stat-border: 234 179 8;
  --team-stat-label: 254 240 138;
  --team-stat-value: 254 252 232;
  --team-stat-money: 134 239 172;
}

.dark .team-stat-card--level5 {
  --team-stat-bg: 101 67 33;
  --team-stat-border: 202 138 4;
  --team-stat-label: 254 249 195;
  --team-stat-value: 254 252 232;
  --team-stat-money: 134 239 172;
}

.dark .team-stat-card--members {
  --team-stat-bg: 124 45 18;
  --team-stat-border: 251 146 60;
  --team-stat-label: 254 215 170;
  --team-stat-value: 255 247 237;
  --team-stat-money: 134 239 172;
}

.dark .team-stat-card--balance {
  --team-stat-bg: 6 78 59;
  --team-stat-border: 52 211 153;
  --team-stat-label: 167 243 208;
  --team-stat-value: 236 253 245;
  --team-stat-money: 110 231 183;
}
</style>
