import { GitHubBanner, Refine, ErrorComponent } from "@refinedev/core";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route } from "react-router";
import dataProvider from "@refinedev/simple-rest";

import { DummyList } from "./pages/posts";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <Refine
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        routerProvider={routerProvider}
        resources={[{ name: "posts", list: "/posts" }]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      >
        <Routes>
          <Route>
            <Route index element={<NavigateToResource resource="posts" />} />
            <Route path="/posts" element={<DummyList />} />
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
