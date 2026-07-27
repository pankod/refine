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
import { ConfigProvider, App as AntdApp, Spin } from "antd";

import axios from "axios";
import { emptyDataProvider } from "./providers/emptyDataProvider";
import { keycloakDataProvider } from "./providers/keycloakDataProvider";
import { apiDeviceProvider } from "./providers/apiDeviceProvider";
import { apiDashboardProvider } from "./providers/apiDashboardProvider";
import { liveProvider } from "./providers/liveProvider";

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

/**
 * ============================================================================
 * MODULE: FRONTEND CORE (Tập tin Gốc của Toàn bộ Giao diện Web)
 * ============================================================================
 * Tập tin này là trái tim của giao diện, nơi cấu hình và khởi chạy nền tảng Refine.
 * Nhiệm vụ chính:
 * 1. Cấu hình Data Providers: Khai báo cách lấy dữ liệu cho từng Resource (Thiết bị, Người dùng,...).
 * 2. Cấu hình Auth Provider: Tích hợp Keycloak SSO để lo việc Đăng nhập/Đăng xuất.
 * 3. Cấu hình Live Provider: Kết nối MQTT qua WebSocket để nhận dữ liệu thời gian thực.
 * 4. Cấu hình Routing: Gắn giao diện (Page) vào các đường dẫn (URL) cụ thể.
 * 5. Cấu hình Giao diện (Theme): Sử dụng Ant Design, tùy biến màu Xanh lá (GreenIQ).
 */

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  // Hook lấy đối tượng keycloak từ thư viện @react-keycloak/web
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
        <img src="/logo-full.png" alt="Green IQ" className="pulse-logo" style={{ height: '70px', marginBottom: '32px' }} />
        <Spin size="large" />
      </div>
    );
  }

  /**
   * CẤU HÌNH AUTH PROVIDER (BỘ CHỨNG THỰC)
   * AuthProvider là interface chuẩn của Refine để quản lý phiên đăng nhập.
   * Ở đây, chúng ta "ủy quyền" toàn bộ các hàm này cho đối tượng `keycloak`.
   */
  const authProvider: AuthProvider = {
    // 1. Hàm Xử lý Đăng Nhập
    login: async () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const { to } = Object.fromEntries(urlSearchParams.entries());
      // Chuyển hướng người dùng sang trang Đăng nhập riêng của Keycloak (auth.greeniq.vn)
      await keycloak.login({
        redirectUri: to ? `${window.location.origin}${to}` : undefined,
      });
      return {
        success: false,
        error: new Error("Login failed"),
      };
    },
    // 2. Hàm Xử lý Đăng Xuất
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
    // 3. Xử lý Lỗi (Khi API báo lỗi 401 Unauthorized -> Đăng xuất)
    onError: async (error) => {
      if (error.response?.status === 401) {
        return { logout: true };
      }
      return { error };
    },
    // 4. Kiểm tra xem người dùng có đang đăng nhập hay không?
    check: async () => {
      try {
        const { token } = keycloak;
        if (token) {
          // Gắn Token JWT vào mọi Request API tiếp theo bằng thư viện axios
          axios.defaults.headers.common = {
            Authorization: `Bearer ${token}`,
          };
          return { authenticated: true };
        }
        return {
          authenticated: false,
          logout: true,
          redirectTo: "/login",
          error: { message: "Check failed", name: "Token not found" },
        };
      } catch (error) {
        return {
          authenticated: false,
          logout: true,
          redirectTo: "/login",
          error: { message: "Check failed", name: "Token not found" },
        };
      }
    },
    // 5. Kiểm tra phân quyền (Roles/Permissions) - Bỏ qua tạm thời
    getPermissions: async () => null,
    // 6. Lấy Thông tin Hồ sơ Người dùng (Hiển thị trên Header: Tên, Email)
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
        // 🎨 TUỲ BIẾN MÀU SẮC GIAO DIỆN (THEME - GREENIQ)
        ...RefineThemes.Green, // Dùng bộ nền tảng Xanh lá chuẩn của Refine
        token: {
          ...RefineThemes.Green?.token,
          colorPrimary: "#0B5D3B", // Màu xanh lục đậm (Thương hiệu GreenIQ)
          colorSuccess: "#2FA84F",
          colorWarning: "#F6B737",
          colorInfo: "#0F6B8F",
          fontFamily: "'Inter', 'Arial', sans-serif", // Font chữ hiện đại
          colorText: "#10231B",
        },
        components: {
          ...RefineThemes.Green?.components,
          Layout: {
            ...RefineThemes.Green?.components?.Layout,
            siderBg: "#0B5D3B", // Nền Sidebar
            triggerBg: "#094a2f", // Nền nút Collapse Sidebar
          },
          Menu: {
            // Tùy chỉnh màu sắc Menu bên trái cho đẹp và tương phản
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
          {/* CỐT LÕI CỦA REFINE NẰM TẠI ĐÂY */}
          <Refine
            authProvider={authProvider}
            
            // 📡 DATA PROVIDERS: Hướng dẫn Refine lấy dữ liệu ở đâu cho mỗi thực thể
            dataProvider={{
              default: emptyDataProvider, // Mặc định không làm gì nếu không khai báo
              identity: keycloakDataProvider(keycloak), // API của Keycloak (User, Roles, Groups)
              devices: apiDeviceProvider, // API Quản lý Thiết bị (Từ Backend Node.js)
              telemetry: apiDeviceProvider, // API Lấy Telemetry
              dashboards: apiDashboardProvider // API Quản lý Dashboards
            }}
            
            routerProvider={routerProvider}
            
            // 📚 RESOURCES: Khai báo các trang/tài nguyên có trong hệ thống và gắn icon, route, provider cho nó
            resources={[
              { name: "home", list: "/", meta: { label: "Trang chủ", icon: <HomeOutlined /> } },
              { name: "dashboards", list: "/dashboards", meta: { label: "Bảng điều khiển", icon: <DashboardOutlined />, dataProviderName: "dashboards" } },
              { name: "devices", list: "/devices", meta: { label: "Thiết bị", icon: <DesktopOutlined />, dataProviderName: "devices" } },
              // Menu Cha: Quản lý truy cập
              { name: "identity", meta: { label: "Quản lý truy cập", icon: <TeamOutlined /> } },
              { name: "users", list: "/users", meta: { parent: "identity", label: "Người dùng", icon: <TeamOutlined />, dataProviderName: "identity" } },
              { name: "roles", list: "/roles", meta: { parent: "identity", label: "Phân quyền", icon: <SafetyCertificateOutlined />, dataProviderName: "identity" } },
              { name: "groups", list: "/groups", meta: { parent: "identity", label: "Nhóm (Groups)", icon: <UsergroupAddOutlined />, dataProviderName: "identity" } }
            ]}
            notificationProvider={useNotificationProvider}
            
            // ⚡ LIVE PROVIDER: Kết nối WebSocket (MQTT) để tự động reload lại trang nếu có ai đó cập nhật dữ liệu
            liveProvider={liveProvider("wss://mqtt.greeniq.vn/mqtt")}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              liveMode: "auto", // Tự động reload (hoặc báo vàng vàng) khi có data update
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
            <DocumentTitleHandler handler={({ autoGeneratedTitle }) => autoGeneratedTitle.replace("Refine", "Green IQ")} />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
