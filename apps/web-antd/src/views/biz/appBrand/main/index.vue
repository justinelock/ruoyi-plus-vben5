<script setup lang="ts">
import type { Ref } from 'vue';

/** App 品牌资源单页配置（对齐 Java appbrandingconfig.vue） */
import type { AppBranding, BrandingImageKind } from '#/api/biz/app/brand/model';

import { computed, onMounted, reactive, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Card, Divider, Input, message, Radio, Spin, Switch } from 'antdv-next';
import RadioGroup from 'antdv-next/dist/radio/Group';
import dayjs from 'dayjs';

import {
  appBrandingActive,
  appBrandingSave,
  appBrandingUploadImage,
} from '#/api/biz/app/brand';

type ImageSourceMode = 'external' | 'upload';

const pageLoading = ref(false);
const submitLoading = ref(false);
const splashUploading = ref(false);
const bannerUploading = ref(false);
const profilePosterUploading = ref(false);

const dataForm = reactive({
  id: '',
  revision: '',
  splashUrl: '',
  splashEnabled: true,
  homeBannerUrl: '',
  homeBannerEnabled: true,
  profilePosterUrl: '',
  profilePosterEnabled: false,
  updatedAt: '',
  updatedBy: '',
});

const splashSourceMode = ref<ImageSourceMode>('upload');
const bannerSourceMode = ref<ImageSourceMode>('upload');
const profilePosterSourceMode = ref<ImageSourceMode>('upload');
const splashExternalUrl = ref('');
const bannerExternalUrl = ref('');
const profilePosterExternalUrl = ref('');

const splashFileInputRef = ref<HTMLInputElement | null>(null);
const bannerFileInputRef = ref<HTMLInputElement | null>(null);
const profilePosterFileInputRef = ref<HTMLInputElement | null>(null);

const splashHasPreview = computed(
  () => splashSourceMode.value === 'upload' && !!dataForm.splashUrl.trim(),
);
const bannerHasPreview = computed(
  () => bannerSourceMode.value === 'upload' && !!dataForm.homeBannerUrl.trim(),
);
const profilePosterHasPreview = computed(
  () =>
    profilePosterSourceMode.value === 'upload' &&
    !!dataForm.profilePosterUrl.trim(),
);

function formatTime(value?: string) {
  if (!value) return '-';
  const d = dayjs(value);
  return d.isValid() ? d.format('YYYY-MM-DD HH:mm:ss') : value;
}

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url.trim());
}

function previewImage(imageUrl: string) {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('data:')) return imageUrl;
  if (imageUrl.startsWith('/')) return `${window.location.origin}${imageUrl}`;
  return imageUrl;
}

const splashPreviewSrc = computed(() =>
  previewImage(dataForm.splashUrl.trim()),
);
const bannerPreviewSrc = computed(() =>
  previewImage(dataForm.homeBannerUrl.trim()),
);
const profilePosterPreviewSrc = computed(() =>
  previewImage(dataForm.profilePosterUrl.trim()),
);
const splashExternalPreviewSrc = computed(() =>
  previewImage(splashExternalUrl.value.trim()),
);
const bannerExternalPreviewSrc = computed(() =>
  previewImage(bannerExternalUrl.value.trim()),
);
const profilePosterExternalPreviewSrc = computed(() =>
  previewImage(profilePosterExternalUrl.value.trim()),
);

function applySourceModeFromUrl(
  url: string,
  modeRef: { value: ImageSourceMode },
  externalRef: { value: string },
  uploadField: 'homeBannerUrl' | 'profilePosterUrl' | 'splashUrl',
) {
  const trimmed = String(url || '').trim();
  if (!trimmed) {
    modeRef.value = 'upload';
    externalRef.value = '';
    dataForm[uploadField] = '';
    return;
  }
  if (isExternalUrl(trimmed)) {
    modeRef.value = 'external';
    externalRef.value = trimmed;
    dataForm[uploadField] = '';
    return;
  }
  modeRef.value = 'upload';
  externalRef.value = '';
  dataForm[uploadField] = trimmed;
}

function resolveSubmitUrl(
  mode: ImageSourceMode,
  uploadUrl: string,
  externalUrl: string,
) {
  return mode === 'external'
    ? String(externalUrl || '').trim()
    : String(uploadUrl || '').trim();
}

function validateImageFile(file: File) {
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    message.warning('请上传 jpg、png、webp 或 jpeg 格式的图片');
    return false;
  }
  if (file.size > 5 * 1024 * 1024) {
    message.warning('图片大小不能超过 5MB');
    return false;
  }
  return true;
}

