import { GitHubBanner, Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import {
  useNotificationProvider,
  ThemedLayout,
  ErrorComponent,
  RefineThemes,
} from "@refinedev/antd";
import { BrowserRouter, Routes, Route } from "react-router";

import { ConfigProvider, App as AntdApp } from "antd";
import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";

import { BlogPostList } from "./pages/blog-posts/list";
import { BlogPostCreate } from "./pages/blog-posts/create";
import { BlogPostShow } from "./pages/blog-posts/show";
import { BlogPostEdit } from "./pages/blog-posts/edit";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <GitHubBanner />
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "blog_posts",
                list: "/blog-posts",
                show: "/blog-posts/show/:id",
                create: "/blog-posts/create",
                edit: "/blog-posts/edit/:id",
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
            <ThemedLayout>
              <Routes>
                <Route
                  index
                  element={<NavigateToResource resource="blog_posts" />}
                />

                <Route path="/blog-posts">
                  <Route index element={<BlogPostList />} />
                  <Route path="show/:id" element={<BlogPostShow />} />
                  <Route path="create" element={<BlogPostCreate />} />
                  <Route path="edit/:id" element={<BlogPostEdit />} />
                </Route>

                <Route path="*" element={<ErrorComponent />} />
              </Routes>
            </ThemedLayout>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
