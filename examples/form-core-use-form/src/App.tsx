import { GitHubBanner, Refine, ErrorComponent } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route } from "react-router";

import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <Refine
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        routerProvider={routerProvider}
        resources={[
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
            clone: "/posts/clone/:id",
            edit: "/posts/edit/:id",
            show: "/posts/show/:id",
          },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      >
        <Routes>
          <Route index element={<NavigateToResource resource="posts" />} />

          <Route path="/posts">
            <Route index element={<PostList />} />
            <Route path="create" element={<PostCreate />} />
            <Route path="clone/:id" element={<PostCreate />} />
            <Route path="edit/:id" element={<PostEdit />} />
            <Route path="show/:id" element={<PostShow />} />
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
