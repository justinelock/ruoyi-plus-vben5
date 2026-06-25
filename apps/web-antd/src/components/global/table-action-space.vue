<script setup lang="ts">
import { Space } from 'antdv-next';

defineOptions({ name: 'TableActionSpace' });

/** 表格操作列按钮容器：间距 2px */
withDefaults(
  defineProps<{
    wrap?: boolean;
  }>(),
  { wrap: false },
);
</script>

<template>
  <Space :size="2" :wrap="wrap">
    <slot />
  </Space>
</template>
