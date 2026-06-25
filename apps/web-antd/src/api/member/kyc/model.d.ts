/** 实名认证列表行（对齐 MemberKycItem） */
export interface MemberKyc {
  id: string;
  userId: string;
  username: string;
  mobile: string;
  realName: string;
  idCardNo: string;
  idCardFront: string;
  idCardBack: string;
  status: string;
  rejectReason: string;
  verifiedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface MemberKycQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  authStatus?: string;
  idCardNo?: string;
  username?: string;
  realName?: string;
  submitTime?: string[];
  [key: string]: any;
}
