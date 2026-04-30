import {
  AppBar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import { useDashboardContext } from "../../context/DashboardContext";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";

const parseMonthlyDate = (value?: string, fallback?: Dayjs) => {
  const parsed = value ? dayjs(value, "DD-MM-YYYY", true) : dayjs();
  return parsed.isValid() ? parsed : fallback ?? dayjs();
};

export function Header() {
  const { state, dispatch } = useDashboardContext();
  const { search, sectionFilter, statusFilter, monthlyRange } = state;

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const monthlyStartDate = parseMonthlyDate(
    monthlyRange?.start_date,
    dayjs().startOf("month"),
  );
  const monthlyEndDate = parseMonthlyDate(
    monthlyRange?.end_date,
    dayjs().endOf("month"),
  );
  const [startDate, setStartDate] = useState<Dayjs>(monthlyStartDate);
  const [endDate, setEndDate] = useState<Dayjs>(monthlyEndDate);
  const [, setSearchParams] = useSearchParams();

  const filters = [
    {
      value: search,
      delete: () => dispatch({ type: "SET_SEARCH", payload: "" }),
    },
    {
      value: sectionFilter,
      delete: () => dispatch({ type: "SET_SECTION_FILTER", payload: "" }),
    },
    {
      value: statusFilter,
      delete: () => dispatch({ type: "SET_STATUS_FILTER", payload: "" }),
    },
  ].filter((filter) => filter.value);

  const handleOpenDatePicker = () => {
    setStartDate(monthlyStartDate);
    setEndDate(monthlyEndDate);
    setDatePickerOpen(true);
  };

  const handleApplyDateRange = () => {
    if (!startDate.isValid() || !endDate.isValid()) return;

    setSearchParams((prev) => {
      const oldState = new URLSearchParams(prev);
      oldState.set("start_date", startDate.format("DD-MM-YYYY"));
      oldState.set("end_date", endDate.format("DD-MM-YYYY"));
      return oldState;
    });
    dispatch({
      type: "SET_MONTHLY_RANGE",
      payload: {
        start_date: startDate.format("DD-MM-YYYY"),
        end_date: endDate.format("DD-MM-YYYY"),
      },
    });
    setDatePickerOpen(false);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "transparent",
        color: "inherit",
        borderBottom: "1.5px solid rgba(49, 47, 45, 0.35)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: { xs: "center", md: "space-between" },
          px: { xs: 2, md: 4 },
          py: { xs: 2, md: 1 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"cursive", "Segoe Script", sans-serif',
            fontWeight: 700,
            letterSpacing: 0.2,
            mb: { xs: 1.5, md: 0 },
            width: "100%",
          }}
        >
          Content Performance
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{
            alignItems: "center",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {filters.map((filter, index) => (
              <Chip
                key={`${filter.value}-${index}`}
                label={filter.value}
                variant="outlined"
                sx={{ borderRadius: 999, bgcolor: "rgba(255,255,255,0.6)" }}
                onDelete={filter.delete}
                deleteIcon={<CloseIcon />}
              />
            ))}
            <Chip
              clickable
              icon={<CalendarMonthIcon sx={{ fontSize: 18 }} />}
              label={
                monthlyRange
                  ? `${monthlyRange.start_date} to ${monthlyRange.end_date}`
                  : "Select Date Range"
              }
              variant="outlined"
              sx={{ borderRadius: 999, bgcolor: "rgba(255,255,255,0.6)" }}
              onClick={handleOpenDatePicker}
            />
          </Stack>

          <Button
            startIcon={<RefreshIcon />}
            variant="outlined"
            sx={{
              borderRadius: 999,
              textTransform: "none",
              color: "inherit",
              borderColor: "rgba(47,42,36,0.45)",
              bgcolor: "rgba(255,255,255,0.5)",
              alignSelf: { xs: "stretch", sm: "auto" },
            }}
            onClick={() => dispatch({ type: "CLEAR_FILTERS" })}
          >
            refresh
          </Button>
        </Stack>
      </Toolbar>

      <Dialog
        sx={{ p: 4, borderRadius: 3 }}
        open={datePickerOpen}
        onClose={() => setDatePickerOpen(false)}
      >
        <Typography
          style={{ padding: "16px", fontSize: "1.25rem", fontWeight: 500 }}
        >
          Select Date Range
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            p: 3,
            pt: 0,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue ? dayjs(newValue) : startDate);
            }}
            defaultValue={startDate}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue ? dayjs(newValue) : endDate);
            }}
          />
        </Box>
        <DialogActions sx={{ p: 3, pt: 0, "& .MuiStack-root": { mt: 0 } }}>
          <Button onClick={() => setDatePickerOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleApplyDateRange}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}
