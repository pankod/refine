import { GitHubBanner, Refine, Authenticated } from "@refinedev/core";
import { useNotificationProvider, ErrorComponent } from "@refinedev/antd";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { ConfigProvider, App as AntdApp } from "antd";
import { GithubOutlined } from "@ant-design/icons";

import { Layout } from "./components/layout";
import { CanvasFeaturedList, CanvasList, CanvasShow } from "./pages/canvases";
import { AuthPage } from "./pages/auth";
import { supabaseClient } from "./utility";
import { authProvider, auditLogProvider } from "./providers";

import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";
import "./styles/style.css";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#3ecf8e",
            colorText: "#80808a",
            colorError: "#fa541c",
            colorBgLayout: "#f0f2f5",
            colorLink: "#3ecf8e",
            colorLinkActive: "#3ecf8e",
            colorLinkHover: "#3ecf8e",
          },
        }}
      >
        <AntdApp>
          <Refine
            authProvider={authProvider}
            dataProvider={dataProvider(supabaseClient)}
            liveProvider={liveProvider(supabaseClient)}
            auditLogProvider={auditLogProvider}
            routerProvider={routerProvider}
            resources={[
              {
                name: "canvases",
                list: "/canvases",
                show: "/canvases/show/:id",
              },
            ]}
            notificationProvider={useNotificationProvider}
            options={{}}
          >
            <Routes>
              <Route
                element={
                  <Layout>
                    <Outlet />
                  </Layout>
                }
              >
                <Route index element={<CanvasFeaturedList />} />

                <Route path="/canvases">
                  <Route index element={<CanvasList />} />
                  <Route path="show/:id" element={<CanvasShow />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<Outlet />}
                  >
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      providers={[
                        {
                          name: "github",
                          icon: (
                            <GithubOutlined
                              style={{
                                fontSize: "18px",
                              }}
                            />
                          ),
                          label: "Sign in with GitHub",
                        },
                      ]}
                    />
                  }
                />
                <Route
                  path="/register"
                  element={<AuthPage type="register" />}
                />
                <Route
                  path="/forgot-password"
                  element={<AuthPage type="forgotPassword" />}
                />
                <Route
                  path="/update-password"
                  element={<AuthPage type="updatePassword" />}
                />
              </Route>

              <Route
                element={
                  <Layout>
                    <Outlet />
                  </Layout>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
