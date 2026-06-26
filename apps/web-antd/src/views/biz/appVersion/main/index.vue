<script setup lang="ts">
/** App 版本管理单页（对齐 Java appreleaseversion.vue） */
import type { AppReleaseUploadOptions } from '#/api/biz/app/version/model';

import { onMounted, reactive, ref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  Card,
  Divider,
  Input,
  message,
  Select,
  Spin,
  Switch,
} from 'antdv-next';
import dayjs from 'dayjs';

import {
  appReleaseUploadOptions,
  appReleaseUploadPackage,
  appVersionActive,
  appVersionUpdate,
} from '#/api/biz/app/version';

const { TextArea } = Input;

const pageLoading = ref(false);
const submitLoading = ref(false);
const apkUploading = ref(false);
const ipaUploading = ref(false);

const uploadDomain = ref('');
const uploadDomains = ref<string[]>([]);
const uploadWwwrootBase = ref('');

const apkFileInputRef = ref<HTMLInputElement | null>(null);
const ipaFileInputRef = ref<HTMLInputElement | null>(null);

const dataForm = reactive({
  id: '',
  version: '',
  description: '',
  downloadUrl: '',
  apkFileUrl: '',
  iosUrl: '',
  ipaFileUrl: '',
  isForce: false,
  isHotUpdate: false,
  updatedAt: '',
});

function formatTime(value?: string) {
  if (!value) return '-';
  const d = dayjs(value);
  return d.isValid() ? d.format('YYYY-MM-DD HH:mm:ss') : value;
}

function parseVersionFromFileName(fileName: string) {
  const name = String(fileName || '').trim();
  const fubang = name.match(/fubang-v([\d.]+)\.(apk|ipa)$/i);
  if (fubang?.[1]) return fubang[1];
  const generic = name.match(/v?(\d+\.\d+\.\d+(?:\.\d+)?)\.(apk|ipa)$/i);
  return generic?.[1] ?? null;
}

function applyConfigData(data: Record<string, unknown>) {
  dataForm.id = String(data.id ?? '');
  dataForm.version = String(data.version ?? '');
  dataForm.description = String(data.description ?? '');
  dataForm.downloadUrl = String(data.downloadUrl ?? '');
  dataForm.apkFileUrl = String(data.apkFileUrl ?? '');
  dataForm.iosUrl = String(data.iosUrl ?? '');
  dataForm.ipaFileUrl = String(data.ipaFileUrl ?? '');
  dataForm.isForce = data.isForce === true;
  dataForm.isHotUpdate = data.isHotUpdate === true;
  dataForm.updatedAt = String(data.updatedAt ?? '');
}

/** 填充发布域名下拉（allowedDomains）及落盘路径 */
function applyUploadOptions(data: AppReleaseUploadOptions) {
  const domains = Array.isArray(data.allowedDomains)
    ? data.allowedDomains.filter(Boolean)
    : [];
  if (domains.length > 0) {
    uploadDomains.value = domains;
  }
  if (data.defaultDomain) {
    uploadDomain.value = data.defaultDomain;
  } else if (domains.length > 0) {
    uploadDomain.value = domains[0] ?? '';
  }
  if (data.wwwrootBase) {
    uploadWwwrootBase.value = data.wwwrootBase;
  }
}

/** 进入页 / 点刷新：并行拉取 options + active */
async function loadPageData() {
  pageLoading.value = true;
  try {
    const [options, version] = await Promise.all([
      appReleaseUploadOptions(),
      appVersionActive(),
    ]);
    applyUploadOptions(options);
    applyConfigData(version as Record<string, unknown>);
  } catch (error) {
    console.error(error);
  } finally {
    pageLoading.value = false;
  }
}

