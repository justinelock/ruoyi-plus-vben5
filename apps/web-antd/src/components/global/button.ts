import { defineComponent, h } from 'vue';

import { Button } from 'antdv-next';
import { omit } from 'lodash-es';

/** 表格操作列 link 按钮水平内边距（默认 small 为 7px，统一收紧） */
const ACTION_BUTTON_PADDING_INLINE = '4px';

/**
 * 表格操作列按钮专用
 */
export const ActionButton = defineComponent({
  name: 'ActionButton',
  props: omit({}, ['type', 'ghost', 'size']),
  setup(props, { attrs, slots }) {
    return () => {
      const { style: attrsStyle, class: attrsClass, ...restAttrs } = attrs;
      return h(
        Button,
        {
          ...props,
          ...restAttrs,
          type: 'link',
          size: 'small',
          class: attrsClass,
          style: {
            '--ant-button-padding-inline-sm': ACTION_BUTTON_PADDING_INLINE,
            paddingInline: ACTION_BUTTON_PADDING_INLINE,
            ...(typeof attrsStyle === 'object' && attrsStyle !== null
              ? attrsStyle
              : {}),
          },
        },
        slots,
      );
    };
  },
});
