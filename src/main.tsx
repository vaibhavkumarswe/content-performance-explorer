import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import App from "./App.tsx";
import { DashboardProvider } from "./context/DashboardContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DashboardProvider>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <App />
        </SnackbarProvider>
      </DashboardProvider>
    </BrowserRouter>
  </StrictMode>,
);
