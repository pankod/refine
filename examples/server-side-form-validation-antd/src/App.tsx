import { GitHubBanner, type HttpError, Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayout,
  ErrorComponent,
  RefineThemes,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { ConfigProvider, App as AntdApp } from "antd";
import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            routerProvider={routerProvider}
            dataProvider={{
              ...dataProvider(API_URL),
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
                    "category.id": ["Category is required."],
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
                    "category.id": ["Category is required."],
                    status: true,
                    content: {
                      key: "form.error.content",
                      message: "Content is required.",
                    },
                  },
                };
                return Promise.reject(error);
              },
            }}
            resources={[
              {
                name: "posts",
                list: "/posts",
                show: "/posts/show/:id",
                create: "/posts/create",
                edit: "/posts/edit/:id",
                meta: {
                  canDelete: true,
                },
              },
            ]}
            notificationProvider={useNotificationProvider}
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
                <Route index element={<NavigateToResource />} />

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
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
