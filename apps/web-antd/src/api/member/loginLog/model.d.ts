export interface MemberLoginLog {
  id: string;
  userName: string;
  deviceId: string;
  loginTime: string;
  loginIp: string;
  loginLocation: string;
  loginMethod: string;
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