async function uploadImage(file: File, kind: BrandingImageKind) {
  const res = await appBrandingUploadImage(file, kind);
  const url = res?.url || res?.src;
  if (!url) {
    throw new Error('图片上传失败');
  }
  return String(url);
}

async function handleFileUpload(
  e: Event,
  kind: BrandingImageKind,
  uploading: Ref<boolean>,
  urlField: 'homeBannerUrl' | 'profilePosterUrl' | 'splashUrl',
  modeRef: Ref<ImageSourceMode>,
  successText: string,
) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = '';
  if (!file || !validateImageFile(file)) return;

  uploading.value = true;
  try {
    dataForm[urlField] = await uploadImage(file, kind);
    modeRef.value = 'upload';
    message.success(successText);
  } catch (error) {
    console.error(error);
  } finally {
    uploading.value = false;
  }
}

function onSplashFileChange(e: Event) {
  handleFileUpload(
    e,
    'splash',
    splashUploading,
    'splashUrl',
    splashSourceMode,
    '启动页图片已上传',
  );
}

function onBannerFileChange(e: Event) {
  handleFileUpload(
    e,
    'home_banner',
    bannerUploading,
    'homeBannerUrl',
    bannerSourceMode,
    '首页横幅已上传',
  );
}

function onProfilePosterFileChange(e: Event) {
  handleFileUpload(
    e,
    'profile_poster',
    profilePosterUploading,
    'profilePosterUrl',
    profilePosterSourceMode,
    '「我的」顶部海报已上传',
  );
}

function applyBrandingMeta(data: AppBranding | Record<string, unknown>) {
  const row = data as Record<string, unknown>;
  dataForm.id = String(row.id ?? '');
  // revision 统一转字符串，避免数字类型无 trim、disabled Input 不刷新的问题
  const revision = String(row.revision ?? '').trim();
  dataForm.revision = revision || '0';
  dataForm.splashEnabled = row.splashEnabled !== false;
  dataForm.homeBannerEnabled = row.homeBannerEnabled !== false;
  dataForm.profilePosterEnabled = row.profilePosterEnabled === true;
  dataForm.updatedAt = String(row.updatedAt ?? '');
  dataForm.updatedBy = String(row.updatedBy ?? '');
}

async function loadConfig() {
  pageLoading.value = true;
  try {
    const data = await appBrandingActive();
    applyBrandingMeta(data);
    applySourceModeFromUrl(
      data.splashUrl ?? '',
      splashSourceMode,
      splashExternalUrl,
      'splashUrl',
    );
    applySourceModeFromUrl(
      data.homeBannerUrl ?? '',
      bannerSourceMode,
      bannerExternalUrl,
      'homeBannerUrl',
    );
    applySourceModeFromUrl(
      data.profilePosterUrl ?? '',
      profilePosterSourceMode,
      profilePosterExternalUrl,
      'profilePosterUrl',
    );
  } finally {
    pageLoading.value = false;
  }
}

async function submitHandle() {
  const splashUrl = resolveSubmitUrl(
    splashSourceMode.value,
    dataForm.splashUrl,
    splashExternalUrl.value,
  );
  const homeBannerUrl = resolveSubmitUrl(
    bannerSourceMode.value,
    dataForm.homeBannerUrl,
    bannerExternalUrl.value,
  );
  const profilePosterUrl = resolveSubmitUrl(
    profilePosterSourceMode.value,
    dataForm.profilePosterUrl,
    profilePosterExternalUrl.value,
  );

  if (dataForm.splashEnabled && !splashUrl) {
    message.warning('请上传启动页图片、填写外部链接，或关闭远程启动页');
    return;
  }
  if (dataForm.homeBannerEnabled && !homeBannerUrl) {
    message.warning('请上传首页横幅、填写外部链接，或关闭远程横幅');
    return;
  }
  if (dataForm.profilePosterEnabled && !profilePosterUrl) {
    message.warning('请上传「我的」顶部海报、填写外部链接，或关闭远程海报');
    return;
  }
  if (
    splashUploading.value ||
    bannerUploading.value ||
    profilePosterUploading.value
  ) {
    message.warning('图片仍在上传中，请稍候');
    return;
  }

  submitLoading.value = true;
  try {
    const saved = await appBrandingSave({
      id: dataForm.id || undefined,
      splashUrl,
      splashEnabled: dataForm.splashEnabled,
      homeBannerUrl,
      homeBannerEnabled: dataForm.homeBannerEnabled,
      profilePosterUrl,
      profilePosterEnabled: dataForm.profilePosterEnabled,
    });
    applyBrandingMeta(saved);
  } catch (error) {
    console.error(error);
  } finally {
    submitLoading.value = false;
  }
}

onMounted(() => {
  loadConfig();
});
</script>

