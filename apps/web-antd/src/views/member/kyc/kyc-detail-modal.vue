<script setup lang="tsx">
import type { DescriptionsProps } from 'antdv-next';

import type { MemberKyc } from '#/api/member/kyc/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Descriptions, Image } from 'antdv-next';

import { renderAuthStatus } from './data';
import { resolveKycImageUrl } from './kyc-image';

const kycRecord = ref<MemberKyc>();

const [BasicModal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (!isOpen) {
      return;
    }
    // 列表行已含详情字段，直接展示无需再请求
    kycRecord.value = modalApi.getData() as MemberKyc;
  },
  onClosed() {
    kycRecord.value = undefined;
  },
});

const items = computed<DescriptionsProps['items']>(() => {
  if (!kycRecord.value) {
    return [];
  }
  const data = kycRecord.value;
  return [
    { label: '用户ID', content: data.userId || '-' },
    { label: '姓名', content: data.realName || '-' },
    { label: '身份证号', content: data.idCardNo || '-' },
    {
      label: '认证状态',
      content: renderAuthStatus(data.status),
    },
    { label: '提交时间', content: data.createdAt || '-' },
    { label: '认证时间', content: data.verifiedAt || '-' },
    { label: '拒绝原因', content: data.rejectReason || '-' },
  ];
});

const idCardFrontUrl = computed(() =>
  resolveKycImageUrl(kycRecord.value?.idCardFront),
);
const idCardBackUrl = computed(() =>
  resolveKycImageUrl(kycRecord.value?.idCardBack),
);
</script>

<template>
  <BasicModal
    :footer="false"
    :fullscreen-button="false"
    class="w-[920px]"
    title="详情"
  >
    <div v-if="kycRecord" class="flex gap-6">
      <Descriptions
        bordered
        class="w-[300px] shrink-0"
        :column="1"
        :items="items"
        size="small"
      />
      <div class="flex min-w-0 flex-1 gap-4">
        <div class="flex min-w-0 flex-1 flex-col gap-2">
          <div class="text-center text-sm text-gray-500">身份证正面</div>
          <Image
            v-if="idCardFrontUrl"
            class="rounded border border-gray-200 object-contain"
            :height="200"
            preview
            :src="idCardFrontUrl"
            width="100%"
          />
          <div
            v-else
            class="flex h-[220px] items-center justify-center rounded border border-dashed border-gray-300 text-gray-400"
          >
            暂无图片
          </div>
        </div>
        <div class="flex min-w-0 flex-1 flex-col gap-2">
          <div class="text-center text-sm text-gray-500">身份证反面</div>
          <Image
            v-if="idCardBackUrl"
            class="rounded border border-gray-200 object-contain"
            :height="200"
            preview
            :src="idCardBackUrl"
            width="100%"
          />
          <div
            v-else
            class="flex h-[220px] items-center justify-center rounded border border-dashed border-gray-300 text-gray-400"
          >
            暂无图片
          </div>
        </div>
      </div>
    </div>
  </BasicModal>
</template>
