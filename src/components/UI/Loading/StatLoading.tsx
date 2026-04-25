import { Card, CardContent, Skeleton, Stack, Typography } from "@mui/material";

export function StatLoading() {
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
          <Skeleton animation="wave" variant="text" width={80} />
        </Typography>
        <Typography
          variant="h3"
          sx={{
            mt: 1,
            fontFamily: '"Comic Sans MS", "Segoe Script", cursive',
            fontWeight: 700,
          }}
        >
          <Skeleton animation="wave" variant="text" width={120} />
        </Typography>
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ alignItems: "center", mt: 2 }}
        >
          <Skeleton
            animation="wave"
            variant="text"
            width={20}
            sx={{ fontSize: 18, color: "success.main" }}
          />

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontWeight: 600,
            }}
          >
            <Skeleton animation="wave" variant="text" width={140} />
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
