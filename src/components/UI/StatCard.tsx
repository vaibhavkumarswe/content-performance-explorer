import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import type { StatItem } from "../../types/api";

export function StatCard({ item }: { item: StatItem }) {
  const { label, value, trend } = item;
  const up = trend >= 0;

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1.5px solid rgba(47,42,36,0.5)",
        bgcolor: "rgba(255,255,255,0.35)",
        boxShadow: "none",
        minHeight: 150,
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Typography
          variant="overline"
          sx={{
            display: "block",
            color: "text.secondary",
            letterSpacing: 1,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            mt: 1,
            fontFamily: '"Comic Sans MS", "Segoe Script", cursive',
            fontWeight: 700,
          }}
        >
          {value}
        </Typography>
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ alignItems: "center", mt: 2 }}
        >
          {up ? (
            <ArrowUpwardIcon sx={{ fontSize: 18, color: "success.main" }} />
          ) : (
            <ArrowDownwardIcon sx={{ fontSize: 18, color: "error.main" }} />
          )}
          <Typography
            variant="body2"
            sx={{
              color: up ? "success.main" : "error.main",
              fontWeight: 600,
            }}
          >
            8.4%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            vs prev period
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
