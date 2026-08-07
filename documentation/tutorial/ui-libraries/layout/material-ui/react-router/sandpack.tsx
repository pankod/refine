import React from "react";
import { useSandpack } from "@codesandbox/sandpack-react";

import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";

import {
  finalFiles as initialFiles,
  dependencies,
} from "@site/tutorial/ui-libraries/intro/material-ui/react-router/sandpack";
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

const LayoutWithCustomTitle = /* tsx */ `
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { RefineThemes, ThemedLayout, ThemedTitle } from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
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
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <Authenticated
                  key="authenticated-routes"
                  redirectOnFail="/login"
                >
                  <ThemedLayout
                    Title={(props) => (
                      <ThemedTitle {...props} text="Awesome Project" />
                    )}
                  >
                    <Outlet />
                  </ThemedLayout>
                </Authenticated>
              }
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
              element={
                <Authenticated key="auth-pages" fallback={<Outlet />}>
                  <NavigateToResource resource="protected-products" />
                </Authenticated>
              }
            >
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Refine>
      </ThemeProvider>
    </BrowserRouter>
  );
}
`.trim();

// actions

export const AddCustomTitleToLayout = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.tsx", LayoutWithCustomTitle);
        sandpack.setActiveFile("/src/App.tsx");
      }}
    />
  );
};

// files

export const finalFiles = {
  ...removeActiveFromFiles(initialFiles),
  "src/App.tsx": {
    code: LayoutWithCustomTitle,
    active: true,
  },
};
