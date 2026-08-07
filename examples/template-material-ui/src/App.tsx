import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import {
  useNotificationProvider,
  RefineSnackbarProvider,
  RefineThemes,
  ErrorComponent,
} from "@refinedev/mui";
import { BrowserRouter, Routes, Route } from "react-router";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={useNotificationProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route index element={<WelcomePage />} />

              <Route path="*" element={<ErrorComponent />} />
            </Routes>
          </Refine>
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
