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
import { ConfigProvider, App as AntdApp } from "antd";

import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";

import { Header } from "./components/header";
import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";
import { UserList, UserCreate, UserEdit, UserShow } from "./pages/users";
import {
  CategoryList,
  CategoryCreate,
  CategoryEdit,
  CategoryShow,
} from "./pages/categories";
import { PermifyClient } from "./authz/permifyClient";

const API_URL = "https://api.fake-rest.refine.dev";

// Create an instance of Permify Client
const instance = "http://localhost:3476";
const permify = new PermifyClient(instance);

//sample users data
import users from "./data/users.json";

const App: React.FC = () => {
  const role = localStorage.getItem("role") ?? "admin";
  const user =
    users.find((user) => user.roles[0].guard_name === role) ?? users[0];
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            dataProvider={dataProvider(API_URL)}
            accessControlProvider={{
              can: async ({ action, params, resource }) => {
                console.log("action", action);
                console.log("resourceAPP", resource);
                console.log("params", params);

                if (action) {
                  //post specific access checks - show, edit and delete a post
                  if (
                    action === "show" ||
                    action === "edit" ||
                    action === "delete"
                  ) {
                    const result = await permify.isAuthorized(
                      user.id,
                      resource!,
                      action,
                      params?.id,
                    );
                    return Promise.resolve({
                      can: result,
                    });
                  }

                  //organization specific access checks - listing posts & creating posts
                  const result = await permify.isAuthorized(
                    user.id,
                    "organization",
                    action,
                    user.organization_id,
                  );
                  return Promise.resolve({
                    can: result,
                  });
                }
                return Promise.resolve({
                  can: true,
                });
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
