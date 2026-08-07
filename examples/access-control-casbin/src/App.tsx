import { CanAccess, GitHubBanner, Refine } from "@refinedev/core";
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
import { newEnforcer } from "casbin";
import { ConfigProvider, App as AntdApp } from "antd";
import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";

import { model, adapter } from "./accessControl";
import { Header } from "./components/header";
import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";
import { UserList, UserCreate, UserEdit, UserShow } from "./pages/users";
import {
  CategoryList,
  CategoryCreate,
  CategoryEdit,
  CategoryShow,
} from "./pages/categories";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  const role = localStorage.getItem("role") ?? "admin";

  return (
    <BrowserRouter>
      <GitHubBanner />
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            accessControlProvider={{
              can: async ({ action, params, resource }) => {
                const enforcer = await newEnforcer(model, adapter);
                if (
                  action === "delete" ||
                  action === "edit" ||
                  action === "show"
                ) {
                  return Promise.resolve({
                    can: await enforcer.enforce(
                      role,
                      `${resource}/${params?.id}`,
                      action,
                    ),
                  });
                }
                if (action === "field") {
                  return Promise.resolve({
                    can: await enforcer.enforce(
                      role,
                      `${resource}/${params?.field}`,
                      action,
                    ),
                  });
                }
                return {
                  can: await enforcer.enforce(role, resource, action),
                };
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
              {
                name: "users",
                list: "/users",
                show: "/users/show/:id",
                create: "/users/create",
                edit: "/users/edit/:id",
              },
              {
                name: "categories",
                list: "/categories",
                show: "/categories/show/:id",
                create: "/categories/create",
                edit: "/categories/edit/:id",
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
                  <ThemedLayout Header={() => <Header role={role} />}>
                    <CanAccess>
                      <Outlet />
                    </CanAccess>
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

                <Route path="/users">
                  <Route index element={<UserList />} />
                  <Route path="create" element={<UserCreate />} />
                  <Route path="edit/:id" element={<UserEdit />} />
                  <Route path="show/:id" element={<UserShow />} />
                </Route>

                <Route path="/categories">
                  <Route index element={<CategoryList />} />
                  <Route path="create" element={<CategoryCreate />} />
                  <Route path="edit/:id" element={<CategoryEdit />} />
                  <Route path="show/:id" element={<CategoryShow />} />
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
