import { Box } from "@mui/material";
import { StatCard } from "../UI/StatCard";
import { StatLoading } from "../UI/Loading/StatLoading";
import type { StatItem } from "../../types/api";

interface StatCardsGridProps {
  data: StatItem[];
  loading: boolean;
}

export function StatCardsGrid({ data, loading }: StatCardsGridProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
        gap: 2,
        mb: 2.5,
      }}
    >
      {!loading &&
        data.map((item) => <StatCard key={item.label} item={item} />)}
      {loading && [1, 2, 3, 4].map((_, idx) => <StatLoading key={idx} />)}
    </Box>
  );
}
