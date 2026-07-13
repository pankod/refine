import {
  AuthPage,
  ErrorComponent,
  RefineThemes,
  ThemedLayout,
  useNotificationProvider,
} from "@refinedev/antd";
import { dataProvider, liveProvider } from "@refinedev/appwrite";
import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";
import { App as AntdApp, ConfigProvider } from "antd";

import { appwriteClient, authProvider } from "./utility";

import { PostCreate, PostEdit, PostList, PostShow } from "./pages/posts";
import {
  CategoryCreate,
  CategoryList,
  CategoryShow,
  CategoryEdit,
} from "./pages/categories";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            dataProvider={dataProvider(appwriteClient, {
              databaseId: "default",
            })}
            liveProvider={liveProvider(appwriteClient, {
              databaseId: "default",
            })}
            authProvider={authProvider}
            routerProvider={routerProvider}
            resources={[
              {
                name: "blog_posts",
                list: "/posts",
                create: "/posts/create",
                edit: "/posts/edit/:id",
                show: "/posts/show/:id",
                meta: {
                  label: "Blog Posts",
                },
              },
              {
                name: "categories",
                list: "/categories",
                create: "/categories/create",
                show: "/categories/show/:id",
                edit: "/categories/edit/:id",
                meta: {
                  label: "Categories",
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
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <ThemedLayout>
                      <Outlet />
                    </ThemedLayout>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="blog_posts" />}
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
                  <Route path="show/:id" element={<CategoryShow />} />
                </Route>
              </Route>

              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="blog_posts" />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      formProps={{
                        initialValues: {
                          remember: false,
                          email: "demo@refine.dev",
                          password: "demodemo",
                        },
                      }}
                    />
                  }
                />
              </Route>

              <Route
                element={
                  <Authenticated key="catch-all">
                    <ThemedLayout>
                      <Outlet />
                    </ThemedLayout>
                  </Authenticated>
                }
              >
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
