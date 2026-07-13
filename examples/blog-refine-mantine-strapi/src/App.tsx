import { Refine, Authenticated, GitHubBanner } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  useNotificationProvider,
  RefineThemes,
  ThemedLayout,
  AuthPage,
} from "@refinedev/mantine";
import { DataProvider } from "@refinedev/strapi-v4";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
  CatchAllNavigate,
} from "@refinedev/react-router";
import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import {
  MantineProvider,
  Global,
  ColorSchemeProvider,
  type ColorScheme,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useLocalStorage } from "@mantine/hooks";
import {
  MantineListInferencer,
  MantineCreateInferencer,
  MantineEditInferencer,
  MantineShowInferencer,
  type InferField,
} from "@refinedev/inferencer/mantine";

import { Header } from "./components/header";
import { authProvider, axiosInstance } from "./authProvider";
import { API_URL } from "./constants";
import { PostList, PostCreate, PostEdit } from "./pages/posts";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const fieldTransformer = (field: InferField) => {
    if (["locale", "updatedAt", "publishedAt"].includes(field.key)) {
      return false;
    }

    return field;
  };

  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{
              ...RefineThemes.Blue,
              colorScheme: colorScheme,
            }}
            withNormalizeCSS
            withGlobalStyles
          >
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
              <Refine
                authProvider={authProvider}
                dataProvider={DataProvider(`${API_URL}/api`, axiosInstance)}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                resources={[
                  {
                    name: "posts",
                    list: "/posts",
                    create: "/posts/create",
                    edit: "/posts/edit/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "categories",
                    list: "/categories",
                    create: "/categories/create",
                    edit: "/categories/edit/:id",
                    show: "/categories/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  mutationMode: "optimistic",
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
                        <ThemedLayout Header={() => <Header sticky />}>
                          <Outlet />
                        </ThemedLayout>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="posts" />}
                    />

                    <Route path="/posts">
                      <Route index element={<PostList />} />
                      <Route path="create" element={<PostCreate />} />
                      <Route path="edit/:id" element={<PostEdit />} />
                    </Route>

                    <Route path="/categories">
                      <Route
                        index
                        element={
                          <MantineListInferencer
                            fieldTransformer={fieldTransformer}
                          />
                        }
                      />
                      <Route
                        path="create"
                        element={
                          <MantineCreateInferencer
                            fieldTransformer={fieldTransformer}
                          />
                        }
                      />
                      <Route
                        path="edit/:id"
                        element={
                          <MantineEditInferencer
                            fieldTransformer={fieldTransformer}
                          />
                        }
                      />
                      <Route
                        path="show/:id"
                        element={
                          <MantineShowInferencer
                            fieldTransformer={fieldTransformer}
                          />
                        }
                      />
                    </Route>
                  </Route>

                  <Route
                    element={
                      <Authenticated key="auth-pages" fallback={<Outlet />}>
                        <NavigateToResource resource="posts" />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<AuthPage type="login" />} />
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
