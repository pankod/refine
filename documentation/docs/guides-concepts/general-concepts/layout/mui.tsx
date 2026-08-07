import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export function MaterialUILayout() {
  return (
    <Sandpack
      showNavigator
      previewOnly
      dependencies={{
        "@refinedev/antd": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "@refinedev/inferencer": "latest",
        "@refinedev/mui": "latest",
        "react-router": "^7.0.2",
        "@emotion/react": "^11.8.2",
        "@emotion/styled": "^11.8.1",
        "@mui/lab": "^6.0.0-beta.14",
        "@mui/material": "^6.1.7",
        "@mui/system": "^6.4.11",
        "@mui/utils": "^7.1.0",
        "@mui/x-data-grid": "7.23.5",
      }}
      startRoute="/my-products"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
        },
        "/pages/products/list.tsx": {
          code: ListTsxCode,
        },
        "/pages/products/show.tsx": {
          code: ShowTsxCode,
          active: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* tsx */ `
import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

import { Refine } from "@refinedev/core";
import { ErrorComponent, RefineThemes, ThemedLayout } from "@refinedev/mui";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { ProductList } from "./pages/products/list.tsx";
import { ProductShow } from "./pages/products/show.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          authProvider={{
            check: async () => ({ authenticated: true }),
            getIdentity: async () => ({
              id: 1,
              name: "John Doe",
              avatar: "https://i.pravatar.cc/300",
            }),
          }}
          resources={[
            {
              name: "products",
              list: "/my-products",
              show: "/my-products/:id",
            },
          ]}
          options={{ syncWithLocation: true }}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route path="/my-products" element={<ProductList />} />
              <Route path="/my-products/:id" element={<ProductShow />} />
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </ThemeProvider>
    </BrowserRouter>
  );
}
`.trim();

const ListTsxCode = `
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { List, ShowButton, useDataGrid } from "@refinedev/mui";
import React from "react";

export const ProductList = () => {
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "name",
        flex: 1,
        headerName: "Name",
        minWidth: 200,
      },
      {
        field: "material",
        flex: 1,
        headerName: "Material",
        minWidth: 200,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <>
              <ShowButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [],
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};
`.trim();

const ShowTsxCode = `
import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import {
  MarkdownField,
  NumberField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";

export const ProductShow = () => {
  const { query } = useShow();
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <NumberField value={record?.id ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Name
        </Typography>
        <TextField value={record?.name} />
        <Typography variant="body1" fontWeight="bold">
          Material
        </Typography>
        <TextField value={record?.material} />
        <Typography variant="body1" fontWeight="bold">
          Description
        </Typography>
        <MarkdownField value={record?.description} />
        <Typography variant="body1" fontWeight="bold">
          Price
        </Typography>
        <NumberField value={record?.price ?? ""} />
      </Stack>
    </Show>
  );
};
`.trim();
