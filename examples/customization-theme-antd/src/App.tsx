import { useState } from "react";
import { GitHubBanner, Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayout,
  ErrorComponent,
  RefineThemes,
} from "@refinedev/antd";
import { ConfigProvider, theme } from "antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";

import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";

import Header from "./components/Header";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

  return (
    <BrowserRouter>
      <GitHubBanner />
      <ConfigProvider
        theme={{
          ...RefineThemes.Blue,
          algorithm:
            currentTheme === "light"
              ? theme.defaultAlgorithm
              : theme.darkAlgorithm,
          components: {
            Button: {
              borderRadius: 0,
            },
            Typography: {
              colorTextHeading: "#1890ff",
            },
          },
          token: {
            colorPrimary: "#f0f",
          },
        }}
      >
        <Refine
          dataProvider={dataProvider(API_URL)}
          routerProvider={routerProvider}
          resources={[
            {
              name: "posts",
              list: "/posts",
              show: "/posts/show/:id",
              create: "/posts/create",
              edit: "/posts/edit/:id",
            },
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
                <ThemedLayout
                  Header={() => (
                    <Header theme={currentTheme} setTheme={setCurrentTheme} />
                  )}
                >
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route index element={<NavigateToResource resource="posts" />} />

              <Route path="/posts">
                <Route index element={<PostList />} />
                <Route path="create" element={<PostCreate />} />
                <Route path="edit/:id" element={<PostEdit />} />
                <Route path="show/:id" element={<PostShow />} />
              </Route>

              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
