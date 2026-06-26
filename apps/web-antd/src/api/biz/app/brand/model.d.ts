export interface AppBranding {
  id?: string;
  revision?: string;
  splashUrl?: string;
  splashEnabled?: boolean;
  homeBannerUrl?: string;
  homeBannerEnabled?: boolean;
  profilePosterUrl?: string;
  profilePosterEnabled?: boolean;
  updatedAt?: string;
  updatedBy?: string;
}

export interface AppBrandingSaveReq {
  id?: string;
  splashUrl?: string;
  splashEnabled?: boolean;
  homeBannerUrl?: string;
  homeBannerEnabled?: boolean;
  profilePosterUrl?: string;
  profilePosterEnabled?: boolean;
}

export type BrandingImageKind = 'home_banner' | 'profile_poster' | 'splash';

export interface AppBrandingUploadResp {
  url: string;
  src: string;
}
