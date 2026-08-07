import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function Usage() {
  return (
    <Sandpack
      showNavigator
      layout="col"
      height={320}
      showOpenInCodeSandbox={false}
      dependencies={{
        "@refinedev/mui": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "@refinedev/react-hook-form": "latest",
        "@emotion/react": "^11.8.2",
        "@emotion/styled": "^11.8.1",
        "@mui/utils": "^7.1.0",
        "@mui/lab": "^6.0.0-beta.14",
        "@mui/material": "^6.1.7",
        "@mui/system": "^6.4.11",
        "@mui/x-data-grid": "7.23.5",
        "react-router": "^7.0.2",
        "react-hook-form": "^7.57.0",
      }}
      startRoute="/products"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          hidden: true,
        },
        "/theme-provider.tsx": {
          code: ThemeProviderTsxCode,
          active: true,
        },
        "/pages/products/index.tsx": {
          code: ProductsTsxCode,
          hidden: true,
        },
        "/pages/products/list.tsx": {
          code: ListTsxCode,
          hidden: true,
        },
        "/pages/products/show.tsx": {
          code: ShowTsxCode,
          hidden: true,
        },
        "/pages/products/edit.tsx": {
          code: EditTsxCode,
          hidden: true,
        },
        "/pages/products/create.tsx": {
          code: CreateTsxCode,
          hidden: true,
        },
        "/auth-provider.tsx": {
          code: AuthProviderTsxCode,
          hidden: true,
        },
      }}
    />
  );
}

const AuthProviderTsxCode = /* jsx */ `
const authProvider = {
    login: async ({ username, password }) => {
      (window as any).authenticated = true;
      return { success: true };
    },
    check: async () => {
      // auto login at first time
      if (typeof (window as any).authenticated === "undefined") {
        (window as any).authenticated = true;
      }
      return { authenticated: Boolean((window as any).authenticated) };
    },
    logout: async () => {
      (window as any).authenticated = false;
      return { success: true };
    },
    register: async () => {
      return { success: true };
    },
    forgotPassword: async () => {
      return { success: true };
    },
    resetPassword: async () => {
      return { success: true };
    },
    getIdentity: async () => ({ id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/300"})
};

export default authProvider;
`.trim();

const ProductsTsxCode = /* jsx */ `
export * from "./list";
export * from "./show";
export * from "./edit";
export * from "./create";
`.trim();

const ThemeProviderTsxCode = /* jsx */ `
import { RefineThemes, RefineSnackbarProvider } from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

export const ThemeProvider = ({ children }) => (
    // Available themes: Blue, Purple, Magenta, Red, Orange, Yellow, Green
    // Change the line below to change the theme
    <MuiThemeProvider theme={RefineThemes.Magenta}>
        <CssBaseline />
        <GlobalStyles
            styles={{ html: { WebkitFontSmoothing: "auto" } }}
        />
        <RefineSnackbarProvider>
            {children}
        </RefineSnackbarProvider>
    </MuiThemeProvider>
);
`.trim();

