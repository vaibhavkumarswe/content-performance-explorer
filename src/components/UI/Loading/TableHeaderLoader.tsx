import { Skeleton, TableCell, TableRow } from "@mui/material";
import type { TableHeadLoaderProps } from "../Table/tableTypes";

export const TableHeadLoader = ({
  rowCustomStyles,
  colsNum,
}: TableHeadLoaderProps) => {

  return (
    <>
      <TableRow
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
          <TableCell key={index} width="540px">
            <Skeleton animation="wave" variant="text" />
          </TableCell>
        ))}
      </TableRow>
    </>
  );
};