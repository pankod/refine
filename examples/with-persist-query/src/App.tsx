import { GitHubBanner, Refine, ErrorComponent } from "@refinedev/core";
import { QueryClient } from "@tanstack/react-query";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route } from "react-router";
import dataProvider from "@refinedev/simple-rest";
import "./App.css";

import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

import { PostList, PostCreate, PostEdit } from "./pages/posts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});
// const sessionStoragePersister = createSyncStoragePersister({ storage: window.sessionStorage })

persistQueryClient({
  queryClient: queryClient as any,
  persister: localStoragePersister,
});

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <Refine
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        routerProvider={routerProvider}
        options={{
          reactQuery: {
            clientConfig: queryClient,
          },
          warnWhenUnsavedChanges: true,
          syncWithLocation: true,
        }}
        resources={[
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
            edit: "/posts/edit/:id",
          },
        ]}
      >
        <Routes>
          <Route index element={<NavigateToResource resource="posts" />} />

          <Route path="posts">
            <Route index element={<PostList />} />
            <Route path="create" element={<PostCreate />} />
            <Route path="edit/:id" element={<PostEdit />} />
          </Route>

          <Route path="*" element={<ErrorComponent />} />
        </Routes>
        <UnsavedChangesNotifier />
        <DocumentTitleHandler />
      </Refine>
    </BrowserRouter>
  );
};

export default App;
