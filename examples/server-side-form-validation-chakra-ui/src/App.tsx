import { GitHubBanner, type HttpError, Refine } from "@refinedev/core";
import {
  ErrorComponent,
  ThemedLayout,
  RefineThemes,
  useNotificationProvider,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { PostList, PostCreate, PostEdit, PostShow } from "./pages";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ChakraProvider theme={RefineThemes.Blue}>
        <Refine
          notificationProvider={useNotificationProvider()}
          routerProvider={routerProvider}
          dataProvider={{
            ...dataProvider("https://api.fake-rest.refine.dev"),
            // this is demonstration of how you can handle errors from API
            update: async () => {
              const error: HttpError = {
                message: "An error occurred while updating the record.",
                statusCode: 400,
                errors: {
                  title: [
                    "Title is required.",
                    "Title should have at least 5 characters.",
                  ],
                  "category.id": ["Category is required."],
                  status: true,
                  content: {
                    key: "form.error.content",
                    message: "Content is required.",
                  },
                  "field-not-exist": ["Field not exist"],
                },
              };

              return Promise.reject(error);
            },
            create: async () => {
              // this is demonstration of how you can handle errors from API
              const error: HttpError = {
                message: "An error occurred while creating the record.",
                statusCode: 400,
                errors: {
                  title: ["Title is required."],
                  "category.id": ["Category is required."],
                  status: true,
                  content: {
                    key: "form.error.content",
                    message: "Content is required.",
                  },
                  tags: ["Tags is required."],
                },
              };
              return Promise.reject(error);
            },
          }}
          resources={[
            {
              name: "posts",
              list: "/posts",
              show: "/posts/show/:id",
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
            <Route
              element={
                <ThemedLayout>
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
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default App;
