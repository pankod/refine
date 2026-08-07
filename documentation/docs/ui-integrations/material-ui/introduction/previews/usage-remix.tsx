import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function UsageRemix() {
  return (
    <Sandpack
      showNavigator
      hidePreview
      showFiles
      dependencies={{
        "@refinedev/mui": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-hook-form": "latest",
        "@emotion/react": "^11.8.2",
        "@emotion/styled": "^11.8.1",
        "@mui/utils": "^7.1.0",
        "@mui/lab": "^6.0.0-beta.14",
        "@mui/material": "^6.1.7",
        "@mui/system": "^6.4.11",
        "@mui/x-data-grid": "7.23.5",
        "react-hook-form": "^7.57.0",
        "@refinedev/remix-router": "latest",
      }}
      startRoute="/products"
      files={{
        "/app/root.tsx": {
          code: RootTsxCode,
          active: true,
        },
        "/app/routes/_protected.tsx": {
          code: ProtectedTsxCode,
        },
        "/app/routes/_protected.products._index.tsx": {
          code: ListTsxCode,
        },
        "/app/routes/_protected.products.$id.tsx": {
          code: ShowTsxCode,
        },
        "/app/routes/_protected.products.$id.edit.tsx": {
          code: EditTsxCode,
        },
        "/app/routes/_protected.products.create.tsx": {
          code: CreateTsxCode,
        },
        "/app/routes/_auth.tsx": {
          code: AuthTsxCode,
        },
        "/app/routes/_auth.login.tsx": {
          code: LoginTsxCode,
        },
        "/app/auth-provider.tsx": {
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

import { notificationProvider, RefineThemes, RefineSnackbarProvider } from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

import authProvider from "./auth-provider";

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
              authProvider={authProvider}
              notificationProvider={notificationProvider}
              resources={[
                {
                  name: "products",
                  list: "/products",
                  show: "/products/:id",
                  edit: "/products/:id/edit",
                  create: "/products/create",
                },
              ]}
              options={{ syncWithLocation: true }}
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
import { ThemedLayout } from "@refinedev/mui";
import { Outlet } from "@remix-run/react";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";

import authProvider from "../auth-provider";

export default function AuthenticatedLayout() {
    // \`<ThemedLayout>\` is only applied to the authenticated users
    return (
        <ThemedLayout>
            <Outlet />
        </ThemedLayout>
    );
}

/**
 * We're checking if the current session is authenticated.
 * If not, we're redirecting the user to the login page.
 * This is applied for all routes that are nested under this layout (_protected).
 */
export async function loader({ request }: LoaderFunctionArgs) {
    const { authenticated, redirectTo } = await authProvider.check(request);

    if (!authenticated) {
        throw redirect(redirectTo ?? "/login");
    }

    return {};
}
`.trim();

const AuthTsxCode = /* jsx */ `
import { Outlet } from "@remix-run/react";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";

import { authProvider } from "~/authProvider";

export default function AuthLayout() {
    // no layout is applied for the auth routes
    return <Outlet />;
}

/**
 * If the current session is authenticated, we're redirecting the user to the home page.
 * Alternatively, we could also use the \`Authenticated\` component inside the \`AuthLayout\` to handle the redirect.
 * But, server-side redirects are more performant.
 */
export async function loader({ request }: LoaderFunctionArgs) {
    const { authenticated, redirectTo } = await authProvider.check(request);

    if (authenticated) {
        throw redirect(redirectTo ?? "/");
    }

    return {};
}
`.trim();

const LoginTsxCode = /* jsx */ `
import { AuthPage } from "@refinedev/mui";

export default function LoginPage() {
  return <AuthPage type="login" />;
}

`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { EditButton, List, ShowButton, useDataGrid } from "@refinedev/mui";
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

export default function ProductShow() {
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

export default function ProductEdit() {
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

export default function ProductCreate() {
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
