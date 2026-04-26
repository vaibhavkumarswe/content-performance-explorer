import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
  type TypographyVariant,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useNotification } from "../../hooks/useNotification";
import DailyViews from "../UI/Charts/DailyViews";
import type { PageData, Point } from "../../types/api";

interface PageDetailsPanelProps {
  selectedPage: {
    data: PageData | null;
    dailyViewsData?: Point[];
    loading: boolean;
    error: string;
  };
  onClose: () => void;
}

export function PageDetailsPanel({
  selectedPage,
  onClose,
}: PageDetailsPanelProps) {
  const { showSuccess } = useNotification();

  if (selectedPage.loading) {
    return (
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
        <Typography variant="body1" color="text.secondary">
          Loading page details...
        </Typography>
      </Paper>
    );
  }

  if (selectedPage.error) {
    return (
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
        <Typography variant="body1" color="text.secondary">
          {selectedPage.error}
        </Typography>
      </Paper>
    );
  }

  if (!selectedPage.data || !selectedPage.dailyViewsData) {
    return (
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
        <Typography variant="body1" color="text.secondary">
          Select a page to see details
        </Typography>
      </Paper>
    );
  }

  return (
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
            {selectedPage.data.title}
          </Typography>
          <IconButton size="small" onClick={onClose}>
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
          {selectedPage.data.path}
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
            {
              label: "Section",
              value: selectedPage.data.section,
              highlight: false,
            },
            {
              label: "Status",
              value: (
                <Chip
                  label={selectedPage.data.status}
                  color="success"
                  variant="outlined"
                  size="small"
                />
              ),
            },
            {
              label: "First published",
              value: `${selectedPage.data.first_published}`,
            },
            {
              label: "Total views",
              value: `${selectedPage.data.pageviews}`,
              variant: "h5",
            },
            {
              label: "Uniques",
              value: `${selectedPage.data.unique_visitors}`,
            },
            {
              label: "Avg. time",
              value: `${selectedPage.data.avg_time_on_page}`,
            },
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
                      fontFamily: '"Comic Sans MS", "Segoe Script", cursive',
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
          <DailyViews data={selectedPage.dailyViewsData} />
        </Box>

        <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
          <Button
            variant="outlined"
            startIcon={<OpenInNewIcon width={10} height={10} />}
            sx={{ borderRadius: 999, fontSize: 12 }}
            onClick={() => {
              showSuccess(`Opening ${selectedPage?.data?.path} in a new tab`);
            }}
          >
            open page
          </Button>
          <Button
            variant="outlined"
            startIcon={<CompareArrowsIcon width={10} height={10} />}
            sx={{ borderRadius: 999, fontSize: 12 }}
          >
            compare
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
