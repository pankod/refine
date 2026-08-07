import {
  GitHubBanner,
  Refine,
  type LayoutProps,
  ErrorComponent,
} from "@refinedev/core";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router";
import dataProvider from "@refinedev/simple-rest";

import { githubDataProvider } from "./github-data-provider";
import { PostList } from "./pages/posts/list";
import { CommitList } from "./pages/commits/list";

import "./App.css";

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/posts">
            Post example with Simple Rest (offset pagination)
          </Link>
        </li>
        <li>
          <Link to="/commits">
            Commits example with Github API Data Provider (cursor pagination)
          </Link>
        </li>
      </ul>

      {children}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <Refine
        routerProvider={routerProvider}
        dataProvider={{
          default: dataProvider("https://api.fake-rest.refine.dev"),
          github: githubDataProvider(),
        }}
        resources={[
          {
            name: "posts",
            list: "/posts",
          },
          {
            name: "commits",
            list: "/commits",
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
            <Route index element={<NavigateToResource resource="posts" />} />

            <Route path="/posts" element={<PostList />} />

            <Route path="/commits" element={<CommitList />} />

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
