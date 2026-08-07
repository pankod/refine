import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function LayoutRemix() {
  return (
    <Sandpack
      showNavigator
      hidePreview
      dependencies={{
        "@refinedev/mui": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "@refinedev/react-hook-form": "^4.8.12",
        "@emotion/react": "^11.8.2",
        "@emotion/styled": "^11.8.1",
        "@mui/utils": "^7.1.0",
        "@mui/lab": "^6.0.0-beta.14",
        "@mui/material": "^6.1.7",
        "@mui/system": "^6.4.11",
        "@mui/x-data-grid": "7.23.5",
        "@refinedev/remix-router": "latest",
      }}
      startRoute="/products"
      files={{
        "/app/root.tsx": {
          code: RootTsxCode,
        },
        "/app/routes/_layout.tsx": {
          code: ProtectedTsxCode,
          active: true,
        },
        "/app/routes/_layout.products._index.tsx": {
          code: ListTsxCode,
          hidden: true,
        },
      }}
    />
  );
}

const RootTsxCode = /* jsx */ `
import React from "react";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/remix-router";
import dataProvider from "@refinedev/simple-rest";

import { notificationProvider, RefineThemes, RefineSnackbarProvider } from "@refinedev/antd";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider theme={RefineThemes.Blue}>
          <CssBaseline />
          <GlobalStyles
              styles={{ html: { WebkitFontSmoothing: "auto" } }}
          />
          <RefineSnackbarProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
              notificationProvider={notificationProvider}
              resources={[
                {
                  name: "products",
                  list: "/products",
                },
              ]}
            >
              <Outlet />
            </Refine>
          </RefineSnackbarProvider>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
`.trim();

const ProtectedTsxCode = /* jsx */ `
import { ThemedLayoutV2 } from "@refinedev/mui";
import { Outlet } from "@remix-run/react";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";

/**
 * Routes starting with \`_layout\` will have their children rendered inside the layout.
 */
export default function Layout() {
    return (
        <ThemedLayoutV2>
            <Outlet />
        </ThemedLayoutV2>
    );
}
`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { List, useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function ProductList() {
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef<IProduct>[]>(
    () => [
        {
            field: "id",
            headerName: "ID",
            type: "number",
            width: 50,
        },
        { field: "name", headerName: "Name", minWidth: 300, flex: 1 },
        { field: "price", headerName: "Price", minWidth: 100, flex: 1 },
      ],
    []
  );

  return (
    <List>
        <DataGrid {...dataGridProps} columns={columns}  />
    </List>
  );
};

interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}
`.trim();
