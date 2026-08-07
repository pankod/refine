import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import {
  useNotificationProvider,
  ThemedLayout,
  ErrorComponent,
  RefineThemes,
} from "@refinedev/antd";
import { StarOutlined } from "@ant-design/icons";
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
import { CategoryList, CategoryCreate, CategoryEdit } from "./pages/categories";

import { OffLayoutArea } from "./components";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ConfigProvider theme={RefineThemes.Blue}>
          <AntdApp>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(API_URL)}
              resources={[
                {
                  name: "posts",
                  list: "/posts",
                  show: "/posts/show/:id",
                  create: "/posts/create",
                  edit: "/posts/edit/:id",
                  meta: {
                    icon: <StarOutlined />,
                    canDelete: true,
                  },
                },
                {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
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
                    <ThemedLayout OffLayoutArea={OffLayoutArea}>
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

                  <Route path="/categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                  </Route>

                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </AntdApp>
        </ConfigProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
};

export default App;
