import { TableBody } from "@mui/material";
import type { JSX } from "react";
import type { TableBodyComponentProps } from "./tableTypes";
import { TableBodyLoader } from "../Loading/TableBodyLoader";

export default function TableBodyComponent({
  isLoading,
  tableDataCount,
  tableBodyCustomStyles,
  loadingRowsNum,
  loadingColsNum,
  tableBodyLoaderRowCustomStyles,
  tableBody,
}: TableBodyComponentProps): JSX.Element {
  return (
    <TableBody
      sx={{
        ...tableBodyCustomStyles,
      }}
    >
      {isLoading && (
        <TableBodyLoader
          rowsNum={loadingRowsNum}
          colsNum={loadingColsNum}
          rowCustomStyles={tableBodyLoaderRowCustomStyles}
        />
      )}
      {!isLoading && tableDataCount > 0 && tableBody}
    </TableBody>
  );
}
