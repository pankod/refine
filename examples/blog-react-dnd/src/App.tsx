import { GitHubBanner, Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayout,
  ErrorComponent,
  RefineThemes,
} from "@refinedev/antd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { ConfigProvider, App as AntdApp } from "antd";
import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";
import DashboardPage from "./pages/dashBoardPage";

function App() {
  return (
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <GitHubBanner />
        <ConfigProvider theme={RefineThemes.Blue}>
          <AntdApp>
            <Refine
              dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
              notificationProvider={useNotificationProvider}
              routerProvider={routerProvider}
              resources={[
                {
                  name: "dashboard",
                  list: "/",
                },
                {
                  name: "posts",
                  list: "/posts",
                  show: "/posts/show/:id",
                  create: "/posts/create",
                  edit: "/posts/edit/:id",
                },
              ]}
            >
              <Routes>
                <Route
                  element={
                    <ThemedLayout>
                      <Outlet />
                    </ThemedLayout>
                  }
                >
                  <Route index element={<DashboardPage />} />

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
          </AntdApp>
        </ConfigProvider>
      </DndProvider>
    </BrowserRouter>
  );
}

export default App;
