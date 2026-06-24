/** 实名认证列表行 */
export interface MemberKyc {
  id: string;
  userName: string;
  realName: string;
  phoneNumber: string;
  idCardNo: string;
  /** 身份证正面照 URL */
  idCardFront: string;
  /** 身份证反面照 URL */
  idCardBack: string;
  /** 0 未认证 / 1 已认证 / 2 认证中 / 3 已拒绝 */
  authStatus: string;
  rejectReason: string;
  submitTime: string;
  authTime: string;
}

export interface MemberKycQuery {
  pageNum?: number;
  pageSize?: number;
  /** 用户名 / 手机号 / 身份证号 */
  keyword?: string;
  authStatus?: string;
  submitTime?: string[];
  [key: string]: any;
}
