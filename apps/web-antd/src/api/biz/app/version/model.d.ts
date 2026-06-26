export interface AppReleaseVersion {
  id?: string;
  version?: string;
  description?: string;
  downloadUrl?: string;
  apkFileUrl?: string;
  iosUrl?: string;
  ipaFileUrl?: string;
  isForce?: boolean;
  isHotUpdate?: boolean;
  updatedAt?: string;
}

export interface AppReleaseVersionSaveReq {
  id?: string;
  version: string;
  description: string;
  downloadUrl: string;
  apkFileUrl?: string;
  iosUrl?: string;
  ipaFileUrl?: string;
  isForce?: boolean;
  isHotUpdate?: boolean;
}

export interface AppReleaseUploadOptions {
  defaultDomain?: string;
  allowedDomains?: string[];
  urlPattern?: string;
  wwwrootBase?: string;
}

export interface AppReleaseUploadResult {
  url: string;
  path?: string;
  domain?: string;
  fileName?: string;
  kind?: string;
}
