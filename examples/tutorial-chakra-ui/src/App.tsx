import { GitHubBanner, Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import {
  useNotificationProvider,
  RefineThemes,
  ErrorComponent,
  ThemedLayout,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router";

import { BlogPostList } from "./pages/blog-posts/list";
import { BlogPostCreate } from "./pages/blog-posts/create";
import { BlogPostEdit } from "./pages/blog-posts/edit";
import { BlogPostShow } from "./pages/blog-posts/show";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ChakraProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          notificationProvider={useNotificationProvider()}
          resources={[
            {
              name: "blog_posts",
              list: "/blog-posts",
              show: "/blog-posts/show/:id",
              create: "/blog-posts/create",
              edit: "/blog-posts/edit/:id",
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
          <ThemedLayout>
            <Routes>
              <Route
                index
                element={<NavigateToResource resource="blog_posts" />}
              />

              <Route path="/blog-posts">
                <Route index element={<BlogPostList />} />
                <Route path="show/:id" element={<BlogPostShow />} />
                <Route path="create" element={<BlogPostCreate />} />
                <Route path="edit/:id" element={<BlogPostEdit />} />
              </Route>

              <Route path="*" element={<ErrorComponent />} />
            </Routes>
          </ThemedLayout>
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
