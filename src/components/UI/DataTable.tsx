import React, { type JSX } from "react";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Table,
  TableContainer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TableHeadComponent from "./Table/TableHeaderComponent";
import TableBodyComponent from "./Table/TableBodyComponent";
import type { DataTableProps } from "./Table/tableTypes";
import { TableMobileCardLoading } from "./Loading/TableBodyCardLoader";

export interface Column {
  key: string;
  title: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  width?: string;
  render?: (value: unknown, row: unknown) => React.ReactNode;
}

export function DataTable({
  loading = false,
  tableBody = <></>,
  tableHeaderData = [],
  tableContainerStyles = {},
  tableHeadRowCustomStyles = {},
  tableBodyCustomStyles = {},
  tableBodyLoaderRowCustomStyles = {},
  isPaginationVisible = true,
  tableDataCount = 0,
  handleSort = () => {
    return;
  },
  loadingRowsNum = 10,
  noResultMsg = "No Data Found",
  pagination = {
    page: 1,
    total: 0,
    onPageChange: () => {
      return;
    },
    onPageSizeChange: () => {
      return;
    },
    pageSizeOptions: [5, 10, 15, 20],
  },
  sortDirection = "asc",
  sortBy = "",
  manualResponsiveBody = false,
  ManualResponsiveBodyComponent,
  scrollable = false,
  maxHeight = 400,
}: DataTableProps & { scrollable?: boolean; maxHeight?: number }): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const renderPagination = () => {
    if (!isPaginationVisible) return null;

    const {
      page,
      total,
      pageSize,
      onPageChange,
      onPageSizeChange,
      pageSizeOptions = [10, 20, 50],
    } = pagination;

    const actualPageSize = pageSize ?? pageSizeOptions[0];
    const totalPages = Math.ceil(total / actualPageSize) || 1;

    const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
      onPageSizeChange?.(event);
    };

    return (
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
          width: "100%",
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <IconButton
            size="small"
            disabled={page === 1}
            onClick={(e) => onPageChange(e, page - 1)}
            sx={{ p: 0.5 }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>

          <Typography variant="body2" sx={{ fontSize: 13 }}>
            Page {page} of {totalPages}
          </Typography>

          <IconButton
            size="small"
            disabled={page === totalPages}
            onClick={(e) => onPageChange(e, page + 1)}
            sx={{ p: 0.5 }}
          >
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <Select
            variant="standard"
            value={actualPageSize}
            onChange={handlePageSizeChange}
            disableUnderline
            sx={{
              fontSize: 13,
              "& .MuiSelect-select": { p: 0 },
            }}
          >
            {pageSizeOptions.map((size) => (
              <MenuItem key={size} value={size}>
                <Typography variant="body2" sx={{ fontSize: 13 }}>
                  {size}
                </Typography>
              </MenuItem>
            ))}
          </Select>

          <Typography
            variant="body2"
            sx={{ fontSize: 13, color: "text.secondary" }}
          >
            / page
          </Typography>
        </Stack>
      </Stack>
    );
  };

  return (
    <>
      {!isMobile ? (
        <TableContainer
          sx={{
            ...tableContainerStyles,
            ...(scrollable && {
              maxHeight,
              overflow: "auto",
            }),
          }}
        >
          <Table
            sx={{
              ...(scrollable && {
                minWidth: "100%",
              }),
            }}
          >
            <TableHeadComponent
              isLoading={loading}
              tableHeadRowCustomStyles={tableHeadRowCustomStyles}
              tableHeaderData={tableHeaderData}
              handleSort={handleSort}
              tableDataCount={tableDataCount}
              order={sortDirection}
              orderBy={sortBy}
            />
            <TableBodyComponent
              isLoading={loading}
              tableDataCount={tableDataCount}
              tableBodyCustomStyles={tableBodyCustomStyles}
              loadingRowsNum={loadingRowsNum}
              loadingColsNum={tableHeaderData?.length ?? 0}
              tableBodyLoaderRowCustomStyles={tableBodyLoaderRowCustomStyles}
              tableBody={tableBody}
            />
          </Table>
          {!loading && tableDataCount === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: 14,
                  color: "text.secondary",
                }}
              >
                {noResultMsg}
              </Typography>
            </Box>
          )}
        </TableContainer>
      ) : (
        <Box sx={{ width: "100%" }}>
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
              <TableMobileCardLoading />
            </Box>
          )}

          {!loading && tableDataCount === 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {noResultMsg}
              </Typography>
            </Box>
          )}

          {!loading &&
            tableDataCount > 0 &&
            (manualResponsiveBody ? ManualResponsiveBodyComponent : tableBody)}
        </Box>
      )}
      {isPaginationVisible &&
        !loading &&
        tableDataCount > 0 &&
        renderPagination()}
    </>
  );
}
