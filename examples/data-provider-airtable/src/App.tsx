import { GitHubBanner, Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayout,
  ErrorComponent,
  RefineThemes,
} from "@refinedev/antd";
import dataProvider from "@refinedev/airtable";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { ConfigProvider, App as AntdApp } from "antd";
import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";

import {
  BlogPostList,
  BlogPostCreate,
  BlogPostEdit,
  BlogPostShow,
} from "./pages/blog-posts";
import { CategoryList, CategoryCreate, CategoryEdit } from "./pages/categories";

const API_TOKEN =
  "patI3quNRP17TNsjK.d59600d5955939ed02110fb1107036ff4482496004f020f5bf031f55789cd321";
const BASE_ID = "appKYl1H4k9g73sBT";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            dataProvider={dataProvider(API_TOKEN, BASE_ID)}
            routerProvider={routerProvider}
            resources={[
              {
                name: "blog_posts",
                list: "/blog-posts",
                create: "/blog-posts/new",
                edit: "/blog-posts/:id/edit",
                show: "/blog-posts/:id",
              },
              {
                name: "categories",
                list: "/categories",
                create: "/categories/new",
                edit: "/categories/:id/edit",
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
                <Route
                  index
                  element={<NavigateToResource resource="blog_posts" />}
                />

                <Route path="/blog-posts">
                  <Route index element={<BlogPostList />} />
                  <Route path="new" element={<BlogPostCreate />} />
                  <Route path=":id/edit" element={<BlogPostEdit />} />
                  <Route path=":id" element={<BlogPostShow />} />
                </Route>

                <Route path="/categories">
                  <Route index element={<CategoryList />} />
                  <Route path="new" element={<CategoryCreate />} />
                  <Route path=":id/edit" element={<CategoryEdit />} />
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
