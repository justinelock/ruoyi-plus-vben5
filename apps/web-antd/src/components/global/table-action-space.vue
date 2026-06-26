<script setup lang="ts">
import { Space } from 'antdv-next';

defineOptions({ name: 'TableActionSpace' });

/** 表格操作列按钮容器：与 ActionButton 配合，项间距 4px */
withDefaults(
  defineProps<{
    wrap?: boolean;
  }>(),
  { wrap: false },
);
</script>

<template>
  <Space :size="4" :wrap="wrap">
    <slot></slot>
  </Space>
</template>
