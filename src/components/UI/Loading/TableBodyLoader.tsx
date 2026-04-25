import { Skeleton, TableCell, TableRow } from "@mui/material";
import type { TableBodyLoaderProps } from "../Table/tableTypes";

export const TableBodyLoader = ({
  rowsNum,
  colsNum,
  rowCustomStyles,
}: TableBodyLoaderProps) => {

  return (
    <>
      {[...Array(rowsNum)].map((_, index) => (
        <TableRow
          key={index}
          sx={{
            "& td": {
              paddingTop: "15px",
              paddingBottom: "15px",
              borderBottom: `0.5px solid #000B2`,
            },
            ...rowCustomStyles,
          }}
        >
          {[...Array(colsNum)].map((_, index) => (
            <TableCell key={index}>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
