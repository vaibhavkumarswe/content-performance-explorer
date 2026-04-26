import {
  AppBar,
  Button,
  Chip,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import { useDashboardContext } from "../../context/DashboardContext";

export function Header() {
  const { state, dispatch } = useDashboardContext();
  const { search, sectionFilter, statusFilter, monthlyRange } = state;

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
    </AppBar>
  );
}
