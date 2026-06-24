export interface InvestPosition {
  id: string;
  userName: string;
  realName: string;
  investCode: string;
  positionAmount: string;
  buyDate: string;
  startDate: string;
  endDate: string;
  periodDays: string;
  fixedYieldRate: string;
  positionStatus: string;
  endStatus: string;
  lastProfitDate: string;
  createTime: string;
  updateTime: string;
}

export interface InvestPositionQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  investCode?: string;
  positionStatus?: string;
  createTime?: string[];
  [key: string]: any;
}
