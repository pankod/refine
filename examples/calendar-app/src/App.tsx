import { GitHubBanner, Refine } from "@refinedev/core";
import { ErrorComponent, ThemedLayout, RefineThemes } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";
import { ConfigProvider } from "antd";
import { CalendarPage } from "./pages/calendar";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          resources={[
            {
              name: "events",
              list: "/events",
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route index element={<NavigateToResource resource="events" />} />
              <Route path="/events" element={<CalendarPage />} />
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
