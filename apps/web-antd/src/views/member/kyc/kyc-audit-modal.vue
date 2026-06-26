<script setup lang="tsx">
import type { DescriptionsProps } from 'antdv-next';

import type { MemberKyc } from '#/api/member/kyc/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Descriptions, Image, Input, RadioGroup } from 'antdv-next';

import { memberKycVerify } from '#/api/member/kyc';

import { resolveKycImageUrl } from './kyc-image';

const emit = defineEmits<{ reload: [] }>();

const kycRecord = ref<MemberKyc>();
const verifyState = ref<'REJECTED' | 'VERIFIED'>('VERIFIED');
const remark = ref('');

const auditOptions = [
  { label: '通过', value: 'VERIFIED' as const },
  { label: '拒绝', value: 'REJECTED' as const },
];

const [BasicModal, modalApi] = useVbenModal({
  onClosed: handleClosed,
  onConfirm: handleSubmit,
  onOpenChange(isOpen) {
    if (!isOpen) {
      return;
    }
    kycRecord.value = modalApi.getData() as MemberKyc;
    verifyState.value = 'VERIFIED';
    remark.value = '';
  },
});

// 用户信息与审核结果同一 Descriptions 表格（对齐参考图）
const infoItems = computed<DescriptionsProps['items']>(() => {
  if (!kycRecord.value) {
    return [];
  }
  const data = kycRecord.value;
  return [
    { label: '用户ID', content: data.userId || '-' },
    { label: '姓名', content: data.realName || '-' },
    { label: '身份证号', content: data.idCardNo || '-' },
    {
      label: '审核结果',
      content: (
        <div class="kyc-audit-result">
          <RadioGroup
            button-style="solid"
            class="kyc-audit-radio"
            onChange={(e) => {
              verifyState.value = e.target.value as 'REJECTED' | 'VERIFIED';
            }}
            option-type="button"
            options={auditOptions}
            size="small"
            value={verifyState.value}
          />
          {verifyState.value === 'REJECTED' ? (
            <Input.TextArea
              allowClear
              maxlength={255}
              onChange={(e) => {
                remark.value = e.target.value ?? '';
              }}
              placeholder="请输入拒绝原因"
              rows={4}
              showCount
              value={remark.value}
            />
          ) : null}
        </div>
      ),
    },
  ];
});

const idCardFrontUrl = computed(() =>
  resolveKycImageUrl(kycRecord.value?.idCardFront),
);
const idCardBackUrl = computed(() =>
  resolveKycImageUrl(kycRecord.value?.idCardBack),
);

function handleClosed() {
  kycRecord.value = undefined;
  verifyState.value = 'VERIFIED';
  remark.value = '';
}

async function handleSubmit() {
  if (!kycRecord.value) {
    return;
  }
  if (verifyState.value === 'REJECTED' && !remark.value.trim()) {
    window.message.error('请输入拒绝原因');
    return;
  }
  modalApi.modalLoading(true);
  try {
    await memberKycVerify({
      id: kycRecord.value.id,
      state: verifyState.value,
      remark: remark.value.trim() || undefined,
    });
    emit('reload');
    modalApi.close();
  } finally {
    modalApi.modalLoading(false);
  }
}
</script>

<template>
  <BasicModal
    :fullscreen-button="false"
    class="kyc-audit-modal w-[920px]"
    title="实名认证审核"
  >
    <div v-if="kycRecord" class="flex min-h-[300px] gap-6">
      <Descriptions
        bordered
        class="kyc-audit-desc w-[340px] shrink-0"
        :column="1"
        :items="infoItems"
        size="small"
      />
      <div class="flex min-h-0 min-w-0 flex-1 gap-4">
        <div class="flex min-w-0 flex-1 flex-col gap-2">
          <div class="text-center text-sm text-gray-500">身份证正面</div>
          <Image
            v-if="idCardFrontUrl"
            class="rounded border border-gray-200 object-contain"
            :height="240"
            preview
            :src="idCardFrontUrl"
            width="100%"
          />
          <div
            v-else
            class="flex h-[260px] items-center justify-center rounded border border-dashed border-gray-300 text-gray-400"
          >
            暂无图片
          </div>
        </div>
        <div class="flex min-w-0 flex-1 flex-col gap-2">
          <div class="text-center text-sm text-gray-500">身份证反面</div>
          <Image
            v-if="idCardBackUrl"
            class="rounded border border-gray-200 object-contain"
            :height="240"
            preview
            :src="idCardBackUrl"
            width="100%"
          />
          <div
            v-else
            class="flex h-[260px] items-center justify-center rounded border border-dashed border-gray-300 text-gray-400"
          >
            暂无图片
          </div>
        </div>
      </div>
    </div>
  </BasicModal>
</template>

<style scoped>
.kyc-audit-modal :deep(.ant-modal-body) {
  min-height: 520px;
  overflow: visible;
}

/* 标签列居中、浅灰底，对齐参考图 */
.kyc-audit-desc :deep(.ant-descriptions-item-label) {
  width: 96px;
  vertical-align: middle;
  text-align: center;
  background-color: #fafafa;
}

.kyc-audit-desc :deep(.ant-descriptions-item-content) {
  vertical-align: middle;
}

/* 审核结果：通过/拒绝一行，拒绝原因在下方 */
.kyc-audit-desc :deep(.kyc-audit-result) {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 4px 0;
  margin-bottom: 12px;
}

.kyc-audit-desc :deep(.kyc-audit-radio) {
  display: inline-flex;
  flex-wrap: nowrap;
}

.kyc-audit-desc :deep(.kyc-audit-radio .ant-radio-button-wrapper) {
  min-width: 64px;
  text-align: center;
}
</style>
