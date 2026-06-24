export interface InvestList {
  id: string;
  investCode: string;
  investName: string;
  logo: string;
  productDesc: string;
  status: string;
  soldOut: string;
  sortOrder: string;
  yieldDisplay: string;
  yieldRate: string;
  investableAmount: string;
  minAddAmount: string;
  period: string;
  yieldType: string;
  expireDate: string;
  createTime: string;
  updateTime: string;
}

export interface InvestListQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  status?: string;
  soldOut?: string;
  createTime?: string[];
  [key: string]: any;
}
