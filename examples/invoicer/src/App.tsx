import { Authenticated, Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayout,
  ErrorComponent,
  AuthPage,
} from "@refinedev/antd";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
  CatchAllNavigate,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { App as AntdApp } from "antd";
import { Header } from "@/components/header";
import { Logo } from "@/components/logo";
import {
  AccountsPageList,
  AccountsPageCreate,
  AccountsPageEdit,
} from "@/pages/accounts";
import {
  ClientsPageList,
  ClientsPageCreate,
  ClientsPageEdit,
} from "@/pages/clients";
import {
  InvoicePageList,
  InvoicesPageCreate,
  InvoicesPageShow,
} from "@/pages/invoices";
import { dataProvider } from "@/providers/data-provider";
import { authProvider } from "@/providers/auth-provider";
import { ConfigProvider } from "@/providers/config-provider";
import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";
import "./styles/custom.css";

const App: React.FC = () => {
  return (
    <DevtoolsProvider>
      <BrowserRouter>
        <ConfigProvider>
          <AntdApp>
            <Refine
              routerProvider={routerProvider}
              authProvider={authProvider}
              dataProvider={dataProvider}
              resources={[
                {
                  name: "accounts",
                  list: "/accounts",
                  create: "/accounts/new",
                  edit: "/accounts/:id/edit",
                },
                {
                  name: "clients",
                  list: "/clients",
                  create: "/clients/new",
                  edit: "/clients/:id/edit",
                },
                {
                  name: "invoices",
                  list: "/invoices",
                  show: "/invoices/:id",
                  create: "/invoices/new",
                },
              ]}
              notificationProvider={useNotificationProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                breadcrumb: false,
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
                        Header={() => <Header />}
                        Sider={() => null}
                      >
                        <div
                          style={{
                            maxWidth: "1280px",
                            padding: "24px",
                            margin: "0 auto",
                          }}
                        >
                          <Outlet />
                        </div>
                      </ThemedLayout>
                    </Authenticated>
                  }
                >
                  <Route index element={<NavigateToResource />} />
                  <Route
                    path="/accounts"
                    element={
                      <AccountsPageList>
                        <Outlet />
                      </AccountsPageList>
                    }
                  >
                    <Route index element={null} />
                    <Route path="new" element={<AccountsPageCreate />} />
                  </Route>
                  <Route
                    path="/accounts/:id/edit"
                    element={<AccountsPageEdit />}
                  />

                  <Route
                    path="/clients"
                    element={
                      <ClientsPageList>
                        <Outlet />
                      </ClientsPageList>
                    }
                  >
                    <Route index element={null} />
                    <Route path="new" element={<ClientsPageCreate />} />
                  </Route>
                  <Route
                    path="/clients/:id/edit"
                    element={<ClientsPageEdit />}
                  />

                  <Route path="/invoices">
                    <Route index element={<InvoicePageList />} />
                    <Route path="new" element={<InvoicesPageCreate />} />
                    <Route path=":id" element={<InvoicesPageShow />} />
                  </Route>

                  <Route path="*" element={<ErrorComponent />} />
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
                        registerLink={false}
                        forgotPasswordLink={false}
                        title={
                          <Logo
                            titleProps={{ level: 2 }}
                            svgProps={{
                              width: "48px",
                              height: "40px",
                            }}
                          />
                        }
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
                        Header={() => <Header />}
                        Sider={() => null}
                      >
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
        <DevtoolsPanel />
      </BrowserRouter>
    </DevtoolsProvider>
  );
};

export default App;
