/** 证件图 URL：完整 URL 原样返回，相对路径补前导 / */
export function resolveKycImageUrl(path?: string) {
  const trimmed = path?.trim();
  if (!trimmed) {
    return '';
  }
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:')
  ) {
    return trimmed;
  }
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}
