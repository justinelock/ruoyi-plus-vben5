export interface NotifyNews {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  link: string;
  image: string;
  viewCount: string;
  publishTime: string;
}

export interface NotifyNewsQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
  source?: string;
  publishTime?: string[];
  [key: string]: any;
}
