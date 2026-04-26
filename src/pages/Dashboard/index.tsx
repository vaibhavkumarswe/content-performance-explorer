import { Box, Container } from "@mui/material";
import { Header } from "../../components/Layout/Header";
import { StatCardsGrid } from "../../components/Dashboard/StatCardsGrid";
import { PagesTableSection } from "../../components/Dashboard/PagesTableSection";
import { PageDetailsPanel } from "../../components/Dashboard/PageDetailsPanel";

import CTACards from "../../data/summary.json";
import Pages from "../../data/pages/pages.json";
import { useEffect, useMemo, useState } from "react";
import { useDashboardContext } from "../../context/DashboardContext";
import { transformStats } from "../../utils/utilityFn";
import type {
  PageData,
  PageDetailsResponse,
  PagesResponse,
  Point,
  StatItem,
  SummaryResponse,
} from "../../types/api";
import { useNotification } from "../../hooks/useNotification";

export default function Dashboard() {
  const { showError, showInfo } = useNotification();

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
    sectionFilterData: string[];
    statusFilterData: string[];
    period: {
      start_date: string;
      end_date: string;
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
    sectionFilterData: [],
    statusFilterData: [],
    period: {
      start_date: "",
      end_date: "",
    },
  });

  const [selectedPage, setSelectedPage] = useState<{
    data: PageData | null;
    dailyViewsData?: Point[];
    loading: boolean;
    error: string;
  }>({
    data: null,
    dailyViewsData: undefined,
    loading: false,
    error: "",
  });

  const { state: dashboardState, dispatch } = useDashboardContext();
  const {
    search,
    sectionFilter,
    statusFilter,
    page,
    pageSize,
    sortBy,
    sortDirection,
  } = dashboardState;

  const filteredPages = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return data.pages.data.filter((page) => {
      const matchesSearch =
        !normalizedSearch ||
        [page.title, page.path, page.section, page.status].some((field) =>
          field.toLowerCase().includes(normalizedSearch),
        );

      const matchesSection = !sectionFilter || page.section === sectionFilter;
      const matchesStatus = !statusFilter || page.status === statusFilter;

      return matchesSearch && matchesSection && matchesStatus;
    });
  }, [data.pages.data, search, sectionFilter, statusFilter]);

  const sortedPages = useMemo(() => {
    if (!sortBy) return filteredPages;

    const sorted = [...filteredPages].sort((a, b) => {
      const aVal = a[sortBy as keyof PageData];
      const bVal = b[sortBy as keyof PageData];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal || "");
      const bStr = String(bVal || "");
      const cmp = aStr.localeCompare(bStr);
      return sortDirection === "asc" ? cmp : -cmp;
    });

    return sorted;
  }, [filteredPages, sortBy, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedPages.length / pageSize));
  const effectivePage = Math.min(page, totalPages);

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
        period: {
          start_date: response.period?.start_date || "",
          end_date: response.period?.end_date || "",
        },
      }));
      dispatch({
        type: "SET_MONTHLY_RANGE",
        payload: {
          start_date: response.period?.start_date || "",
          end_date: response.period?.end_date || "",
        },
      });

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
      const sectionFilterData = Array.from(
        new Set(response.data.map((page) => page.section)),
      ).sort();
      const statusFilterData = Array.from(
        new Set(response.data.map((page) => page.status)),
      ).sort();

      setData((prev) => ({
        ...prev,
        pages: {
          data: response.data,
          loading: false,
          error: "",
        },
        sectionFilterData,
        statusFilterData,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paginatedPages = useMemo(() => {
    const start = (effectivePage - 1) * pageSize;
    return sortedPages.slice(start, start + pageSize);
  }, [sortedPages, effectivePage, pageSize]);

  const handleRowClick = async (id: string) => {
    try {
      setSelectedPage({ data: null, loading: true, error: "" });
      const page = data.pages.data.find((p) => p.id === id) || null;
      let pgId = parseInt(id.split("_")[1]);
      if (pgId > 10) {
        pgId = Math.floor(Math.random() * 10) + 1;
      }

      const dailyViewsData = (await import(
        `../../data/pages/timeseries/pg_${pgId}.json`
      )) as PageDetailsResponse;
      if (parseInt(id.split("_")[1]) > 10) {
        showInfo(
          `Daily Views for this page is not available, showing data for pg_${pgId} instead`,
        );
      }
      setSelectedPage({
        data: page,
        dailyViewsData: dailyViewsData.data.points,
        loading: false,
        error: "",
      });
    } catch {
      showError("Failed to load page details");
      setSelectedPage({ data: null, loading: false, error: "Failed to load" });
    }
  };

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
        <StatCardsGrid
          data={data.summary.data}
          loading={data.summary.loading}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.8fr 1fr" },
            gap: 2,
          }}
        >
          <PagesTableSection
            loading={data.pages.loading}
            sectionFilterData={data.sectionFilterData}
            statusFilterData={data.statusFilterData}
            sortedPages={sortedPages}
            paginatedPages={paginatedPages}
            effectivePage={effectivePage}
            handleRowClick={handleRowClick}
          />
          <PageDetailsPanel
            selectedPage={selectedPage}
            onClose={() =>
              setSelectedPage({
                data: null,
                dailyViewsData: undefined,
                loading: false,
                error: "",
              })
            }
          />
        </Box>
      </Container>
    </Box>
  );
}
