---
title: Using Layouts
---

import { Sandpack, AddCustomTitleToLayout } from "./sandpack.tsx";

<Sandpack>

Having wrapped our app with the necessary styling components, we're now ready to add our layout into the application. Refine provides default layouts for its supported UI libraries through [`<ThemedLayout />`](/core/docs/ui-integrations/material-ui/components/themed-layout) components, delivering a two-column layout with a sidebar and a main content area.

`<ThemedLayout />` components includes an header with user information (if an `authProvider` is provided), a sidebar with navigation links based on your resource definitions, a logout button (if an `authProvider` is provided), and a main content area where your content will be rendered.

:::tip

Notice that we've removed the `<Header />` component from our app since the layout already includes the same features.

:::

## Adding a Custom Title

Layout components are a composition of smaller components and they can be customized by providing respective props. The `<ThemedLayout />` component consists of the following components:

- `<ThemedHeader />` for the header and can be customized via `Header` prop.
- `<ThemedSider />` for the sidebar and can be customized via `Sider` prop.
- `<ThemedTitle />` for the logo and the title of the app and can be customized via `Title` prop.
- There are also `Footer` and `OffLayoutArea` props for the footer and off-layout area respectively but they don't have default components for the layout.

Let's change the title of our app with using the `Title` prop of the `<ThemedLayout />` component and the `<ThemedTitle />` component.

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// highlight-next-line
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
                  {/* highlight-start */}
                  <ThemedLayout
                    Title={(props) => (
                      <ThemedTitle {...props} text="Awesome Project" />
                    )}
                  >
                    <Outlet />
                  </ThemedLayout>
                  {/* highlight-end */}
                </Authenticated>
              }
            >
              {/* ... */}
            </Route>
            {/* ... */}
          </Routes>
        </Refine>
      </ThemeProvider>
    </BrowserRouter>
  );
}
```

<AddCustomTitleToLayout />

Our app is now wrapped with a customized layout that includes a sidebar and a main content area. We've updated our app's name with a single line of code, rest of the props works in the same manner.

:::tip

Notice that our `protected-products` resource is listed in the sidebar with `"Products"` label. This is because we've provided a custom label for our resource in the `meta.label` field of our resource definition.

:::

In the next step, we'll be refactoring our action components to use forms and tables from Material UI.

</Sandpack>
