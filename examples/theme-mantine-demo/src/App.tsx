import { useState } from "react";
import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import {
  ThemedLayout,
  ErrorComponent,
  useNotificationProvider,
  AuthPage,
  RefineThemes,
} from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import {
  MantineProvider,
  Global,
  type ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { IconBrandGoogle, IconBrandGithub } from "@tabler/icons-react";

import { PostCreate, PostEdit, PostList, PostShow } from "./pages";
import { authProvider } from "./authProvider";
import ThemeSettings from "./components/theme-settings";
import DashboardPage from "./pages/dashboard";

const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const [customTheme, setCustomTheme] = useState(RefineThemes.Blue);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <BrowserRouter>
      <GitHubBanner />
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme: colorScheme,
            ...customTheme,
          }}
          withNormalizeCSS
          withGlobalStyles
        >
          <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
          <ThemeSettings onThemeClick={(theme) => setCustomTheme(theme)} />
          <NotificationsProvider position="top-right">
            <Refine
              routerProvider={routerProvider}
              authProvider={authProvider}
              dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "posts",
                  list: "/posts",
                  show: "/posts/show/:id",
                  create: "/posts/create",
                  edit: "/posts/edit/:id",
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
                  <Route index element={<DashboardPage />} />

                  <Route path="/posts">
                    <Route index element={<PostList />} />
                    <Route path="create" element={<PostCreate />} />
                    <Route path="edit/:id" element={<PostEdit />} />
                    <Route path="show/:id" element={<PostShow />} />
                  </Route>
                </Route>

                <Route
                  element={
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                      <NavigateToResource resource="posts" />
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
                            name: "google",
                            label: "Sign in with Google",
                            icon: <IconBrandGoogle size="16px" />,
                          },
                          {
                            name: "github",
                            label: "Sign in with GitHub",
                            icon: <IconBrandGithub size="16px" />,
                          },
                        ]}
                      />
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <AuthPage
                        type="register"
                        providers={[
                          {
                            name: "google",
                            label: "Sign in with Google",
                            icon: <IconBrandGoogle size="16px" />,
                          },
                          {
                            name: "github",
                            label: "Sign in with GitHub",
                            icon: <IconBrandGithub size="16px" />,
                          },
                        ]}
                      />
                    }
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
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </BrowserRouter>
  );
};

export default App;
