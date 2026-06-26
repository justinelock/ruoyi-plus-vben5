<script setup lang="ts">
import type { MemberUserInfo, MemberUserUpdate } from '#/api/member/user/model';

import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { preferences } from '@vben/preferences';

import { Tooltip } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { memberUserInfo, memberUserUpdate } from '#/api/member/user';
import { CropperAvatar } from '#/components/cropper';

import { memberUserEditSchema } from './user-edit-data';

const emit = defineEmits<{ reload: [] }>();

/** 列表/表单展示用：兼容纯 base64 与 data URL */
function resolveAvatarSrc(avatar?: string) {
  const trimmed = avatar?.trim();
  if (!trimmed) {
    return preferences.app.defaultAvatar;
  }
  if (trimmed.startsWith('data:') || trimmed.startsWith('http')) {
    return trimmed;
  }
  return `data:image/jpeg;base64,${trimmed}`;
}

/** 裁剪组件仅本地预览，保存时随 PUT 一并提交 */
async function memberAvatarUpload() {
  return { url: '' };
}

const avatarPreview = ref(preferences.app.defaultAvatar);

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: { class: 'w-full' },
    formItemClass: 'col-span-1',
    labelWidth: 110,
  },
  schema: memberUserEditSchema(),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
});

const [BasicDrawer, drawerApi] = useVbenDrawer({
  onClosed: handleClosed,
  onConfirm: handleSubmit,
  async onOpenChange(isOpen) {
    if (!isOpen) {
      return;
    }
    drawerApi.drawerLoading(true);
    try {
      const { id } = drawerApi.getData() as { id: string };
      const detail = await memberUserInfo(id);
      avatarPreview.value = resolveAvatarSrc(detail.avatar);
      await formApi.setValues(mapDetailToForm(detail));
    } finally {
      drawerApi.drawerLoading(false);
    }
  },
});

function mapDetailToForm(detail: MemberUserInfo) {
  return {
    id: detail.id,
    username: detail.username,
    password: '',
    payPassword: '',
    email: detail.email ?? '',
    mobile: detail.mobile ?? '',
    realName: detail.realName ?? '',
    idCard: detail.idCard ?? '',
    securityQuestion: detail.securityQuestion ?? '',
    securityAnswer: detail.securityAnswer ?? '',
    parentId: detail.parentId ?? detail.parent?.id ?? '',
    inviteCode: detail.inviteCode ?? '',
    commissionRate: detail.commissionRate ?? 0,
    totalCommission: detail.totalCommission ?? 0,
    role: detail.role ?? 'USER',
    creditScore: detail.creditScore ?? 100,
    verificationStatus: detail.verificationStatus ?? 'PENDING',
    accountLocked: detail.accountLocked ?? false,
    status: detail.status ?? 'ACTIVE',
    verified: detail.verified ?? false,
    contractControl: detail.contractControl ?? 3,
    avatar: detail.avatar ?? '',
    remark: detail.remark ?? '',
  };
}

function handleAvatarChange({ source }: { source: string }) {
  avatarPreview.value = source || preferences.app.defaultAvatar;
  formApi.setFieldValue('avatar', source);
}

function buildUpdatePayload(data: Record<string, unknown>): MemberUserUpdate {
  const payload = { ...data } as unknown as MemberUserUpdate;
  // 未改头像时不提交，避免误清空
  const avatar = String(data.avatar ?? '').trim();
  if (!avatar || avatar === preferences.app.defaultAvatar) {
    delete payload.avatar;
  }
  return payload;
}

async function handleSubmit() {
  try {
    drawerApi.lock(true);
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    const data = await formApi.getValues();
    await memberUserUpdate(buildUpdatePayload(data));
    emit('reload');
    drawerApi.close();
  } catch (error) {
    console.error(error);
  } finally {
    drawerApi.lock(false);
  }
}

async function handleClosed() {
  avatarPreview.value = preferences.app.defaultAvatar;
  await formApi.resetForm();
}
</script>

<template>
  <BasicDrawer :title="$t('pages.common.edit')" class="w-[900px]">
    <!-- 头像：与系统用户列表 Avatar 展示一致，点击裁剪上传 -->
    <div class="mb-4 flex items-center gap-4">
      <span class="w-[110px] shrink-0 text-right text-sm text-foreground/80">
        用户头像
      </span>
      <Tooltip title="点击上传头像">
        <CropperAvatar
          :show-btn="false"
          :upload-api="memberAvatarUpload"
          :value="avatarPreview"
          width="64"
          @change="handleAvatarChange"
        />
      </Tooltip>
    </div>
    <BasicForm />
  </BasicDrawer>
</template>
