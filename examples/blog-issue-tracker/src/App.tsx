import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayout,
  ErrorComponent,
} from "@refinedev/antd";
import routerProvider, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { DashboardOutlined } from "@ant-design/icons";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { App as AntdApp } from "antd";
import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";

import { Header } from "./components";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { TaskCreate, TaskEdit, TaskList, TaskShow } from "./pages/task";
import { UserList } from "./pages/user";
import authProvider from "./providers/auth";
import { dataProvider } from "./providers/data";

function App() {
  return (
    <DevtoolsProvider>
      <BrowserRouter>
        <GitHubBanner />
        <RefineKbarProvider>
          <ColorModeContextProvider>
            <AntdApp>
              <Refine
                dataProvider={dataProvider}
                authProvider={authProvider}
                routerProvider={routerProvider}
                resources={[
                  {
                    name: "dashboard",
                    list: "/",
                    meta: {
                      label: "Dashboard",
                      icon: <DashboardOutlined />,
                    },
                  },
                  {
                    name: "users",
                    list: "/users",
                  },
                  {
                    name: "tasks",
                    list: "/tasks",
                    show: "/tasks/show/:id",
                    create: "/tasks/create",
                    edit: "/tasks/edit/:id",
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
                      <Authenticated
                        key="authenticated-routes"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayout Header={Header}>
                          <Outlet />
                        </ThemedLayout>
                      </Authenticated>
                    }
                  >
                    <Route index element={<Dashboard />} />

                    <Route path="users" element={<UserList />} />

                    <Route path="tasks">
                      <Route index element={<TaskList />} />
                      <Route path="edit/:id" element={<TaskEdit />} />
                      <Route path="create" element={<TaskCreate />} />
                      <Route path="show/:id" element={<TaskShow />} />
                    </Route>

                    <Route path="*" element={<ErrorComponent />} />
                  </Route>

                  <Route
                    element={
                      <Authenticated key="auth-pages" fallback={<Outlet />}>
                        <NavigateToResource resource="dashboard" />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </AntdApp>
          </ColorModeContextProvider>
        </RefineKbarProvider>
        <DevtoolsPanel />
      </BrowserRouter>
    </DevtoolsProvider>
  );
}

export default App;
