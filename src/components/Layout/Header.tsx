import { useMemo, useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import {
  AppBar,
  Box,
  Button,
  Chip,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker, type DateRange } from "@mui/x-date-pickers-pro";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";

function formatRangeLabel(range: DateRange<Dayjs>) {
  const [start, end] = range;

  if (!start?.isValid() || !end?.isValid()) {
    return "Select date range";
  }

  return `${start.format("MMM D")} - ${end.format("MMM D, YYYY")}`;
}

export function Header() {
  const [selectedRange, setSelectedRange] = useState<DateRange<Dayjs>>([
    dayjs("2025-03-01"),
    dayjs("2025-03-31"),
  ]);
  const [pickerOpen, setPickerOpen] = useState(false);

  const dateLabel = useMemo(
    () => formatRangeLabel(selectedRange),
    [selectedRange],
  );

  const handleOpenDatePicker = () => {
    setPickerOpen(true);
  };

  const handleCloseDatePicker = () => {
    setPickerOpen(false);
  };

  const handleRangeChange = (newValue: DateRange<Dayjs>) => {
    setSelectedRange(newValue);
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
          // flexWrap: "wrap",
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
            <Chip
              label="Blog"
              variant="outlined"
              sx={{ borderRadius: 999, bgcolor: "rgba(255,255,255,0.6)" }}
              onDelete={() => {}}
              deleteIcon={<CloseIcon />}
            />
            <Chip
              clickable
              icon={<CalendarMonthIcon sx={{ fontSize: 18 }} />}
              label={dateLabel}
              variant="outlined"
              onClick={handleOpenDatePicker}
              sx={{ borderRadius: 999, bgcolor: "rgba(255,255,255,0.6)" }}
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
          >
            refresh
          </Button>
        </Stack>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              position: "absolute",
              left: -9999,
              width: 0,
              height: 0,
              overflow: "hidden",
            }}
          >
            <DateRangePicker
              calendars={1}
              open={pickerOpen}
              onClose={handleCloseDatePicker}
              value={selectedRange}
              onChange={handleRangeChange}
              slotProps={{
                field: {
                  style: {
                    position: "absolute",
                    left: -9999,
                    width: 0,
                    height: 0,
                    overflow: "hidden",
                  },
                },
              }}
            />
          </Box>
        </LocalizationProvider>
      </Toolbar>
    </AppBar>
  );
}
