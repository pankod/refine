import { GitHubBanner, Refine } from "@refinedev/core";
import {
  ThemedLayout,
  ErrorComponent,
  RefineThemes,
  useNotificationProvider,
  RefineSnackbarProvider,
} from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { PostList, PostCreate, PostEdit, PostShow } from "../src/pages/posts";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <DevtoolsProvider>
          <RefineSnackbarProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "posts",
                  list: "/posts",
                  create: "/posts/create",
                  edit: "/posts/edit/:id",
                  show: "/posts/show/:id",
                  meta: {
                    canDelete: true,
                  },
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
                  <Route
                    index
                    element={<NavigateToResource resource="posts" />}
                  />

                  <Route path="/posts">
                    <Route index element={<PostList />} />
                    <Route path="create" element={<PostCreate />} />
                    <Route path="edit/:id" element={<PostEdit />} />
                    <Route path="show/:id" element={<PostShow />} />
                  </Route>

                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>
              <DevtoolsPanel />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </DevtoolsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
