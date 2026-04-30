import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import App from "./App.tsx";
import { DashboardProvider } from "./context/DashboardContext.tsx";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/de";
import { LocalizationProvider } from "@mui/x-date-pickers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DashboardProvider>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
            <App />
          </LocalizationProvider>
        </SnackbarProvider>
      </DashboardProvider>
    </BrowserRouter>
  </StrictMode>,
);