<template>
  <Page :auto-content-height="true">
    <Spin :spinning="pageLoading">
      <Card class="max-w-[860px]">
        <template #title>
          <div class="flex flex-col gap-1">
            <span>App 品牌资源</span>
            <span class="text-xs font-normal text-gray-500">
              启动页、首页横幅与「我的」顶部海报可远程配置；保存后自动更新
              revision，App 将刷新缓存
            </span>
          </div>
        </template>
        <template #extra>
          <a-button
            :disabled="submitLoading"
            :loading="pageLoading"
            @click="loadConfig"
          >
            刷新
          </a-button>
        </template>

        <div class="brand-form flex flex-col gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex gap-3">
              <span class="brand-form-label">配置版本（revision）</span>
              <div class="min-w-0 flex-1">
                <span
                  class="text-sm font-mono text-gray-900 dark:text-gray-100"
                >
                  {{ dataForm.revision || '0' }}
                </span>
                <div class="mt-1 text-xs text-gray-500">
                  每次保存自动 bump，App 对比 revision 决定是否刷新品牌图缓存
                </div>
              </div>
            </div>
            <div class="flex gap-3">
              <span class="brand-form-label">最后更新</span>
              <span class="text-sm leading-8 text-gray-600">
                {{ formatTime(dataForm.updatedAt) }} /
                {{ dataForm.updatedBy || '-' }}
              </span>
            </div>
          </div>

          <Divider>启动页</Divider>
          <div class="flex items-center gap-3">
            <span class="brand-form-label">启用远程启动页</span>
            <Switch v-model:checked="dataForm.splashEnabled" />
            <span class="text-xs text-gray-500">
              关闭后 App 使用本地 assets 兜底图
            </span>
          </div>
          <div class="flex items-center gap-3">
            <span class="brand-form-label">图片来源</span>
            <RadioGroup
              v-model:value="splashSourceMode"
              :disabled="!dataForm.splashEnabled"
            >
              <Radio value="upload">上传图片</Radio>
              <Radio value="external">外部链接</Radio>
            </RadioGroup>
          </div>
          <div v-if="splashSourceMode === 'upload'" class="brand-form-content">
            <div
              v-if="splashHasPreview"
              class="flex flex-col items-start gap-2"
            >
              <img
                :src="splashPreviewSrc"
                alt="启动页"
                class="h-[320px] w-[180px] rounded-lg border object-cover"
              />
              <a-button
                danger
                size="small"
                :disabled="submitLoading || splashUploading"
                @click="dataForm.splashUrl = ''"
              >
                删除
              </a-button>
            </div>
            <div
              v-else
              class="max-w-md cursor-pointer rounded-lg border border-dashed px-4 py-6 text-center hover:border-primary"
              :class="{ 'opacity-70': splashUploading }"
              @click="
                !submitLoading &&
                !splashUploading &&
                dataForm.splashEnabled &&
                splashFileInputRef?.click()
              "
            >
              <input
                ref="splashFileInputRef"
                accept="image/*"
                class="hidden"
                type="file"
                @change="onSplashFileChange"
              />
              <div class="text-sm font-medium">
                {{ splashUploading ? '上传中…' : '点击上传启动页图片' }}
              </div>
              <div class="mt-1 text-xs text-gray-500">
                建议全屏竖图；JPG/PNG/WEBP，最大 5MB
              </div>
            </div>
          </div>
          <div v-else class="brand-form-content flex flex-col gap-2">
            <Input
              v-model:value="splashExternalUrl"
              :disabled="!dataForm.splashEnabled"
              placeholder="https://example.com/splash.jpg"
              class="max-w-lg"
            />
            <img
              v-if="splashExternalPreviewSrc"
              :src="splashExternalPreviewSrc"
              alt="启动页预览"
              class="h-[320px] w-[180px] rounded-lg border object-cover"
            />
          </div>

          <Divider>首页横幅</Divider>
          <div class="flex items-center gap-3">
            <span class="brand-form-label">启用远程横幅</span>
            <Switch v-model:checked="dataForm.homeBannerEnabled" />
            <span class="text-xs text-gray-500">
              关闭后 App 使用本地 assets 兜底图
            </span>
          </div>
          <div class="flex items-center gap-3">
            <span class="brand-form-label">图片来源</span>
            <RadioGroup
              v-model:value="bannerSourceMode"
              :disabled="!dataForm.homeBannerEnabled"
            >
              <Radio value="upload">上传图片</Radio>
              <Radio value="external">外部链接</Radio>
            </RadioGroup>
          </div>
          <div v-if="bannerSourceMode === 'upload'" class="brand-form-content">
            <div
              v-if="bannerHasPreview"
              class="flex flex-col items-start gap-2"
            >
              <img
                :src="bannerPreviewSrc"
                alt="首页横幅"
                class="max-h-40 max-w-md rounded-lg border object-cover"
              />
              <a-button
                danger
                size="small"
                :disabled="submitLoading || bannerUploading"
                @click="dataForm.homeBannerUrl = ''"
              >
                删除
              </a-button>
            </div>
            <div
              v-else
              class="max-w-md cursor-pointer rounded-lg border border-dashed px-4 py-6 text-center hover:border-primary"
              @click="
                !submitLoading &&
                !bannerUploading &&
                dataForm.homeBannerEnabled &&
                bannerFileInputRef?.click()
              "
            >
              <input
                ref="bannerFileInputRef"
                accept="image/*"
                class="hidden"
                type="file"
                @change="onBannerFileChange"
              />
              <div class="text-sm font-medium">
                {{ bannerUploading ? '上传中…' : '点击上传首页横幅' }}
              </div>
            </div>
          </div>
          <div v-else class="brand-form-content flex flex-col gap-2">
            <Input
              v-model:value="bannerExternalUrl"
              :disabled="!dataForm.homeBannerEnabled"
              placeholder="https://example.com/home-banner.jpg"
              class="max-w-lg"
            />
            <img
              v-if="bannerExternalPreviewSrc"
              :src="bannerExternalPreviewSrc"
              alt="横幅预览"
              class="max-h-40 max-w-md rounded-lg border object-cover"
            />
          </div>

          <Divider>「我的」顶部海报</Divider>
          <div class="flex items-center gap-3">
            <span class="brand-form-label">启用远程海报</span>
            <Switch v-model:checked="dataForm.profilePosterEnabled" />
            <span class="text-xs text-gray-500">
              默认关闭；关闭后 App 使用本地 assets 兜底图
            </span>
          </div>
          <div class="flex items-center gap-3">
            <span class="brand-form-label">图片来源</span>
            <RadioGroup
              v-model:value="profilePosterSourceMode"
              :disabled="!dataForm.profilePosterEnabled"
            >
              <Radio value="upload">上传图片</Radio>
              <Radio value="external">外部链接</Radio>
            </RadioGroup>
          </div>
          <div
            v-if="profilePosterSourceMode === 'upload'"
            class="brand-form-content"
          >
            <div
              v-if="profilePosterHasPreview"
              class="flex flex-col items-start gap-2"
            >
              <img
                :src="profilePosterPreviewSrc"
                alt="我的顶部海报"
                class="max-h-40 max-w-md rounded-lg border object-cover"
              />
              <a-button
                danger
                size="small"
                :disabled="submitLoading || profilePosterUploading"
                @click="dataForm.profilePosterUrl = ''"
              >
                删除
              </a-button>
            </div>
            <div
              v-else
              class="max-w-md cursor-pointer rounded-lg border border-dashed px-4 py-6 text-center hover:border-primary"
              @click="
                !submitLoading &&
                !profilePosterUploading &&
                dataForm.profilePosterEnabled &&
                profilePosterFileInputRef?.click()
              "
            >
              <input
                ref="profilePosterFileInputRef"
                accept="image/*"
                class="hidden"
                type="file"
                @change="onProfilePosterFileChange"
              />
              <div class="text-sm font-medium">
                {{ profilePosterUploading ? '上传中…' : '点击上传海报图片' }}
              </div>
            </div>
          </div>
          <div v-else class="brand-form-content flex flex-col gap-2">
            <Input
              v-model:value="profilePosterExternalUrl"
              :disabled="!dataForm.profilePosterEnabled"
              placeholder="https://example.com/poster.jpg"
              class="max-w-lg"
            />
            <img
              v-if="profilePosterExternalPreviewSrc"
              :src="profilePosterExternalPreviewSrc"
              alt="海报预览"
              class="max-h-40 max-w-md rounded-lg border object-cover"
            />
          </div>

          <div class="brand-form-actions flex gap-3 pt-2">
            <a-button
              v-access:code="['appBrand:main:list']"
              type="primary"
              :loading="submitLoading"
              @click="submitHandle"
            >
              保存
            </a-button>
            <a-button :disabled="submitLoading" @click="loadConfig">
              刷新
            </a-button>
          </div>
        </div>
      </Card>
    </Spin>
  </Page>
</template>

<style scoped>
/* 对齐 Java el-form label-width=140px：标签列固定宽度、右对齐 */
.brand-form-label {
  flex-shrink: 0;
  width: 140px;
  font-size: 14px;
  line-height: 32px;
  text-align: right;
}

/* 无标签行（上传区）与控件列左缘对齐：140px 标签 + 12px gap */
.brand-form-content,
.brand-form-actions {
  padding-left: 152px;
}
</style>
