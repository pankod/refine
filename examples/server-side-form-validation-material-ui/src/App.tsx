import { GitHubBanner, type HttpError, Refine } from "@refinedev/core";
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
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={{
              ...dataProvider("https://api.fake-rest.refine.dev"),
              // this is demonstration of how you can handle errors from API
              update: async () => {
                const error: HttpError = {
                  message: "An error occurred while updating the record.",
                  statusCode: 400,
                  errors: {
                    title: [
                      "Title is required.",
                      "Title should have at least 5 characters.",
                    ],
                    category: ["Category is required."],
                    status: true,
                    content: {
                      key: "form.error.content",
                      message: "Content is required.",
                    },
                  },
                };

                return Promise.reject(error);
              },
              create: async () => {
                // this is demonstration of how you can handle errors from API
                const error: HttpError = {
                  message: "An error occurred while creating the record.",
                  statusCode: 400,
                  errors: {
                    title: ["Title is required."],
                    category: ["Category is required."],
                    status: true,
                    content: {
                      key: "form.error.content",
                      message: "Content is required.",
                    },
                    tags: ["Tags is required."],
                  },
                };
                return Promise.reject(error);
              },
            }}
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
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
