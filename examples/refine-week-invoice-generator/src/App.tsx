import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { DataProvider } from "@refinedev/strapi-v4";
import {
  AuthPage,
  ErrorComponent,
  useNotificationProvider,
  ThemedLayout,
  ThemedTitle as ThemedTitleV2,
} from "@refinedev/antd";
import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";

import * as Icons from "@ant-design/icons";

import { authProvider, axiosInstance } from "./authProvider";
import { Header } from "./components/header";
import { API_URL } from "./constants";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { ClientList } from "./pages/clients";
import { CompanyList } from "./pages/companies";
import { ContactList, EditContact } from "./pages/contacts";
import { CreateInvoice, EditInvoice, InvoiceList } from "./pages/invoices";
import { MissionList } from "./pages/missions";

const {
  UserAddOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  SlidersOutlined,
  FileAddOutlined,
} = Icons;

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            resources={[
              {
                name: "companies",
                list: "/companies",
                meta: {
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
                edit: "/contacts/:id/edit",
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
                edit: "invoices/:id/edit",
                meta: {
                  icon: <FileAddOutlined />,
                },
              },
            ]}
            authProvider={authProvider}
            dataProvider={DataProvider(`${API_URL}/api`, axiosInstance)}
            notificationProvider={useNotificationProvider}
            routerProvider={routerProvider}
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
                    <ThemedLayout
                      Header={Header}
                      Title={({ collapsed }: any) => (
                        <ThemedTitleV2
                          collapsed={collapsed}
                          text="Refine Invoicer"
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayout>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="companies" />}
                />
                <Route path="/companies">
                  <Route index element={<CompanyList />} />
                </Route>
                <Route path="/clients">
                  <Route index element={<ClientList />} />
                </Route>
                <Route path="/contacts">
                  <Route index element={<ContactList />} />
                  <Route path="/contacts/:id/edit" element={<EditContact />} />
                </Route>
                <Route path="/missions">
                  <Route index element={<MissionList />} />
                </Route>
                <Route path="/invoices">
                  <Route index element={<InvoiceList />} />
                  <Route path="/invoices/create" element={<CreateInvoice />} />
                  <Route path="/invoices/:id/edit" element={<EditInvoice />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      title={
                        <ThemedTitleV2
                          collapsed={false}
                          text="Refine Invoicer"
                        />
                      }
                      forgotPasswordLink={false}
                      registerLink={false}
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
                    <ThemedLayout
                      Header={Header}
                      Title={({ collapsed }: any) => (
                        <ThemedTitleV2
                          collapsed={collapsed}
                          text="Refine Invoicer"
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayout>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
