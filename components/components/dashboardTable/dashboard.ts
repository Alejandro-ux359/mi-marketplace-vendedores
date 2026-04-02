import type { ReactNode } from "react";

export interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon?: ReactNode;
  color?: "primary" | "success" | "error" | "warning" | "info";
  prefix?: string;
  suffix?: string;
}

export interface SparklinePoint {
  label: string;
  value: number;
}

export interface SparklineCardProps {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  data: SparklinePoint[];
  color?: string;
  prefix?: string;
  suffix?: string;
}

export interface BarChartPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

export interface BarChartCardProps {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  data: BarChartPoint[];
  color?: string;
  secondaryColor?: string;
  prefix?: string;
  suffix?: string;
  seriesLabel?: string;
  secondarySeriesLabel?: string;
}

export type ColumnAlign = "left" | "center" | "right";

export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T & string;
  label: string;
  align?: ColumnAlign;
  width?: number | string;
  renderCell?: (value: T[keyof T], row: T) => ReactNode;
}

export interface DataTableProps<T = Record<string, unknown>> {
  title?: string;
  columns: TableColumn<T>[];
  rows: T[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  onRowClick?: (row: T) => void;
  loading?: boolean;
}

export interface DonutSegment {
  label: string;
  value: number;
  color?: string;
  flag?: string;
}

export interface DonutChartProps {
  title: string;
  total?: string | number;
  totalLabel?: string;
  segments: DonutSegment[];
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

export interface NavTreeProps {
  title: string;
  items: NavItem[];
  activeHref?: string;
  onItemClick?: (item: NavItem) => void;
}
