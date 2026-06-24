export interface NotifyPublish {
  id: string;
  receiveUserId: string;
  title: string;
  content: string;
  notifyType: string;
  readStatus: string;
  deleted: string;
  sendTime: string;
  expireTime: string;
}

export interface NotifyPublishQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  notifyType?: string;
  readStatus?: string;
  sendTime?: string[];
  [key: string]: any;
}
