/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SelectChangeEvent, SxProps, Theme } from "@mui/material";
import type { JSX } from "react";

export interface TableHeaderData {
  id: string;
  label: string;
  align: "inherit" | "left" | "center" | "right" | "justify";
  isSortable: boolean;
  key?: string;
  checked?: boolean;
  headerTableCellStyle?: SxProps<Theme>;
  category?: string;
}

export interface TableHeadComponentProps {
  isLoading: boolean;
  tableHeadRowCustomStyles: SxProps<Theme>;
  tableHeaderData: TableHeaderData[];
  handleSort: (orderBy: string, order: Order) => void;
  tableDataCount: number;
  order: Order;
  orderBy: string;
}

export interface TableHeadLoaderProps {
  rowCustomStyles: SxProps<Theme>;
  colsNum: number;
}

export type Order = "asc" | "desc";

export interface TableBodyComponentProps {
  isLoading: boolean;
  tableDataCount: number;
  tableBodyCustomStyles: SxProps<Theme>;
  loadingRowsNum: number;
  loadingColsNum: number;
  tableBodyLoaderRowCustomStyles: SxProps<Theme>;
  tableBody: JSX.Element;
}

export interface TableBodyLoaderProps {
  rowsNum: number;
  colsNum: number;
  rowCustomStyles: SxProps<Theme>;
}

export interface TableBodyData {
  [key: string]: any;
}

export interface DataTableProps {
  loading?: boolean;
  tableBody?: JSX.Element;
  tableContainerStyles?: SxProps<Theme>;
  tableHeaderData?: TableHeaderData[];
  tableHeadRowCustomStyles?: SxProps<Theme>;
  tableBodyCustomStyles?: SxProps<Theme>;
  tableBodyLoaderRowCustomStyles?: SxProps<Theme>;
  isPaginationVisible?: boolean;
  tableDataCount?: number;
  handleSort?: (orderBy: string, order: Order) => void;
  isShowMoreVisible?: boolean;
  handleShowMore?: () => void;
  loadingRowsNum?: number;
  noResultMsg?: string;
  sortDirection?: Order;
  sortBy?: string;
  manualResponsiveBody?: boolean;
  ManualResponsiveBodyComponent?: JSX.Element;
  pagination?: PaginationProps;
}

export interface PaginationProps {
  page: number;
  total: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => void;
  onPageSizeChange?: (event: SelectChangeEvent<number>) => void;
  pageSizeOptions?: number[];
}
