import React from "react";
import { useSandpack } from "@codesandbox/sandpack-react";

import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";

import { finalFiles as initialFiles } from "@site/tutorial/next-steps/intro/material-ui/sandpack";
import { dependencies } from "@site/tutorial/next-steps/intro/material-ui/sandpack";
import { removeActiveFromFiles } from "@site/src/utils/remove-active-from-files";
import { TutorialCreateFileButton } from "@site/src/refine-theme/tutorial-create-file-button";

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

const ListCategoriesBase = /* tsx */ `
export const ListCategories = () => {
  return (
    <div>
      <h1>Categories</h1>
    </div>
  );
};
`.trim();

const AppWithCategories = /* tsx */ `
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import {
  RefineThemes,
  ThemedLayout,
  ThemedTitle,
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { ListCategories } from "./pages/categories/list";

import { Login } from "./pages/login";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "protected-products",
                list: "/products",
                show: "/products/:id",
                edit: "/products/:id/edit",
                create: "/products/create",
                meta: { label: "Products" },
              },
              {
                name: "categories",
                list: "/categories",
                meta: { label: "Categories" },
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
                <Route path="/categories">
                  <Route index element={<ListCategories />} />
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
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
`.trim();

const ListCategoriesWithInferencer = /* tsx */ `
import { MuiInferencer } from "@refinedev/inferencer/mui";

export const ListCategories = () => {
  return (
    <MuiInferencer
    // resource="categories" // We're omitting this prop because it's inferred from the route
    // action="list" // We're omitting this prop because it's inferred from the route
    />
  );
};
`.trim();

// actions

export const CreateListCategoriesTsx = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialCreateFileButton
      name="src/pages/categories/list.tsx"
      onClick={() => {
        sandpack.addFile("src/pages/categories/list.tsx", ListCategoriesBase);
        sandpack.setActiveFile("/src/pages/categories/list.tsx");
      }}
    />
  );
};

export const AddListCategoriesToApp = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.tsx", AppWithCategories);
        sandpack.setActiveFile("/src/App.tsx");
      }}
    />
  );
};

export const AddInferencerToListCategories = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/categories/list.tsx",
          ListCategoriesWithInferencer,
        );
        sandpack.setActiveFile("/src/pages/categories/list.tsx");
      }}
    />
  );
};

// files

export const finalFiles = {
  ...removeActiveFromFiles(initialFiles),
  "src/pages/categories/list.tsx": {
    code: ListCategoriesWithInferencer,
    active: true,
  },
  "src/App.tsx": {
    code: AppWithCategories,
  },
};
