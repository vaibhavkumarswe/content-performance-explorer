export type StatItem = {
  key: string;
  label: string;
  value: string;
  rawValue: number;
  trend: number;
};

export interface SummaryResponse {
  data: SummaryData;
  period: Period;
}

export interface SummaryData {
  pageviews: Pageviews;
  unique_visitors: UniqueVisitors;
  avg_time_on_page: AvgTimeOnPage;
  bounce_rate: BounceRate;
}

export interface Pageviews {
  value: number;
  trend: number;
}

export interface UniqueVisitors {
  value: number;
  trend: number;
}

export interface AvgTimeOnPage {
  value: number;
  trend: number;
}

export interface BounceRate {
  value: number;
  trend: number;
}

export interface Period {
  start_date: string;
  end_date: string;
}



//Pages

export interface PagesResponse {
  data: PageData[]
}

export interface PageData {
  id: string
  path: string
  title: string
  section: string
  status: string
  first_published: string
  pageviews: number
  unique_visitors: number
  avg_time_on_page: number
  bounce_rate: number
}
