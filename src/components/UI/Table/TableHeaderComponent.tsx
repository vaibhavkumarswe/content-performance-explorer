import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  useTheme,
} from "@mui/material";
import type { JSX } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import type { TableHeadComponentProps, TableHeaderData } from "./tableTypes";
import { TableHeadLoader } from "../Loading/TableHeaderLoader";


export default function TableHeadComponent({
  isLoading,
  tableHeadRowCustomStyles,
  tableHeaderData,
  handleSort,
  tableDataCount,
  order,
  orderBy,
}: TableHeadComponentProps): JSX.Element {
  const theme = useTheme();

  const onSortIconClick = (id: string) => {
    const isAsc = orderBy === id && order === "asc";

    handleSort(id, isAsc ? "desc" : "asc");
  };

  return (
    <TableHead>
      {isLoading && (
        <TableHeadLoader
          rowCustomStyles={tableHeadRowCustomStyles}
          colsNum={tableHeaderData.length}
        />
      )}
      {!isLoading && tableDataCount > 0 && (
        <TableRow
          sx={{
            "& th": {
              paddingTop: "10px",
              paddingBottom: "10px",
              borderBottom: `0.5px solid ${theme.palette.text.secondary}B2`,
              backgroundColor: theme.palette.grey[50],
              fontWeight: 700,
              position: "sticky",
              top: 0,
              zIndex: 1,
            },
            ...tableHeadRowCustomStyles,
          }}
        >
          {tableHeaderData.map((currentHeader: TableHeaderData) => (
            <TableCell
              key={currentHeader?.id}
              align={currentHeader?.align ?? "left"}
              sx={currentHeader?.headerTableCellStyle ?? {}}
            >
              {currentHeader.isSortable ? (
                <TableSortLabel
                  active={orderBy === currentHeader.id}
                  direction={orderBy === currentHeader.id ? order : "asc"}
                  onClick={() =>
                    !isLoading && onSortIconClick(currentHeader.id)
                  }
                  IconComponent={ArrowDropUpIcon}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      letterSpacing: "0.02px",
                      lineHeight: "17px",
                    }}
                  >
                    {currentHeader?.label
                      ? currentHeader.label.toUpperCase()
                      : ""}
                    {orderBy === currentHeader.id ? (
                      <Box
                        component="span"
                        sx={{
                          position: "absolute",
                          overflow: "hidden",
                          clip: "rect(0 0 0 0)",
                          whiteSpace: "nowrap",
                          width: "1px",
                          height: "1px",
                          border: "0",
                          margin: "-1px",
                          padding: "0",
                          visibility: "hidden",
                        }}
                      >
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </Typography>
                </TableSortLabel>
              ) : (
                <Typography variant="body2">
                  {currentHeader?.label
                    ? currentHeader.label.toUpperCase()
                    : ""}
                </Typography>
              )}
            </TableCell>
          ))}
        </TableRow>
      )}
    </TableHead>
  );
}