const AppTsxCode = /* jsx */ `
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router";

import {
  ThemedLayout,
  ErrorComponent,
  notificationProvider,
  AuthPage,
} from "@refinedev/mui";

import { ThemeProvider } from "./theme-provider";
import authProvider from "./auth-provider";

import { ProductList, ProductShow, ProductEdit, ProductCreate } from "./pages/products";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(
                    "https://api.fake-rest.refine.dev",
                )}
                notificationProvider={notificationProvider}
                authProvider={authProvider}
                resources={[
                    {
                        name: "products",
                        list: "/products",
                        show: "/products/:id",
                        edit: "/products/:id/edit",
                        create: "/products/create",
                        meta: {
                            canDelete: true,
                        },
                    },
                ]}
                options={{
                    syncWithLocation: true,
                }}
            >
                <Routes>
                  <Route element={<Authenticated fallback={<Navigate to="/login" />}><Outlet /></Authenticated>}>
                    <Route
                        element={
                            <ThemedLayout>
                                <Outlet />
                            </ThemedLayout>
                        }
                    >
                        <Route index element={<NavigateToResource resource="products" />} />
                        <Route path="/products" element={<Outlet />}>
                          <Route index element={<ProductList />} />
                          <Route path="create" element={<ProductCreate />} />
                          <Route path=":id" element={<ProductShow />} />
                          <Route path=":id/edit" element={<ProductEdit />} />
                        </Route>
                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                  </Route>
                  <Route element={<Authenticated fallback={<Outlet />}><NavigateToResource resource="products" /></Authenticated>}>
                    <Route
                      path="/login"
                      element={(
                        <AuthPage
                          type="login"
                          formProps={{
                            defaultValues: {
                              email: "demo@refine.dev",
                              password: "demodemo",
                            },
                          }}
                        />
                      )}
                    />
                    <Route path="/register" element={<AuthPage type="register" />} />
                    <Route path="/forgot-password" element={<AuthPage type="forgotPassword" />} />
                    <Route path="/reset-password" element={<AuthPage type="resetPassword" />} />
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                </Routes>
            </Refine>
      </ThemeProvider>
    </BrowserRouter>
  );
};
`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { EditButton, List, ShowButton, useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const ProductList = () => {
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
        {
          field: "actions",
          headerName: "Actions",
          display: "flex",
          renderCell: function render({ row }) {
              return (
                  <div>
                      <EditButton hideText recordItemId={row.id} />
                      <ShowButton hideText recordItemId={row.id} />
                  </div>
              );
          },
          align: "center",
          headerAlign: "center",
          minWidth: 80,
        },
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

const ShowTsxCode = /* jsx */ `
import {
  Show,
  NumberField,
  TextFieldComponent as TextField,
  MarkdownField,
  DateField,
} from "@refinedev/mui";
import { useShow } from "@refinedev/core";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export const ProductShow = () => {
  const { result: product, query } = useShow();
  const { data, isLoading } = query;

    return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
            Id
        </Typography>
        <NumberField value={product?.id ?? ""} />
        <Typography variant="body1" fontWeight="bold">
            Name
        </Typography>
        <TextField value={product?.name} />
        <Typography variant="body1" fontWeight="bold">
            Material
        </Typography>
        <TextField value={product?.material} />
        <Typography variant="body1" fontWeight="bold">
            Description
        </Typography>
        <MarkdownField value={product?.description} />
        <Typography variant="body1" fontWeight="bold">
            Price
        </Typography>
        <TextField value={product?.price} />
      </Stack>
    </Show>
  );
};
`.trim();

const EditTsxCode = /* jsx */ `
import { HttpError } from "@refinedev/core";
import { Edit, useAutocomplete } from "@refinedev/mui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "@refinedev/react-hook-form";

import { Controller } from "react-hook-form";

export const ProductEdit = () => {
  const {
    saveButtonProps,
    refineCore: { query, autoSaveProps },
    register,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column" }}
      autoComplete="off"
      >
        <TextField
            id="name"
            {...register("name", {
                required: "This field is required",
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
            fullWidth
            label="Name"
            name="name"
            autoFocus
        />
        <TextField
            id="material"
            {...register("material", {
                required: "This field is required",
            })}
            error={!!errors.material}
            helperText={errors.material?.message}
            margin="normal"
            fullWidth
            label="Material"
            name="material"
            autoFocus
        />
        <TextField
          id="description"
          {...register("description", {
              required: "This field is required",
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
          margin="normal"
          label="Description"
          multiline
          rows={4}
        />
        <TextField
            id="price"
            {...register("price", {
                required: "This field is required",
            })}
            error={!!errors.price}
            helperText={errors.price?.message}
            margin="normal"
            fullWidth
            label="Price"
            name="price"
            autoFocus
        />
      </Box>
  </Edit>
  );
};
`.trim();

const CreateTsxCode = /* jsx */ `
import { HttpError } from "@refinedev/core";
import { Create, useAutocomplete } from "@refinedev/mui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "@refinedev/react-hook-form";

import { Controller } from "react-hook-form";

export const ProductCreate = () => {
  const {
    saveButtonProps,
    refineCore: { query, autoSaveProps },
    register,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column" }}
      autoComplete="off"
      >
        <TextField
            id="name"
            {...register("name", {
                required: "This field is required",
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
            fullWidth
            label="Name"
            name="name"
            autoFocus
        />
        <TextField
            id="material"
            {...register("material", {
                required: "This field is required",
            })}
            error={!!errors.material}
            helperText={errors.material?.message}
            margin="normal"
            fullWidth
            label="Material"
            name="material"
            autoFocus
        />
        <TextField
          id="description"
          {...register("description", {
              required: "This field is required",
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
          margin="normal"
          label="Description"
          multiline
          rows={4}
        />
        <TextField
            id="price"
            {...register("price", {
                required: "This field is required",
            })}
            error={!!errors.price}
            helperText={errors.price?.message}
            margin="normal"
            fullWidth
            label="Price"
            name="price"
            autoFocus
        />
      </Box>
  </Create>
  );
};
`.trim();
