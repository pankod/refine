import React from "react";
import { ErrorComponent, GitHubBanner, Refine } from "@refinedev/core";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import dataProvider from "@refinedev/simple-rest";

import { PostList, CategoryList, UserList, EventList } from "pages";
import { Layout } from "components/Layout";

import "App.css";
import "index.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        resources={[
          { name: "posts", list: "/posts" },
          { name: "categories", list: "/categories" },
          { name: "users", list: "/users" },
          { name: "events", list: "/events" },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      >
        <Routes>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route index element={<NavigateToResource resource="posts" />} />

            <Route path="/posts" element={<PostList />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/events" element={<EventList />} />

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
