import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";

import { dependencies } from "../../intro/react-router/sandpack";
import { finalFiles as initialFiles } from "../../authentication/react-router/sandpack";
import { removeActiveFromFiles } from "@site/src/utils/remove-active-from-files";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  return (
    <TutorialSandpack
      showNavigator
      dependencies={dependencies}
      files={initialFiles}
      finalFiles={finalFiles}
    >
      {children}
    </TutorialSandpack>
  );
};

// updates

const AppTsxWithRoutes = /* tsx */ `
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";
import { Header } from "./components/header";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Refine
          dataProvider={dataProvider}
          authProvider={authProvider}
          routerProvider={routerProvider}
      >
        <Routes>
            <Route
                element={(
                    <Authenticated key="authenticated-routes" redirectOnFail="/login">
                        <Header />
                        <Outlet />
                    </Authenticated>
                )}
            >
                <Route
                    index
                    element={<Navigate to="/products" />}
                />
                <Route path="/products">
                    <Route index element={<ListProducts />} />
                    <Route path=":id" element={<ShowProduct />} />
                    <Route path=":id/edit" element={<EditProduct />} />
                    <Route path="create" element={<CreateProduct />} />
                </Route>
            </Route>
            <Route
                element={(
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                        <Navigate to="/products" />
                    </Authenticated>
                )}
            >
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}
`.trim();

const AppTsxWithResources = /* tsx */ `
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";
import { Header } from "./components/header";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Refine
          dataProvider={dataProvider}
          authProvider={authProvider}
          routerProvider={routerProvider}
          resources={[
            {
                name: "protected-products",
                list: "/products",
                show: "/products/:id",
                edit: "/products/:id/edit",
                create: "/products/create",
                meta: { label: "Products" },
            }
          ]}
      >
        <Routes>
            <Route
                element={(
                    <Authenticated key="authenticated-routes" redirectOnFail="/login">
                        <Header />
                        <Outlet />
                    </Authenticated>
                )}
            >
                <Route
                    index
                    element={<NavigateToResource resource="protected-products" />}
                />
                <Route path="/products">
                    <Route index element={<ListProducts />} />
                    <Route path=":id" element={<ShowProduct />} />
                    <Route path=":id/edit" element={<EditProduct />} />
                    <Route path="create" element={<CreateProduct />} />
                </Route>
            </Route>
            <Route
                element={(
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                        <NavigateToResource resource="protected-products" />
                    </Authenticated>
                )}
            >
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}
`.trim();

// actions

export const AddRoutesToApp = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.tsx", AppTsxWithRoutes);
        sandpack.setActiveFile("/src/App.tsx");
      }}
    />
  );
};

export const AddResourcesToApp = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.tsx", AppTsxWithResources);
        sandpack.setActiveFile("/src/App.tsx");
      }}
    />
  );
};

// files

export const finalFiles = {
  ...removeActiveFromFiles(initialFiles),
  "src/App.tsx": {
    code: AppTsxWithResources,
    active: true,
  },
};
