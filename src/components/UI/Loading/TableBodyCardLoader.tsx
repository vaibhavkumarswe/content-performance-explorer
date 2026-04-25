import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import type { JSX } from "react";

export function TableMobileCardLoading(): JSX.Element {
  return (
    <Box
      sx={{
        maxHeight: "400px",
        width: "100%",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: "3px",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
        },
      }}
    >
      <Stack spacing={2} sx={{ width: "100%", pb: 2 }}>
        {[...Array(5)].map((_, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: 2,
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 0.5,
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "primary.main",
                        mb: 0.5,
                      }}
                    >
                      <Skeleton animation="wave" variant="text" width={120} />
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.875rem",
                      }}
                    >
                      <Skeleton animation="wave" variant="text" width={80} />
                    </Typography>
                  </Box>

                  <Box>
                    <Skeleton animation="wave" variant="text" width={40} />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 2,
                    mt: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 1.5,
                      bgcolor: "background.default",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 400,
                        color: "primary.main",
                        lineHeight: 1,
                      }}
                    >
                      <Skeleton animation="wave" variant="text" width={60} />
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        textTransform: "uppercase",
                        fontSize: "0.7rem",
                        letterSpacing: 0.5,
                      }}
                    >
                      Views
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 1.5,
                      bgcolor: "background.default",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 400,
                        color: "primary.main",
                        lineHeight: 1,
                      }}
                    >
                      <Skeleton animation="wave" variant="text" width={60} />
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        textTransform: "uppercase",
                        fontSize: "0.7rem",
                        letterSpacing: 0.5,
                      }}
                    >
                      Uniques
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 1.5,
                      bgcolor: "background.default",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 400,
                        color: "primary.main",
                        lineHeight: 1,
                      }}
                    >
                      <Skeleton animation="wave" variant="text" width={60} />
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        textTransform: "uppercase",
                        fontSize: "0.7rem",
                        letterSpacing: 0.5,
                      }}
                    >
                      Time
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 1.5,
                      bgcolor: "background.default",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 400,
                        color: "primary.main",
                        lineHeight: 1,
                      }}
                    >
                      <Skeleton animation="wave" variant="text" width={60} />
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        textTransform: "uppercase",
                        fontSize: "0.7rem",
                        letterSpacing: 0.5,
                      }}
                    >
                      Bounce
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
