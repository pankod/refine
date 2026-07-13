import {
  Authenticated,
  CanAccess,
  ErrorComponent,
  Refine,
} from "@refinedev/core";
import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
  NavigateToResource,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

import { PageEmployeeTimeOffsList } from "@/pages/employee/time-offs/list";
import { PageEmployeeTimeOffsCreate } from "@/pages/employee/time-offs/create";
import { PageManagerRequestsList } from "@/pages/manager/requests/list";
import { PageManagerRequestsTimeOffsEdit } from "@/pages/manager/requests/time-offs/edit";
import { PageLogin } from "@/pages/login";

import { Layout } from "@/components/layout";

import { ThemeProvider } from "@/providers/theme-provider";
import { authProvider } from "@/providers/auth-provider";
import { accessControlProvider } from "@/providers/access-control";
import { useNotificationProvider } from "@/providers/notification-provider";
import { queryClient } from "@/providers/query-client";
import { dataProvider } from "@/providers/data";

import { RequestsIcon, TimeOffIcon } from "@/icons";

import { Role } from "@/types";

import "@/utilities/init-dayjs";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <DevtoolsProvider>
          <Refine
            accessControlProvider={accessControlProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            dataProvider={dataProvider}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "employee",
                meta: {
                  scope: Role.EMPLOYEE,
                },
              },
              {
                name: "manager",
                meta: {
                  scope: Role.MANAGER,
                  order: 1,
                },
              },
              {
                name: "time-offs",
                list: "/employee/time-offs",
                create: "/employee/time-offs/new",
                meta: {
                  parent: "employee",
                  scope: Role.EMPLOYEE,
                  label: "Time Off",
                  icon: <TimeOffIcon />,
                },
              },
              {
                name: "time-offs",
                list: "/manager/requests",
                edit: "/manager/requests/:id/edit",
                identifier: "requests",
                meta: {
                  parent: "manager",
                  scope: Role.MANAGER,
                  label: "Requests",
                  icon: <RequestsIcon />,
                },
              },
            ]}
            options={{
              reactQuery: {
                clientConfig: queryClient,
              },
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    redirectOnFail="/login"
                  >
                    <Outlet />
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="time-offs" />}
                />

                <Route
                  path="employee"
                  element={
                    <ThemeProvider role={Role.EMPLOYEE}>
                      <Layout>
                        <Outlet />
                      </Layout>
                    </ThemeProvider>
                  }
                >
                  <Route path="time-offs" element={<Outlet />}>
                    <Route index element={<PageEmployeeTimeOffsList />} />
                    <Route
                      path="new"
                      element={<PageEmployeeTimeOffsCreate />}
                    />
                  </Route>
                </Route>
              </Route>

              <Route
                path="manager"
                element={
                  <ThemeProvider role={Role.MANAGER}>
                    <Layout>
                      <CanAccess
                        action="manager"
                        fallback={<NavigateToResource resource="time-offs" />}
                      >
                        <Outlet />
                      </CanAccess>
                    </Layout>
                  </ThemeProvider>
                }
              >
                <Route
                  path="requests"
                  element={
                    <PageManagerRequestsList>
                      <Outlet />
                    </PageManagerRequestsList>
                  }
                >
                  <Route
                    path=":id/edit"
                    element={<PageManagerRequestsTimeOffsEdit />}
                  />
                </Route>
              </Route>

              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="time-offs" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<PageLogin />} />
              </Route>

              <Route
                element={
                  <Authenticated key="catch-all">
                    <Layout>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>

            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
            <Toaster position="bottom-right" reverseOrder={false} />
            <DevtoolsPanel />
          </Refine>
        </DevtoolsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
