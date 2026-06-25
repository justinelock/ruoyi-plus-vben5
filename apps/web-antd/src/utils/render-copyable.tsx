import { Tooltip } from 'antdv-next';

import { copyText } from '#/utils/copy-text';

/** 阻止表格行点击（复制图标点击时不触发行选中/展开） */
export function stopRowClick(e: Event) {
  e.stopPropagation();
}

/** fluent:copy-16-filled（UnoCSS iconify） */
export function CopyIcon({ onClick }: { onClick: (e: MouseEvent) => void }) {
  return (
    <span
      class="size-14px icon-[fluent--copy-16-filled] inline-block shrink-0 cursor-pointer text-primary hover:opacity-80"
      onClick={onClick}
    />
  );
}

/** 表格单元格：文本 + 复制图标（与用户列表用户名列一致） */
export function renderCopyableValue(value?: null | number | string) {
  const text =
    value === null || value === undefined || value === ''
      ? '-'
      : String(value);
  return (
    <span class="inline-flex items-center gap-1">
      <span>{text}</span>
      {text !== '-' ? (
        <Tooltip title="复制">
          <CopyIcon
            onClick={(e) => {
              stopRowClick(e);
              copyText(text);
            }}
          />
        </Tooltip>
      ) : null}
    </span>
  );
}
