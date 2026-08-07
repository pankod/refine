import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function LayoutNextjs() {
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
        "@refinedev/nextjs-router": "latest",
      }}
      // template="nextjs"
      startRoute="/products"
      files={{
        "/pages/_app.tsx": {
          code: AppTsxCode,
          active: true,
        },
        "/pages/products/index.tsx": {
          code: ListTsxCode,
          hidden: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* jsx */ `
import React from "react";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/pages";
import dataProvider from "@refinedev/simple-rest";
import type { AppProps } from "next/app";

import { RefineThemes, ThemedLayoutV2, notificationProvider, RefineSnackbarProvider } from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

function App({ Component, pageProps }: AppProps) {
    return (
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
                  <ThemedLayoutV2>
                    <Component {...pageProps} />
                  </ThemedLayoutV2>
                </Refine>
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
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
