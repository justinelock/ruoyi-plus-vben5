import type { App } from 'vue';

import { Button as AButton } from 'antdv-next';

import { ActionButton } from './button';
import TableActionSpace from './table-action-space.vue';

/**
 * 全局组件注册
 */
export function setupGlobalComponent(app: App) {
  app.component('AButton', AButton);
  // 表格操作列专用按钮
  app.component('ActionButton', ActionButton);
  app.component('TableActionSpace', TableActionSpace);
}

export { default as ApiSwitch } from './api-switch.vue';
export { default as TableActionSpace } from './table-action-space.vue';
