import { GitHubBanner, Refine, ErrorComponent } from "@refinedev/core";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import dataProvider from "@refinedev/simple-rest";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { notificationProvider } from "./providers/notificationProvider";
import { PostList, PostCreate, PostEdit } from "./pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <Refine
        dataProvider={dataProvider(API_URL)}
        routerProvider={routerProvider}
        notificationProvider={notificationProvider}
        resources={[
          {
            name: "posts",
            list: "/posts",
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
              <div>
                <Outlet />
                <ToastContainer />
              </div>
            }
          >
            <Route index element={<NavigateToResource resource="posts" />} />

            <Route path="posts">
              <Route index element={<PostList />} />
              <Route path="create" element={<PostCreate />} />
              <Route path="edit/:id" element={<PostEdit />} />
            </Route>

            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>
        <UnsavedChangesNotifier />
        <DocumentTitleHandler />
      </Refine>
    </BrowserRouter>
  );
};

export default App;
