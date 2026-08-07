import { GitHubBanner, type MutationMode, Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayout,
  ErrorComponent,
  RefineThemes,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { ConfigProvider, App as AntdApp } from "antd";
import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit } from "../src/pages/posts";
import { useState } from "react";
import MutationModePicker from "../src/components/mutation-mode-picker";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  const [mutationMode, setMutationMode] = useState<MutationMode>("undoable");

  return (
    <BrowserRouter>
      <GitHubBanner />
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            dataProvider={dataProvider(API_URL)}
            routerProvider={routerProvider}
            resources={[
              {
                name: "posts",
                list: "/posts",
                create: "/posts/create",
                clone: "/posts/clone/:id",
                edit: "/posts/edit/:id",
                meta: {
                  canDelete: true,
                },
              },
            ]}
            notificationProvider={useNotificationProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              mutationMode: mutationMode,
            }}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayout>
                    <Outlet />
                  </ThemedLayout>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="posts" />}
                />

                <Route path="/posts">
                  <Route index element={<PostList />} />
                  <Route path="create" element={<PostCreate />} />
                  <Route path="clone/:id" element={<PostCreate />} />
                  <Route path="edit/:id" element={<PostEdit />} />
                </Route>

                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
          <MutationModePicker
            currentMutationMode={mutationMode}
            onMutationModeChange={setMutationMode}
          />
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
