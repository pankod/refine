import { GitHubBanner, Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayout,
  ErrorComponent,
  RefineThemes,
} from "@refinedev/antd";
import { createClient } from "@sanity/client";
import dataProvider from "refine-sanity";
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
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";

const client = createClient({
  token:
    "sk3W002iN3e9VqsbanYwAIo0ZMX7G1act1kRa0tyl8F1d4Y5xmmsrtlA05nor5KnP02v6DC9CYUPSdZZgv0n7S26raVTZEtpmEC5i7kQ2sdX3VEVEafmCUi044GOm90uJo32ZfD8w3k9S6Hy8MWlus85SHYPqbe87G146jMSHIaKjqRT9BiG",
  projectId: "l9xd358a",
  dataset: "production",
  perspective: "published",
  useCdn: false,
  apiVersion: "2021-10-21",
});

const App: React.FC = () => {
  return (
    <DevtoolsProvider>
      <BrowserRouter>
        <GitHubBanner />
        <ConfigProvider theme={RefineThemes.Blue}>
          <AntdApp>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(client)}
              resources={[
                {
                  name: "post",
                  list: "/post",
                  show: "/post/show/:id",
                  create: "/post/create",
                  edit: "/post/edit/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "category",
                  list: "/category",
                  create: "/category/create",
                  edit: "/category/edit/:id",
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              notificationProvider={useNotificationProvider}
              options={{
                liveMode: "auto",
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

                  <Route path="/post">
                    <Route index element={<PostList />} />
                    <Route path="create" element={<PostCreate />} />
                    <Route path="edit/:id" element={<PostEdit />} />
                    <Route path="show/:id" element={<PostShow />} />
                  </Route>

                  <Route path="/category">
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
        <DevtoolsPanel />
      </BrowserRouter>
    </DevtoolsProvider>
  );
};

export default App;
