export interface NotifyNews {
  id: string;
  title?: string;
  summary?: string;
  content?: string;
  source?: string;
  category?: string;
  url?: string;
  imageUrl?: string;
  viewCount?: number;
  publishTime?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NotifyNewsQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  source?: string;
  category?: string;
  orderField?: string;
  order?: string;
  publishTime?: string[];
  [key: string]: any;
}

export interface NotifyNewsSaveReq {
  id?: string;
  title: string;
  summary?: string;
  content?: string;
  source?: string;
  category?: string;
  url?: string;
  imageUrl?: string;
  viewCount?: number;
  publishTime?: string;
}
