import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNotification } from "../../hooks/useNotification";

export default function Test() {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  return (
    <Box>
      <Typography variant="h1" align="center" sx={{ mt: 4 }}>
        Test Page
      </Typography>
      <Container maxWidth="xl" sx={{ py: 1 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => showSuccess("Success! Operation completed.")}
          >
            Show Success
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => showError("Error! Something went wrong.")}
          >
            Show Error
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => showWarning("Warning! Please check your input.")}
          >
            Show Warning
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => showInfo("Info! Here's some information.")}
          >
            Show Info
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
