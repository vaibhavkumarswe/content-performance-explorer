/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  type SelectChangeEvent,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { DataTable } from "../UI/DataTable";
import { useDashboardContext } from "../../context/DashboardContext";
import type { PageData } from "../../types/api";
import type { Order } from "../UI/Table/tableTypes";
import {
  PagesMobileCard,
  PagesTableColumns,
  PagesTableData,
} from "../UI/PagesTable";
import { useSearchParams } from "react-router-dom";


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

interface PagesTableSectionProps {
  //   data: PageData[];
  loading: boolean;
  sectionFilterData: string[];
  statusFilterData: string[];
  sortedPages: PageData[];
  paginatedPages: PageData[];
  effectivePage: number;
  handleRowClick: (id: string) => void;
}

export function PagesTableSection({
  loading,
  sectionFilterData,
  statusFilterData,
  sortedPages,
  paginatedPages,
  effectivePage,
  handleRowClick,
}: PagesTableSectionProps) {
  const { state, dispatch } = useDashboardContext();
  const { search, sectionFilter, statusFilter, pageSize } = state;
  const pageSizeOptions = [5, 10, 15, 20];
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    dispatch({ type: "SET_SEARCH", payload: val });
    setSearchParams((prev)=>{
      const oldState = new URLSearchParams(prev);
      oldState.set('search', val);
      return oldState;
    });
  };

  const handleSectionFilterChange = (event: SelectChangeEvent<string>) => {
    const val = event.target.value;
    dispatch({ type: "SET_SECTION_FILTER", payload: val });
    setSearchParams((prev)=>{
      const oldState = new URLSearchParams(prev);
      oldState.set('section', val);
      return oldState;
    });
  };

  const handleStatusFilterChange = (event: SelectChangeEvent<string>) => {
    const val = event.target.value;
    dispatch({ type: "SET_STATUS_FILTER", payload: val });
    setSearchParams((prev)=>{
      const oldState = new URLSearchParams(prev);
      oldState.set('status', val);
      return oldState;
    });
  };

  const handlePageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    dispatch({ type: "SET_PAGE", payload: newPage });
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    dispatch({ type: "SET_PAGE_SIZE", payload: Number(event.target.value) });
  };

  const handleSort = (orderBy: string, order: Order) => {
    dispatch({
      type: "SET_SORT",
      payload: { sortBy: orderBy, sortDirection: order },
    });
  };

  return (
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
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          sx={{ alignItems: { xs: "stretch" } }}
        >
          <Search>
            <SearchIcon sx={{ color: "text.secondary" }} />
            <InputBase
              placeholder="Search pages..."
              sx={{ flex: 1 }}
              value={search}
              onChange={handleSearchChange}
            />
          </Search>

          <Stack
            direction={{ xs: "row" }}
            spacing={1}
            sx={{ flex: 1, justifyContent: "flex-end", width: "100%" }}
          >
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel id="section-filter-label">Section</InputLabel>
              <Select
                labelId="section-filter-label"
                value={sectionFilter}
                label="Section"
                onChange={handleSectionFilterChange}
              >
                <MenuItem value="">All Sections</MenuItem>
                {sectionFilterData.map((section) => (
                  <MenuItem key={section} value={section}>
                    {section}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                label="Status"
                onChange={handleStatusFilterChange}
              >
                <MenuItem value="">All Statuses</MenuItem>
                {statusFilterData.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <DataTable
          loading={loading}
          tableBody={
            <PagesTableData
              data={paginatedPages}
              handleRowClick={handleRowClick}
            />
          }
          manualResponsiveBody={true}
          ManualResponsiveBodyComponent={
            <PagesMobileCard data={paginatedPages} />
          }
          tableHeaderData={PagesTableColumns}
          tableDataCount={sortedPages.length}
          isPaginationVisible={true}
          handleSort={handleSort}
          sortBy={state.sortBy}
          sortDirection={state.sortDirection}
          pagination={{
            page: effectivePage,
            pageSize,
            total: sortedPages.length,
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange,
            pageSizeOptions,
          }}
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
  );
}
