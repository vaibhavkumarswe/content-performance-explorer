import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, styled, type TypographyVariant } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
  Tooltip,
} from "recharts";
import { StatCard } from "../../components/UI/StatCard";
import { Header } from "../../components/Layout/Header";
import { DataTable } from "../../components/UI/DataTable";

import CTACards from "../../data/summary.json";
import Pages from "../../data/pages/pages.json";
import { useEffect, useState } from "react";
import { transformStats } from "../../utils/utilityFn";
import type {
  PageData,
  PagesResponse,
  StatItem,
  SummaryResponse,
} from "../../types/api";
import { useNotification } from "../../hooks/useNotification";
import {
  PagesMobileCard,
  PagesTableColumns,
  PagesTableData,
} from "../../components/UI/PagesTable";
import { StatLoading } from "../../components/UI/Loading/StatLoading";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(0.8, 1.5),
  border: `1.5px solid ${theme.palette.divider}`,
  borderRadius: 999,
  background: alpha(theme.palette.common.white, 0.75),
  width: "100%",
}));

export default function Dashboard() {
  const { showError } = useNotification();
  const [data, setData] = useState<{
    summary: {
      data: StatItem[];
      loading: boolean;
      error: string;
    };
    pages: {
      data: PageData[];
      loading: boolean;
      error: string;
    };
  }>({
    summary: {
      data: [],
      loading: true,
      error: "",
    },
    pages: {
      data: [],
      loading: true,
      error: "",
    },
  });

  const dailyViewsData = [
    { day: 1, views: 40 },
    { day: 2, views: 48 },
    { day: 3, views: 55 },
    { day: 4, views: 62 },
    { day: 5, views: 50 },
    { day: 6, views: 35 },
    { day: 7, views: 32 },
    { day: 8, views: 38 },
    { day: 9, views: 45 },
    { day: 10, views: 44 },
    { day: 11, views: 49 },
    { day: 12, views: 58 },
  ];

  async function fetchSummaryData() {
    try {
      setData((prev) => ({
        ...prev,
        summary: { ...prev.summary, loading: true },
      }));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = CTACards as SummaryResponse;
      const transformedStats = transformStats(response.data);

      setData((prev) => ({
        ...prev,
        summary: {
          data: transformedStats,
          loading: false,
          error: "",
        },
      }));

      return response;
    } catch {
      showError("Failed to load summary data");
      setData((prev) => ({
        ...prev,
        summary: { ...prev.summary, loading: false, error: "Failed to load" },
      }));
      return null;
    }
  }

  async function fetchTableData() {
    try {
      setData((prev) => ({
        ...prev,
        pages: { ...prev.pages, loading: true },
      }));

      await new Promise((resolve) => setTimeout(resolve, 1200));
      const response = Pages as PagesResponse;

      setData((prev) => ({
        ...prev,
        pages: {
          data: response.data,
          loading: false,
          error: "",
        },
      }));
      return Pages;
    } catch {
      showError("Failed to load table data");
      setData((prev) => ({
        ...prev,
        pages: { ...prev.pages, loading: false, error: "Failed to load" },
      }));
      return [];
    }
  }

  useEffect(() => {
    async function loadData() {
      await fetchSummaryData();
      await fetchTableData();
    }

    loadData();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f6f0e6",
        color: "#2f2a24",
        fontFamily: '"Comic Sans MS", "Segoe Script", cursive',
      }}
    >
      <Header />

      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
            gap: 2,
            mb: 2.5,
          }}
        >
          {!data.summary.loading &&
            data.summary?.data?.map((item) => (
              <StatCard key={item.label} item={item} />
            ))}
          {data.summary.loading &&
            [1, 2, 3, 4].map((_, idx) => <StatLoading key={idx} />)}
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.8fr 1fr" },
            gap: 2,
          }}
        >
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              border: "1.5px solid rgba(47,42,36,0.5)",
              bgcolor: "rgba(255,255,255,0.28)",
              boxShadow: "none",
              maxHeight: "660px",
              overflow: "hidden",
              pb: 3,
              height: "fit-content",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                bgcolor: "rgba(255,255,255,0.28)",
                pb: 2,
                mb: 1,
              }}
            >
              <Stack spacing={2}>
                <Search>
                  <SearchIcon sx={{ color: "text.secondary" }} />
                  <InputBase placeholder="search pages..." sx={{ flex: 1 }} />
                </Search>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ justifyContent: "flex-end" }}
                >
                  <Chip
                    label="Section"
                    deleteIcon={<ArrowDropDownIcon />}
                    onDelete={() => {}}
                    variant="outlined"
                    sx={{ borderRadius: 999 }}
                  />
                  <Chip
                    label="Status"
                    deleteIcon={<ArrowDropDownIcon />}
                    onDelete={() => {}}
                    variant="outlined"
                    sx={{ borderRadius: 999 }}
                  />
                </Stack>
              </Stack>
            </Box>

            <Box sx={{ flex: 1, overflow: "hidden" }}>
              <DataTable
                loading={data.pages.loading}
                tableBody={<PagesTableData data={data.pages.data} />}
                manualResponsiveBody={true}
                ManualResponsiveBodyComponent={
                  <PagesMobileCard data={data.pages.data} />
                }
                tableHeaderData={PagesTableColumns}
                tableDataCount={data.pages.data.length}
                isPaginationVisible={true}
                tableBodyLoaderRowCustomStyles={{
                  "& td:first-of-type": {
                    paddingLeft: "0px",
                  },
                }}
                tableHeadRowCustomStyles={{
                  "& th:first-of-type": {
                    paddingLeft: "0px",
                    fontWeight: 700,
                    color: "primary.main",
                  },
                }}
                tableBodyCustomStyles={{
                  "& tr:last-child td": {
                    border: 0,
                  },
                }}
                loadingRowsNum={4}
                scrollable={true}
                maxHeight={470}
              />
            </Box>
          </Paper>

          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              border: "1.5px solid rgba(47,42,36,0.5)",
              bgcolor: "rgba(255,255,255,0.28)",
              boxShadow: "none",
              height: "fit-content",
            }}
          >
            <Stack spacing={1.5}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Comic Sans MS", "Segoe Script", cursive',
                    fontWeight: 700,
                  }}
                >
                  Launch Post
                </Typography>
                <IconButton size="small">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 1,
                  fontFamily: '"Comic Sans MS", "Segoe Script", cursive',
                }}
              >
                /blog/product-launch
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                  },
                  borderRadius: 2,
                  bgcolor: (theme) => alpha(theme.palette.grey[200], 0.3),
                }}
              >
                {[
                  { label: "Section", value: "Blog", highlight: false },
                  {
                    label: "Status",
                    value: (
                      <Chip
                        label="Published"
                        color="success"
                        variant="outlined"
                        size="small"
                      />
                    ),
                  },
                  { label: "First published", value: "Feb 15, 2025" },
                  { label: "Total views", value: "12,401", variant: "h5" },
                  { label: "Uniques", value: "8,932" },
                  { label: "Avg. time", value: "3m 21s" },
                ].map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 1.2,
                      borderRadius: 1.5,
                      bgcolor: item.highlight
                        ? (theme) => alpha(theme.palette.primary.main, 0.08)
                        : "transparent",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontWeight: 600,
                        fontFamily: '"Comic Sans MS", "Segoe Script", cursive',
                      }}
                    >
                      {item.label}
                    </Typography>

                    <Box>
                      {typeof item.value === "string" ? (
                        <Typography
                          variant={
                            typeof item.variant === "string"
                              ? (item.variant as TypographyVariant)
                              : "body1"
                          }
                          sx={{
                            fontWeight: 600,
                            fontFamily:
                              '"Comic Sans MS", "Segoe Script", cursive',
                          }}
                        >
                          {item.value}
                        </Typography>
                      ) : (
                        item.value
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
                  Daily views
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    height: 180,
                    borderRadius: 2,
                    p: 1.5,
                    bgcolor: "rgba(232,238,255,0.65)",
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dailyViewsData}>
                      <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="views"
                        stroke="#8884d8"
                        fill="#8884d8"
                        strokeWidth={2}
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Paper>
              </Box>

              <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<OpenInNewIcon />}
                  sx={{ borderRadius: 999 }}
                >
                  open page
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CompareArrowsIcon />}
                  sx={{ borderRadius: 999 }}
                >
                  compare
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