async function copyUrl(raw: string, label: string) {
  const text = String(raw || '').trim();
  if (!text) {
    message.warning(`暂无${label}地址可复制`);
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    message.success(`${label}地址已复制`);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.append(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    textarea.remove();
    if (ok) {
      message.success(`${label}地址已复制`);
    } else {
      message.error('复制失败，请手动复制');
    }
  }
}

async function handleApkUpload(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = '';
  if (!file) return;
  if (!file.name.toLowerCase().endsWith('.apk')) {
    message.warning('请选择 .apk 文件');
    return;
  }
  apkUploading.value = true;
  try {
    await appReleaseUploadPackage(file, uploadDomain.value);
    const parsedVersion = parseVersionFromFileName(file.name);
    await loadPageData();
    if (parsedVersion) {
      message.success(`APK 上传成功，版本号已更新为 ${parsedVersion}`);
    }
  } catch (error) {
    console.error(error);
  } finally {
    apkUploading.value = false;
  }
}

async function handleIpaUpload(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = '';
  if (!file) return;
  if (!file.name.toLowerCase().endsWith('.ipa')) {
    message.warning('请选择 .ipa 文件');
    return;
  }
  ipaUploading.value = true;
  try {
    await appReleaseUploadPackage(file, uploadDomain.value);
    await loadPageData();
  } catch (error) {
    console.error(error);
  } finally {
    ipaUploading.value = false;
  }
}

async function submitHandle() {
  if (!dataForm.version.trim()) {
    message.warning('请输入版本号');
    return;
  }
  if (!dataForm.description.trim()) {
    message.warning('请输入更新说明');
    return;
  }
  if (!dataForm.downloadUrl.trim()) {
    message.warning('请输入 APK 分发地址');
    return;
  }
  if (apkUploading.value || ipaUploading.value) {
    message.warning('安装包仍在上传中，请稍候');
    return;
  }

  submitLoading.value = true;
  try {
    await appVersionUpdate({
      id: dataForm.id || undefined,
      version: dataForm.version.trim(),
      description: dataForm.description.trim(),
      downloadUrl: dataForm.downloadUrl.trim(),
      apkFileUrl: dataForm.apkFileUrl.trim(),
      iosUrl: dataForm.iosUrl.trim(),
      ipaFileUrl: dataForm.ipaFileUrl.trim(),
      isForce: dataForm.isForce,
      isHotUpdate: dataForm.isHotUpdate,
    });
    await loadPageData();
  } catch (error) {
    console.error(error);
  } finally {
    submitLoading.value = false;
  }
}

onMounted(() => {
  loadPageData();
});
</script>

<template>
  <Page :auto-content-height="true">
    <Spin :spinning="pageLoading">
      <Card class="max-w-[900px]">
        <template #title>
          <div class="flex flex-col gap-1">
            <span>App 版本管理</span>
            <span class="text-xs font-normal text-gray-500">
              修改后 App 通过 GET /api/v1/app/versions/latest 获取最新版本信息
            </span>
          </div>
        </template>
        <template #extra>
          <a-button
            :disabled="submitLoading"
            :loading="pageLoading"
            @click="loadPageData"
          >
            刷新
          </a-button>
        </template>

        <div class="version-form flex flex-col gap-4">
          <div class="flex gap-3">
            <span class="version-form-label">最后更新</span>
            <span class="text-sm leading-8 text-gray-600">
              {{ formatTime(dataForm.updatedAt) }}
            </span>
          </div>

          <div class="flex items-center gap-3">
            <span class="version-form-label required">版本号</span>
            <Input
              v-model:value="dataForm.version"
              class="max-w-xs"
              placeholder="如 1.0.0"
            />
          </div>

          <div class="flex items-start gap-3">
            <span class="version-form-label required pt-1">更新说明</span>
            <TextArea
              v-model:value="dataForm.description"
              :maxlength="2000"
              :rows="5"
              class="max-w-lg"
              placeholder="请输入更新说明，App 更新弹窗将展示此内容"
              show-count
            />
          </div>

          <Divider>安装包上传</Divider>

          <div class="flex items-start gap-3">
            <span class="version-form-label pt-1">发布域名</span>
            <div class="min-w-0 flex-1">
              <Select
                v-model:value="uploadDomain"
                class="max-w-xs"
                :options="uploadDomains.map((d) => ({ label: d, value: d }))"
                placeholder="选择域名"
              />
              <div
                v-if="uploadWwwrootBase && uploadDomain"
                class="mt-1 text-xs text-gray-500"
              >
                落盘 {{ uploadWwwrootBase }}/{{ uploadDomain }}/download/
              </div>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <span class="version-form-label pt-1">上传 APK</span>
            <div class="flex flex-wrap items-center gap-3">
              <input
                ref="apkFileInputRef"
                accept=".apk,application/vnd.android.package-archive"
                class="hidden"
                type="file"
                @change="handleApkUpload"
              />
              <a-button
                :loading="apkUploading"
                @click="apkFileInputRef?.click()"
              >
                选择 APK 并上传
              </a-button>
              <span class="text-xs text-gray-500">
                上传后同步更新 APK 文件地址、APK
                分发地址及版本号（可从文件名解析）
              </span>
            </div>
          </div>

          <div class="flex gap-3">
            <span class="version-form-label">APK 文件地址</span>
            <div class="flex min-w-0 flex-1 max-w-2xl gap-2">
              <Input
                v-model:value="dataForm.apkFileUrl"
                placeholder="上传 APK 后自动填入，也可手动输入或修改"
              />
              <a-button
                :disabled="!dataForm.apkFileUrl.trim()"
                @click="copyUrl(dataForm.apkFileUrl, 'APK 文件')"
              >
                复制
              </a-button>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <span class="version-form-label pt-1">上传 IPA</span>
            <div class="flex flex-wrap items-center gap-3">
              <input
                ref="ipaFileInputRef"
                accept=".ipa"
                class="hidden"
                type="file"
                @change="handleIpaUpload"
              />
              <a-button
                :loading="ipaUploading"
                @click="ipaFileInputRef?.click()"
              >
                选择 IPA 并上传
              </a-button>
              <span class="text-xs text-gray-500">
                上传后仅更新 IPA 文件地址，不修改下方 iOS 分发地址
              </span>
            </div>
          </div>

          <div class="flex gap-3">
            <span class="version-form-label">IPA 文件地址</span>
            <div class="flex min-w-0 flex-1 max-w-2xl gap-2">
              <Input
                v-model:value="dataForm.ipaFileUrl"
                placeholder="上传 IPA 后自动填入，也可手动输入或修改"
              />
              <a-button
                :disabled="!dataForm.ipaFileUrl.trim()"
                @click="copyUrl(dataForm.ipaFileUrl, 'IPA 文件')"
              >
                复制
              </a-button>
            </div>
          </div>

          <Divider>App 分发地址</Divider>

          <div class="flex gap-3">
            <span class="version-form-label required">APK 分发地址</span>
            <div class="flex min-w-0 flex-1 max-w-2xl gap-2">
              <Input
                v-model:value="dataForm.downloadUrl"
                placeholder="App 检测更新使用的 APK 地址；上传 APK 时默认与文件地址相同，可改为外链"
              />
              <a-button
                :disabled="!dataForm.downloadUrl.trim()"
                @click="copyUrl(dataForm.downloadUrl, 'APK 分发')"
              >
                复制
              </a-button>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <span class="version-form-label pt-1">iOS 分发地址</span>
            <div class="min-w-0 flex-1 max-w-2xl">
              <div class="flex gap-2">
                <Input
                  v-model:value="dataForm.iosUrl"
                  placeholder="App Store / TestFlight / itms-services 等分发链接"
                />
                <a-button
                  :disabled="!dataForm.iosUrl.trim()"
                  @click="copyUrl(dataForm.iosUrl, 'iOS 分发')"
                >
                  复制
                </a-button>
              </div>
              <div class="mt-1 text-xs text-gray-500">
                与 IPA 文件地址无关；填写用户实际跳转安装的分发链接
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <span class="version-form-label">强制更新</span>
            <Switch v-model:checked="dataForm.isForce" />
            <span class="text-xs text-gray-500">
              开启后 App 检测到新版本将强制升级
            </span>
          </div>

          <div class="flex items-center gap-3">
            <span class="version-form-label">热更新</span>
            <Switch v-model:checked="dataForm.isHotUpdate" />
            <span class="text-xs text-gray-500">
              标记为热更新版本（按 App 端逻辑处理）
            </span>
          </div>

          <div class="version-form-actions flex gap-3 pt-2">
            <a-button
              v-access:code="['appVersion:main:list']"
              type="primary"
              :loading="submitLoading"
              @click="submitHandle"
            >
              保存
            </a-button>
            <a-button :disabled="submitLoading" @click="loadPageData">
              刷新
            </a-button>
          </div>
        </div>
      </Card>
    </Spin>
  </Page>
</template>

<style scoped>
.version-form-label {
  flex-shrink: 0;
  width: 140px;
  font-size: 14px;
  line-height: 32px;
  text-align: right;
}

.version-form-label.required::before {
  margin-right: 4px;
  color: #ff4d4f;
  content: '*';
}

.version-form-actions {
  padding-left: 152px;
}
</style>
