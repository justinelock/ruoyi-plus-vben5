import type { MemberUser } from '#/api/member/user/model';

import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

import { Tag, Tooltip } from 'antdv-next';

import { copyText } from './copy-text';

/** 认证状态筛选项（业务字典未接入前使用固定选项） */
const authStatusOptions = [
  { label: '未认证', value: '0' },
  { label: '已认证', value: '1' },
  { label: '认证中', value: '2' },
];

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'keyword',
    componentProps: {
      placeholder: '用户名/手机号/用户ID',
      class: 'w-[220px]',
    },
    formItemClass: 'pb-0',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      allowClear: true,
      class: 'w-[140px]',
      options: authStatusOptions,
      placeholder: '认证状态',
    },
    fieldName: 'authStatus',
    formItemClass: 'pb-0',
  },
  {
    component: 'RangePicker',
    fieldName: 'createTime',
    componentProps: {
      class: 'w-[280px]',
      placeholder: ['开始日期', '结束日期'],
    },
    formItemClass: 'pb-0',
  },
];

type ColumnHandlers = {
  onOpenWallet: (row: MemberUser) => void;
};

function stopRowClick(e: Event) {
  e.stopPropagation();
}

/** fluent:copy-16-filled（UnoCSS iconify） */
function CopyIcon({ onClick }: { onClick: (e: MouseEvent) => void }) {
  return (
    <span
      class="size-14px icon-[fluent--copy-16-filled] inline-block shrink-0 cursor-pointer text-primary hover:opacity-80"
      onClick={onClick}
    />
  );
}

/** fluent:wallet-16-filled */
function WalletIcon({
  disabled,
  onClick,
}: {
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
}) {
  return (
    <span
      class={
        disabled
          ? 'size-14px icon-[fluent--wallet-16-filled] inline-block shrink-0 text-muted-foreground opacity-40'
          : 'size-14px icon-[fluent--wallet-16-filled] inline-block shrink-0 cursor-pointer text-primary hover:opacity-80'
      }
      onClick={onClick}
    />
  );
}

/** fluent:contact-card-16-filled */
function IdCardIcon({
  disabled,
  onClick,
}: {
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
}) {
  return (
    <span
      class={
        disabled
          ? 'size-14px icon-[fluent--contact-card-16-filled] inline-block shrink-0 text-muted-foreground opacity-40'
          : 'size-14px icon-[fluent--contact-card-16-filled] inline-block shrink-0 cursor-pointer text-primary hover:opacity-80'
      }
      onClick={onClick}
    />
  );
}

/** 值 + 复制图标 */
function renderCopyableValue(value?: null | number | string) {
  const text = value === null || value === undefined || value === '' ? '-' : String(value);
  return (
    <span class="inline-flex items-center gap-1">
      <span>{text}</span>
      {text !== '-' ? (
        <Tooltip title="复制">
          <CopyIcon
            onClick={(e) => {
              stopRowClick(e);
              copyText(text);
            }}
          />
        </Tooltip>
      ) : null}
    </span>
  );
}

function formatAmount(value?: number) {
  if (value === null || value === undefined) {
    return '0.00';
  }
  return Number(value).toFixed(2);
}

/** fb_users.status：ACTIVE 为正常 */
function renderMemberStatus(status?: string) {
  if (status === 'ACTIVE') {
    return <Tag color="success">正常</Tag>;
  }
  if (status === 'DISABLED' || status === 'INACTIVE') {
    return <Tag color="error">停用</Tag>;
  }
  return <Tag>{status || '-'}</Tag>;
}

export function createColumns(handlers: ColumnHandlers): VxeGridProps['columns'] {
  return [
    { type: 'checkbox', width: 60 },
    {
      field: 'username',
      title: '用户名',
      minWidth: 140,
      slots: {
        default: ({ row }) => renderCopyableValue(row.username),
      },
    },
    {
      field: 'totalBalance',
      title: '账户总余额',
      minWidth: 140,
      slots: {
        default: ({ row }) => {
          const balance = formatAmount(row.totalBalance);
          const openWallet = (e: Event) => {
            stopRowClick(e);
            handlers.onOpenWallet(row as MemberUser);
          };
          return (
            <span class="inline-flex items-center gap-1">
              <span
                class="cursor-pointer text-primary underline decoration-primary/60 underline-offset-2 hover:opacity-80"
                onClick={openWallet}
              >
                {balance}
              </span>
              <Tooltip title="查看钱包">
                <WalletIcon onClick={openWallet} />
              </Tooltip>
            </span>
          );
        },
      },
    },
    {
      field: 'fundPositionAmount',
      title: '投信持仓/分红',
      minWidth: 150,
      slots: {
        default: ({ row }) => {
          const position = Number(row.fundPositionAmount ?? 0);
          const dividend = Number(row.fundPositionDividend ?? 0);
          return (
            <span>
              <span class={position > 0 ? 'font-bold text-[#1677ff]' : ''}>
                {position}
              </span>
              <span>/</span>
              <span class={dividend > 0 ? 'font-bold text-[#ff4d4f]' : ''}>
                {dividend}
              </span>
            </span>
          );
        },
      },
    },
    {
      field: 'realName',
      title: '真实姓名',
      minWidth: 140,
      slots: {
        default: ({ row }) => {
          const name = row.realName || '-';
          const idCard = row.idCard?.trim();
          return (
            <span class="inline-flex items-center gap-1">
              <span>{name}</span>
              {name !== '-' ? (
                <Tooltip title="复制姓名">
                  <CopyIcon
                    onClick={(e) => {
                      stopRowClick(e);
                      copyText(name);
                    }}
                  />
                </Tooltip>
              ) : null}
              {idCard ? (
                <Tooltip title={`证件号：${idCard}（点击复制）`}>
                  <IdCardIcon
                    onClick={(e) => {
                      stopRowClick(e);
                      copyText(idCard);
                    }}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="无证件号">
                  <IdCardIcon disabled />
                </Tooltip>
              )}
            </span>
          );
        },
      },
    },
    {
      field: 'onlineStatus',
      title: '在线状态',
      minWidth: 100,
      slots: {
        default: ({ row }) => {
          const online = row.onlineStatus === 1;
          return (
            <Tag color={online ? 'success' : 'default'}>
              {online ? '在线' : '离线'}
            </Tag>
          );
        },
      },
    },
    {
      field: 'status',
      title: '用户状态',
      minWidth: 100,
      slots: {
        default: ({ row }) => renderMemberStatus(row.status),
      },
    },
    {
      field: 'inviteCode',
      title: '邀请码',
      minWidth: 120,
      slots: {
        default: ({ row }) => renderCopyableValue(row.inviteCode),
      },
    },
    {
      field: 'createdAt',
      title: '创建时间',
      minWidth: 160,
    },
    {
      field: 'lastLogin',
      title: '最后登录时间',
      minWidth: 160,
      formatter({ cellValue }) {
        return cellValue || '-';
      },
    },
    {
      field: 'id',
      title: 'ID',
      minWidth: 200,
      slots: {
        default: ({ row }) => renderCopyableValue(row.id),
      },
    },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      resizable: false,
      width: 'auto',
    },
  ];
}

export { authStatusOptions };
