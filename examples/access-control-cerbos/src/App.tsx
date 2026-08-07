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

import { HTTP as Cerbos } from "@cerbos/http";

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

const API_URL = "https://api.fake-rest.refine.dev";

// This is making use of the hosted Cerbos Policy Decision Point
// You can view the policies in the Playground https://play.cerbos.dev/p/UWG3inHjwrFhqkv60dec623G9PoYlgJf
// For production we recommend running a PDP container along side your application
// See https://cerbos.dev for more information

// The Cerbos PDP instance
const cerbos = new Cerbos("https://demo-pdp.cerbos.cloud", {
  playgroundInstance: "WS961950bd85QNYlAvTmJYubP0bqF7e3", // The playground instance ID to test
});

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
                const result = await cerbos.checkResource({
                  principal: {
                    id: "demoUser", // Fake a user ID
                    roles: [role],
                    policyVersion: "default",
                    // this is where user attributes can be passed
                    attributes: {},
                  },
                  resource: {
                    kind: resource ?? "",
                    policyVersion: "default",
                    id: `${params?.id}` || "new",
                    attributes: params,
                  },
                  // the list of actions on the resource to check authorization for
                  actions: [action],
                });
                return Promise.resolve({
                  can: result.isAllowed(action) || false,
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
