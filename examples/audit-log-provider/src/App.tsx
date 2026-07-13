import { ErrorComponent, GitHubBanner, Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route } from "react-router";

import { PostList, PostCreate, PostEdit } from "./pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <div style={{ marginBottom: "10px" }} />
      <Refine
        auditLogProvider={{
          get: async ({ resource, meta }) => {
            const { data } = await dataProvider(API_URL).getList({
              resource: "logs",
              filters: [
                {
                  field: "resource",
                  operator: "eq",
                  value: resource,
                },
                {
                  field: "meta.id",
                  operator: "eq",
                  value: meta?.id,
                },
              ],
            });

            return data;
          },
          create: (params) => {
            return dataProvider(API_URL).create({
              resource: "logs",
              variables: params,
            });
          },
          update: async ({ id, name }) => {
            const { data } = await dataProvider(API_URL).update({
              resource: "logs",
              id,
              variables: { name },
            });
            return data;
          },
        }}
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
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
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      >
        <Routes>
          <Route>
            <Route index element={<NavigateToResource resource="posts" />} />

            <Route path="/posts">
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
