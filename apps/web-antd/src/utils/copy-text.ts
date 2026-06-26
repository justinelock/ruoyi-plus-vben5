/** 表格/详情内一键复制（legacy 兼容见 workflow approval-panel） */
export async function copyText(text?: null | number | string) {
  const value = text === null || text === undefined ? '' : String(text).trim();
  if (!value || value === '-') {
    return;
  }
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.append(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    window.message.success('复制成功');
  } catch {
    window.message.error('复制失败');
  }
}
