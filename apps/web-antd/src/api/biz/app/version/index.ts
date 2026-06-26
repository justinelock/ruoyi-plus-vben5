import type {
  AppReleaseUploadOptions,
  AppReleaseUploadResult,
  AppReleaseVersion,
  AppReleaseVersionSaveReq,
} from './model';

import { alovaInstance } from '#/utils/http';

/** 查询当前 App 版本配置 */
export function appVersionActive() {
  return alovaInstance.Get<AppReleaseVersion>('/app/version/active');
}

/** 保存 App 版本配置 */
export function appVersionUpdate(data: AppReleaseVersionSaveReq) {
  return alovaInstance.putWithMsg<void>('/app/version', data);
}

/** 安装包上传选项（域名列表） */
export function appReleaseUploadOptions() {
  return alovaInstance.Get<AppReleaseUploadOptions>(
    '/app/release/upload/options',
  );
}

/** 上传 APK / IPA（multipart PUT） */
export function appReleaseUploadPackage(file: File, domain: string) {
  const form = new FormData();
  form.append('file', file);
  form.append('domain', domain);
  return alovaInstance.Put<AppReleaseUploadResult>(
    '/app/release/upload',
    form,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 600_000,
      successMessageMode: 'message',
    },
  );
}
