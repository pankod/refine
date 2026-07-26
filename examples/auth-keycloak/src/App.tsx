import {
  GitHubBanner,
  Refine,
  type AuthProvider,
  Authenticated,
} from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayout,
  ThemedSider,
  ThemedTitle,
  ErrorComponent,
  RefineThemes,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import "./custom.css";
import routerProvider, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { ConfigProvider, App as AntdApp } from "antd";

import axios from "axios";
import { emptyDataProvider } from "./providers/emptyDataProvider";
import { keycloakDataProvider } from "./providers/keycloakDataProvider";
import { apiDeviceProvider } from "./providers/apiDeviceProvider";
import { apiDashboardProvider } from "./providers/apiDashboardProvider";

import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";

import { UserList } from "./pages/users";
import { RoleList } from "./pages/roles";
import { GroupList } from "./pages/groups";
import { DeviceList } from "./pages/devices";
import { DashboardList } from "./pages/dashboards";
import { HomeDashboard } from "./pages/home";
import { TeamOutlined, DesktopOutlined, DashboardOutlined, SafetyCertificateOutlined, UsergroupAddOutlined, HomeOutlined } from "@ant-design/icons";
import { CustomHeader } from "./components/header";
import { Login } from "../src/pages/login";
import { AccountPage } from "./pages/account";
import { useKeycloak } from "@react-keycloak/web";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  const authProvider: AuthProvider = {
    login: async () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const { to } = Object.fromEntries(urlSearchParams.entries());
      await keycloak.login({
        redirectUri: to ? `${window.location.origin}${to}` : undefined,
      });
      return {
        success: false,
        error: new Error("Login failed"),
      };
    },
    logout: async () => {
      try {
        await keycloak.logout({
          redirectUri: window.location.origin,
        });
        return {
          success: true,
          redirectTo: "/login",
        };
      } catch (error) {
        return {
          success: false,
          error: new Error("Logout failed"),
        };
      }
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return { error };
    },
    check: async () => {
      try {
        const { token } = keycloak;
        if (token) {
          axios.defaults.headers.common = {
            Authorization: `Bearer ${token}`,
          };
          return {
            authenticated: true,
          };
        }
        return {
          authenticated: false,
          logout: true,
          redirectTo: "/login",
          error: {
            message: "Check failed",
            name: "Token not found",
          },
        };
      } catch (error) {
        return {
          authenticated: false,
          logout: true,
          redirectTo: "/login",
          error: {
            message: "Check failed",
            name: "Token not found",
          },
        };
      }
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      if (keycloak?.tokenParsed) {
        return {
          name: keycloak.tokenParsed.name || keycloak.tokenParsed.preferred_username || keycloak.tokenParsed.family_name,
          email: keycloak.tokenParsed.email,
          roles: keycloak.tokenParsed.realm_access?.roles || [],
          username: keycloak.tokenParsed.preferred_username,
        };
      }
      return null;
    },
  };

  return (
    <BrowserRouter>
      <ConfigProvider theme={{
        ...RefineThemes.Green, // Use Green as base instead of Blue
        token: {
          ...RefineThemes.Green?.token,
          colorPrimary: "#0B5D3B",
          colorSuccess: "#2FA84F",
          colorWarning: "#F6B737",
          colorInfo: "#0F6B8F",
          fontFamily: "'Inter', 'Arial', sans-serif",
          colorText: "#10231B",
        },
        components: {
          ...RefineThemes.Green?.components,
          Layout: {
            ...RefineThemes.Green?.components?.Layout,
            siderBg: "#0B5D3B",
            triggerBg: "#094a2f",
          },
          Menu: {
            ...RefineThemes.Green?.components?.Menu,
            itemBg: "transparent",
            itemColor: "#ffffff",
            itemSelectedBg: "#2FA84F",
            itemSelectedColor: "#ffffff",
            itemHoverBg: "rgba(255, 255, 255, 0.1)",
            darkItemBg: "transparent",
            darkItemColor: "#ffffff",
            darkItemSelectedBg: "#2FA84F",
            darkItemSelectedColor: "#ffffff",
            darkItemHoverBg: "rgba(255, 255, 255, 0.1)",
          }
        }
      }}>
        <AntdApp>
          <Refine
            authProvider={authProvider}
            dataProvider={{
              default: emptyDataProvider,
              identity: keycloakDataProvider(keycloak),
              devices: apiDeviceProvider,
              telemetry: apiDeviceProvider,
              dashboards: apiDashboardProvider
            }}
            routerProvider={routerProvider}
            resources={[
              { name: "home", list: "/", meta: { label: "Trang chủ", icon: <HomeOutlined /> } },
              { name: "dashboards", list: "/dashboards", meta: { label: "Bảng điều khiển", icon: <DashboardOutlined />, dataProviderName: "dashboards" } },
              { name: "devices", list: "/devices", meta: { label: "Thiết bị", icon: <DesktopOutlined />, dataProviderName: "devices" } },
              { name: "identity", meta: { label: "Quản lý truy cập", icon: <TeamOutlined /> } },
              { name: "users", list: "/users", meta: { parent: "identity", label: "Người dùng", icon: <TeamOutlined />, dataProviderName: "identity" } },
              { name: "roles", list: "/roles", meta: { parent: "identity", label: "Phân quyền", icon: <SafetyCertificateOutlined />, dataProviderName: "identity" } },
              { name: "groups", list: "/groups", meta: { parent: "identity", label: "Nhóm (Groups)", icon: <UsergroupAddOutlined />, dataProviderName: "identity" } }
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
                    <ThemedLayout
                      Header={() => <CustomHeader />}
                      Sider={(props) => (
                        <ThemedSider 
                          {...props} 
                          theme="dark"
                          style={{ backgroundColor: "#0B5D3B" }}
                          render={({ items }) => <>{items}</>}
                          Title={({ collapsed }) => (
                            <ThemedTitle
                              collapsed={collapsed}
                              text={null}
                              wrapperStyles={{ backgroundColor: "transparent" }}
                              icon={
                                <img 
                                  src={collapsed ? "/logo.png" : "/logo-full.png"} 
                                  alt="GreenIQ" 
                                  style={{ height: collapsed ? "32px" : "40px" }} 
                                />
                              }
                            />
                          )}
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayout>
                  </Authenticated>
                }
              >
                <Route index element={<HomeDashboard />} />
                <Route path="/dashboards" element={<DashboardList />} />
                <Route path="/devices" element={<DeviceList />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/roles" element={<RoleList />} />
                <Route path="/groups" element={<GroupList />} />
                <Route path="/account" element={<AccountPage />} />
              </Route>

              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="home" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
              </Route>

              <Route
                element={
                  <Authenticated key="catch-all">
                    <ThemedLayout
                      Header={() => <CustomHeader />}
                      Sider={(props) => (
                        <ThemedSider 
                          {...props} 
                          theme="dark"
                          style={{ backgroundColor: "#0B5D3B" }}
                          render={({ items }) => <>{items}</>}
                          Title={({ collapsed }) => (
                            <ThemedTitle
                              collapsed={collapsed}
                              text={null}
                              wrapperStyles={{ backgroundColor: "transparent" }}
                              icon={
                                <img 
                                  src={collapsed ? "/logo.png" : "/logo-full.png"} 
                                  alt="GreenIQ" 
                                  style={{ height: collapsed ? "32px" : "40px" }} 
                                />
                              }
                            />
                          )}
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
            <UnsavedChangesNotifier />
            <DocumentTitleHandler handler={({ autoGeneratedTitle }) => autoGeneratedTitle.replace("Refine", "GreenIQ")} />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
