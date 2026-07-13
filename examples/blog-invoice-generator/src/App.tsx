import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayout,
  ErrorComponent,
  AuthPage,
  RefineThemes,
} from "@refinedev/antd";
import {
  FileAddOutlined,
  UserAddOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
import routerProvider, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";
import { DataProvider } from "@refinedev/strapi-v4";
import { authProvider, axiosInstance } from "./authProvider";

import { CompanyList } from "@/pages/company";
import { ClientList } from "@/pages/client";
import { ContactsList, ContactEdit } from "@/pages/contacts";
import { InvoiceList, InvoiceCreate, InvoiceEdit } from "@/pages/invoice";
import { MissionList } from "@/pages/mission";

import { API_URL } from "./constants";
import { ConfigProvider, App as AntdApp } from "antd";

function App() {
  const dataProvider = DataProvider(`${API_URL}/api`, axiosInstance);

  return (
    <BrowserRouter>
      <GitHubBanner />
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            routerProvider={routerProvider}
            notificationProvider={useNotificationProvider}
            dataProvider={dataProvider}
            authProvider={authProvider}
            resources={[
              {
                name: "companies",
                list: "/companies",
                meta: {
                  label: "Company",
                  icon: <InfoCircleOutlined />,
                },
              },
              {
                name: "clients",
                list: "/clients",
                meta: {
                  icon: <TeamOutlined />,
                },
              },
              {
                name: "contacts",
                list: "/contacts",
                edit: "/contacts/edit/:id",
                meta: {
                  icon: <UserAddOutlined />,
                },
              },
              {
                name: "missions",
                list: "/missions",
                meta: {
                  icon: <SlidersOutlined />,
                },
              },
              {
                name: "invoices",
                list: "/invoices",
                create: "/invoices/create",
                edit: "/invoices/edit/:id",
                meta: {
                  icon: <FileAddOutlined />,
                },
              },
            ]}
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
                    <ThemedLayout>
                      <Outlet />
                    </ThemedLayout>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="companies" />}
                />

                <Route path="companies" element={<CompanyList />} />

                <Route path="clients" element={<ClientList />} />

                <Route path="contacts">
                  <Route index element={<ContactsList />} />
                  <Route path="edit/:id" element={<ContactEdit />} />
                </Route>

                <Route path="missions" element={<MissionList />} />

                <Route path="invoices">
                  <Route index element={<InvoiceList />} />
                  <Route path="edit/:id" element={<InvoiceEdit />} />
                  <Route path="create" element={<InvoiceCreate />} />
                </Route>
              </Route>

              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="companies" />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      formProps={{
                        initialValues: {
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
}

export default App;
