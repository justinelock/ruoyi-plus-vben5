/** 登录记录列表行（对齐 MemberLoginLogItem） */
export interface MemberLoginLog {
  id: string;
  userId: string;
  username: string;
  realName: string;
  deviceId: string;
  loginTime: string;
  loginIp: string;
  loginLocation: string;
  loginType: string;
  loginResult: string;
  failReason: string;
  riskLevel: string;
  riskDetail: string;
}

export interface MemberLoginLogQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  loginResult?: string;
  loginMethod?: string;
  riskLevel?: string;
  ipType?: string;
  timeRange?: string;
  failReason?: string;
  deviceType?: string;
  browser?: string;
  [key: string]: any;
}
