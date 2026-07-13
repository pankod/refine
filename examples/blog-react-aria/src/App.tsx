import { GitHubBanner, Refine } from "@refinedev/core";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import dataProvider from "@refinedev/simple-rest";
import { Layout } from "components/Layout";
import "index.css";
import { CategoryCreate } from "pages/category/create";
import { CategoryList } from "pages/category/list";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        resources={[
          {
            name: "categories",
            list: "/categories",
            create: "/categories/create",
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
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route
              index
              element={<NavigateToResource resource="categories" />}
            />
            <Route path="/categories">
              <Route index element={<CategoryList />} />
              <Route path="create" element={<CategoryCreate />} />
            </Route>
          </Route>
        </Routes>
        <UnsavedChangesNotifier />
        <DocumentTitleHandler />
      </Refine>
    </BrowserRouter>
  );
}

export default App;
