import type {
  AppBranding,
  AppBrandingSaveReq,
  AppBrandingUploadResp,
  BrandingImageKind,
} from './model';

import { alovaInstance } from '#/utils/http';

/** 查询当前 App 品牌配置 */
export function appBrandingActive() {
  return alovaInstance.Get<AppBranding>('/app/brand/active');
}

/** 保存 App 品牌配置，返回含最新 revision 的完整配置 */
export function appBrandingSave(data: AppBrandingSaveReq) {
  return alovaInstance.putWithMsg<AppBranding>('/app/brand', data);
}

/** 品牌图片 multipart 上传 */
export function appBrandingUploadImage(file: File, kind: BrandingImageKind) {
  const form = new FormData();
  form.append('file', file);
  return alovaInstance.Post<AppBrandingUploadResp>(
    `/app/brand/upload/image?kind=${encodeURIComponent(kind)}`,
    form,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60_000,
      successMessageMode: 'message',
    },
  );
}
