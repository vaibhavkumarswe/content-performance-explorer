/* eslint-disable react-refresh/only-export-components */
import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import type { TableHeaderData } from "./Table/tableTypes";
import type { PageData } from "../../types/api";
import type { JSX } from "react";
import { formatTime } from "../../utils/utilityFn";

export const PagesTableColumns: TableHeaderData[] = [
  {
    id: "title",
    label: "Page",
    align: "left",
    isSortable: false,
  },
  {
    id: "section",
    label: "Section",
    align: "left",
    isSortable: false,
  },
  {
    id: "pageviews",
    label: "Views",
    align: "right",
    isSortable: true,
  },
  {
    id: "unique_visitors",
    label: "Uniques",
    align: "right",
    isSortable: false,
  },
  {
    id: "avg_time_on_page",
    label: "Time",
    align: "right",
    isSortable: false,
  },
  {
    id: "bounce_rate",
    label: "Bounce",
    align: "left",
    isSortable: false,
  },
];

export function PagesTableData({ data }: { data: PageData[] }): JSX.Element {
  return (
    <>
      {data.map((obj: PageData) => {
        return (
          <TableRow
            key={`${obj?.id}`}
            sx={{
              "& td": {
                paddingTop: "15px",
                paddingBottom: "15px",
                borderBottom: `0.5px dashed grey`,
              },
              "& td:first-of-type": {
                paddingLeft: "0px",
              },
              overflow: "auto",
              width: "100%",
            }}
          >
            <TableCell align="left">
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: "20px",
                  letterSpacing: "0.02px",
                  color: "primary.main",
                  "&:hover": {
                    color: "primary[500]",
                  },
                  width: "200px",
                }}
              >
                <Box component="span">{obj?.title ?? "-"}</Box>
                <Box
                  component="span"
                  sx={{ fontSize: "12px", color: "text.secondary" }}
                >
                  {obj?.path ?? "-"}
                </Box>
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography
                variant="body2"
                sx={{
                  lineHeight: "20px",
                  letterSpacing: "0.02px",
                  color: "primary.main",
                  "&:hover": {
                    color: "primary[500]",
                  },
                }}
              >
                <Chip
                  label={obj?.section ?? "-"}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                sx={{
                  lineHeight: "20px",
                  letterSpacing: "0.02px",
                  color: "primary.main",
                }}
              >
                {obj?.pageviews ?? "-"}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                sx={{
                  lineHeight: "20px",
                  letterSpacing: "0.02px",
                  color: "primary.main",
                }}
              >
                {obj?.unique_visitors ?? "-"}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography
                variant="body2"
                sx={{
                  lineHeight: "20px",
                  letterSpacing: "0.02px",
                  color: "primary.main",
                  width: "80px",
                }}
              >
                {formatTime(obj?.avg_time_on_page ?? 0)}
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography
                variant="body2"
                sx={{
                  lineHeight: "20px",
                  letterSpacing: "0.02px",
                  color: "primary.main",
                }}
              >
                {obj?.bounce_rate ?? 0}%
              </Typography>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}

export function PagesMobileCard({ data }: { data: PageData[] }): JSX.Element {
  return (
    <Box
      sx={{
        maxHeight: "400px",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: "3px",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
        },
      }}
    >
      <Stack spacing={2} sx={{ width: "100%", pb: 2 }}>
        {data.map((page) => (
          <Card
            key={page.id}
            sx={{
              borderRadius: 2,
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 0.5, alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap" }}>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "primary.main",
                        mb: 0.5,
                      }}
                    >
                      {page.title || "Untitled Page"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.875rem",
                      }}
                    >
                      {page.path || "No path"}
                    </Typography>
                  </Box>

                  <Box>
                    <Chip
                      label={page.section || "No section"}
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ fontSize: "0.75rem" }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 2,
                    mt: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 1.5,
                      bgcolor: "background.default",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 400,
                        color: "primary.main",
                        lineHeight: 1,
                      }}
                    >
                      {page.pageviews || "0"}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        textTransform: "uppercase",
                        fontSize: "0.7rem",
                        letterSpacing: 0.5,
                      }}
                    >
                      Views
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 1.5,
                      bgcolor: "background.default",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 400,
                        color: "primary.main",
                        lineHeight: 1,
                      }}
                    >
                      {page.unique_visitors || "0"}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        textTransform: "uppercase",
                        fontSize: "0.7rem",
                        letterSpacing: 0.5,
                      }}
                    >
                      Uniques
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 1.5,
                      bgcolor: "background.default",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 400,
                        color: "primary.main",
                        lineHeight: 1,
                      }}
                    >
                      {formatTime(page.avg_time_on_page || 0)}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        textTransform: "uppercase",
                        fontSize: "0.7rem",
                        letterSpacing: 0.5,
                      }}
                    >
                      Time
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 1.5,
                      bgcolor: "background.default",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 400,
                        color: "primary.main",
                        lineHeight: 1,
                      }}
                    >
                      {page.bounce_rate || 0}%
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        textTransform: "uppercase",
                        fontSize: "0.7rem",
                        letterSpacing: 0.5,
                      }}
                    >
                      Bounce
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
