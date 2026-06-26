/** 分析页快捷列表精简列（复用各业务页渲染逻辑） */
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Image, Space, Tag } from 'antdv-next';

import { statusTagMap as rechargeStatusTagMap } from '#/views/biz/fund/recharge/data';
import { statusTagMap as withdrawStatusTagMap } from '#/views/biz/fund/withdraw/data';
import { renderCopyableValue } from '#/utils/render-copyable';

const walletAccountTypeLabelMap: Record<string, string> = {
  main: '主账户',
  fund: '投信账户',
  forex: '外汇账户',
  future: '期货账户',
};

const walletStatusTagMap: Record<string, { color: string; label: string }> = {
  PENDING: { color: 'processing', label: '待审核' },
  APPROVED: { color: 'success', label: '已通过' },
  REJECTED: { color: 'error', label: '已拒绝' },
};

const actionColumn: NonNullable<VxeGridProps['columns']>[number] = {
  field: 'action',
  fixed: 'right',
  slots: { default: 'action' },
  title: '操作',
  resizable: false,
  width: 'auto',
};

/** 实名认证快捷列 */
export const kycShortcutColumns: VxeGridProps['columns'] = [
  {
    field: 'username',
    title: '用户名',
    minWidth: 130,
    slots: {
      default: ({ row }) => renderCopyableValue(row.username),
    },
  },
  {
    field: 'mobile',
    title: '手机号',
    minWidth: 120,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'realName',
    title: '真实姓名',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'idCardNo',
    title: '身份证号',
    minWidth: 160,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'idCardFront',
    title: '证件照片',
    minWidth: 110,
    slots: {
      default: ({ row }) => {
        const photos = [row.idCardFront, row.idCardBack].filter(Boolean);
        if (photos.length === 0) {
          return '-';
        }
        return (
          <Space size={4}>
            {photos.map((url: string, index: number) => (
              <Image
                key={index}
                class="rounded-sm object-cover"
                height={32}
                src={url}
                width={48}
              />
            ))}
          </Space>
        );
      },
    },
  },
  {
    field: 'createdAt',
    title: '创建时间',
    minWidth: 160,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  actionColumn,
];

/** 钱包申请快捷列 */
export const walletShortcutColumns: VxeGridProps['columns'] = [
  {
    field: 'username',
    title: '用户名',
    minWidth: 130,
    slots: {
      default: ({ row }) => renderCopyableValue(row.username),
    },
  },
  {
    field: 'mobile',
    title: '手机号',
    minWidth: 120,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'realName',
    title: '真实姓名',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'accountType',
    title: '账户类型',
    minWidth: 100,
    formatter({ cellValue }) {
      return walletAccountTypeLabelMap[cellValue as string] ?? cellValue ?? '-';
    },
  },
  {
    field: 'status',
    title: '状态',
    minWidth: 90,
    slots: {
      default: ({ row }) => {
        const item = walletStatusTagMap[row.status] ?? {
          color: 'default',
          label: row.status || '-',
        };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
  },
  {
    field: 'riskAssessmentScore',
    title: '风险评估分',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue ?? '-';
    },
  },
  {
    field: 'applyTime',
    title: '申请时间',
    minWidth: 160,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  actionColumn,
];

/** 充值数据快捷列 */
export const rechargeShortcutColumns: VxeGridProps['columns'] = [
  {
    field: 'username',
    title: '用户名',
    minWidth: 130,
    slots: {
      default: ({ row }) => renderCopyableValue(row.username),
    },
  },
  {
    field: 'mobile',
    title: '手机号',
    minWidth: 120,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'realName',
    title: '真实姓名',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'amount',
    title: '充值金额',
    minWidth: 110,
    formatter({ cellValue }) {
      const num = Number(cellValue ?? 0);
      return num.toFixed(2);
    },
  },
  {
    field: 'status',
    title: '状态',
    minWidth: 90,
    slots: {
      default: ({ row }) => {
        const item = rechargeStatusTagMap[row.status] ?? {
          color: 'default',
          label: row.status || '-',
        };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
  },
  {
    field: 'screenshot',
    title: '充值截图',
    minWidth: 100,
    slots: {
      default: ({ row }) =>
        row.screenshot ? (
          <Image
            class="rounded object-cover"
            height={32}
            src={row.screenshot}
            width={48}
          />
        ) : (
          '-'
        ),
    },
  },
  {
    field: 'createdAt',
    title: '申请时间',
    minWidth: 160,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  actionColumn,
];

/** 提现数据快捷列 */
export const withdrawShortcutColumns: VxeGridProps['columns'] = [
  {
    field: 'username',
    title: '用户名',
    minWidth: 130,
    slots: {
      default: ({ row }) => renderCopyableValue(row.username),
    },
  },
  {
    field: 'mobile',
    title: '手机号',
    minWidth: 120,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'realName',
    title: '真实姓名',
    minWidth: 100,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  {
    field: 'amount',
    title: '提现金额',
    minWidth: 110,
    formatter({ cellValue }) {
      const num = Number(cellValue ?? 0);
      return num.toFixed(2);
    },
  },
  {
    field: 'status',
    title: '状态',
    minWidth: 90,
    slots: {
      default: ({ row }) => {
        const item = withdrawStatusTagMap[row.status] ?? {
          color: 'default',
          label: row.status || '-',
        };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
  },
  {
    field: 'createdAt',
    title: '申请时间',
    minWidth: 160,
    formatter({ cellValue }) {
      return cellValue || '-';
    },
  },
  actionColumn,
];
