import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { KBarProvider } from "@refinedev/kbar";
import {
  ErrorComponent,
  useNotificationProvider,
  ThemedLayout,
  RefineSnackbarProvider,
} from "@refinedev/mui";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { useTranslation } from "react-i18next";
import MopedOutlined from "@mui/icons-material/MopedOutlined";
import Dashboard from "@mui/icons-material/Dashboard";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import Box from "@mui/material/Box";
import { authProvider } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";
import { OrderList, OrderShow } from "./pages/orders";
import { CustomerShow, CustomerList } from "./pages/customers";
import { CourierList, CourierCreate, CourierEdit } from "./pages/couriers";
import { AuthPage } from "./pages/auth";
import { StoreList, StoreEdit, StoreCreate } from "./pages/stores";
import { ProductEdit, ProductList, ProductCreate } from "./pages/products";
import { CategoryList } from "./pages/categories";
import { ColorModeContextProvider } from "./contexts";
import { Header, Title } from "./components";
import { useAutoLoginForDemo } from "./hooks";

const API_URL = "https://api.finefoods.refine.dev";

const App: React.FC = () => {
  // This hook is used to automatically login the user.
  // We use this hook to skip the login page and demonstrate the application more quickly.
  const { loading } = useAutoLoginForDemo();

  const { t, i18n } = useTranslation();
  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  if (loading) {
    return null;
  }

  return (
    <BrowserRouter>
      <GitHubBanner />
      <KBarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(API_URL)}
              authProvider={authProvider}
              i18nProvider={i18nProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                breadcrumb: false,
              }}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "dashboard",
                  list: "/",
                  meta: {
                    label: "Dashboard",
                    icon: <Dashboard />,
                  },
                },
                {
                  name: "orders",
                  list: "/orders",
                  show: "/orders/:id",
                  meta: {
                    icon: <ShoppingBagOutlinedIcon />,
                  },
                },
                {
                  name: "users",
                  list: "/customers",
                  show: "/customers/:id",
                  meta: {
                    icon: <AccountCircleOutlinedIcon />,
                  },
                },
                {
                  name: "products",
                  list: "/products",
                  create: "/products/new",
                  edit: "/products/:id/edit",
                  show: "/products/:id",
                  meta: {
                    icon: <FastfoodOutlinedIcon />,
                  },
                },
                {
                  name: "categories",
                  list: "/categories",
                  meta: {
                    icon: <LabelOutlinedIcon />,
                  },
                },
                {
                  name: "stores",
                  list: "/stores",
                  create: "/stores/new",
                  edit: "/stores/:id/edit",
                  meta: {
                    icon: <StoreOutlinedIcon />,
                  },
                },
                {
                  name: "couriers",
                  list: "/couriers",
                  create: "/couriers/new",
                  edit: "/couriers/:id/edit",
                  meta: {
                    icon: <MopedOutlined />,
                  },
                },
              ]}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-routes"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <ThemedLayout Header={Header} Title={Title}>
                        <Box
                          sx={{
                            maxWidth: "1200px",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        >
                          <Outlet />
                        </Box>
                      </ThemedLayout>
                    </Authenticated>
                  }
                >
                  <Route index element={<DashboardPage />} />

                  <Route path="/orders">
                    <Route index element={<OrderList />} />
                    <Route path=":id" element={<OrderShow />} />
                  </Route>
                  <Route
                    path="/customers"
                    element={
                      <CustomerList>
                        <Outlet />
                      </CustomerList>
                    }
                  >
                    <Route path=":id" element={<CustomerShow />} />
                  </Route>

                  <Route
                    path="/products"
                    element={
                      <ProductList>
                        <Outlet />
                      </ProductList>
                    }
                  >
                    <Route path=":id/edit" element={<ProductEdit />} />
                    <Route path="new" element={<ProductCreate />} />
                  </Route>

                  <Route path="/stores">
                    <Route index element={<StoreList />} />
                    <Route path="new" element={<StoreCreate />} />
                    <Route path=":id/edit" element={<StoreEdit />} />
                  </Route>

                  <Route path="/categories" element={<CategoryList />} />

                  <Route path="/couriers">
                    <Route
                      path=""
                      element={
                        <CourierList>
                          <Outlet />
                        </CourierList>
                      }
                    >
                      <Route path="new" element={<CourierCreate />} />
                    </Route>

                    <Route path=":id/edit" element={<CourierEdit />} />
                  </Route>
                </Route>

                <Route
                  element={
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                      <NavigateToResource resource="dashboard" />
                    </Authenticated>
                  }
                >
                  <Route
                    path="/login"
                    element={
                      <AuthPage
                        type="login"
                        formProps={{
                          defaultValues: {
                            email: "demo@refine.dev",
                            password: "demodemo",
                          },
                        }}
                      />
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <AuthPage
                        type="register"
                        formProps={{
                          defaultValues: {
                            email: "demo@refine.dev",
                            password: "demodemo",
                          },
                        }}
                      />
                    }
                  />
                  <Route
                    path="/forgot-password"
                    element={
                      <AuthPage
                        type="forgotPassword"
                        formProps={{
                          defaultValues: {
                            email: "demo@refine.dev",
                          },
                        }}
                      />
                    }
                  />
                  <Route
                    path="/update-password"
                    element={<AuthPage type="updatePassword" />}
                  />
                </Route>

                <Route
                  element={
                    <Authenticated key="catch-all">
                      <ThemedLayout Header={Header} Title={Title}>
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
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </KBarProvider>
    </BrowserRouter>
  );
};

export default App;
