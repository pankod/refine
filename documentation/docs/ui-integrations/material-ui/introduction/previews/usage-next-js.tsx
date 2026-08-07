import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function UsageNextjs() {
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
        },
        "/pages/products/[id].tsx": {
          code: ShowTsxCode,
        },
        "/pages/products/[id]/edit.tsx": {
          code: EditTsxCode,
        },
        "/pages/products/create.tsx": {
          code: CreateTsxCode,
        },
        "/pages/login.tsx": {
          code: LoginTsxCode,
        },
        "/src/auth-provider.tsx": {
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

const LoginTsxCode = /* jsx */ `
import React from "react";
import { AuthPage } from "@refinedev/mui";
import authProvider from "../src/auth-provider";

import type { ExtendedNextPage } from "./_app";

const Login: ExtendedNextPage = () => {
  return <AuthPage type="login" />;
};

Login.noLayout = true;

export default Login;

/**
 * Same check can also be done via \`<Authenticated />\` component.
 * But we're using a server-side check for a better UX.
 */
export const getServerSideProps = async () => {
  const { authenticated } = await authProvider.check();

  if (authenticated) {
    return {
      redirect: {
        destination: "/products",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
`.trim();

const AppTsxCode = /* jsx */ `
import React from "react";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/pages";
import dataProvider from "@refinedev/simple-rest";
import type { AppProps } from "next/app";

import { RefineThemes, ThemedLayout, notificationProvider, RefineSnackbarProvider } from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

import authProvider from "../src/auth-provider";

export type ExtendedNextPage = NextPage & {
  noLayout?: boolean;
};

type ExtendedAppProps = AppProps & {
  Component: ExtendedNextPage;
};

function App({ Component, pageProps }: ExtendedAppProps) {
  const renderComponent = () => {
      if (Component.noLayout) {
          return <Component {...pageProps} />;
      }

      return (
          <ThemedLayout>
              <Component {...pageProps} />
          </ThemedLayout>
      );
  }

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
          authProvider={authProvider}
          resources={[
            {
              name: "products",
              list: "/products",
              show: "/products/:id",
              edit: "/products/:id/edit",
              create: "/products/create"
            },
          ]}
          options={{ syncWithLocation: true }}
        >
          {renderComponent()}
        </Refine>
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { EditButton, List, ShowButton, useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import authProvider from "../../src/auth-provider";

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

/**
 * Same check can also be done via \`<Authenticated />\` component.
 * But we're using a server-side check for a better UX.
 */
export const getServerSideProps = async () => {
  const { authenticated } = await authProvider.check();

  if (!authenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

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

import authProvider from "../../src/auth-provider";

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

/**
 * Same check can also be done via \`<Authenticated />\` component.
 * But we're using a server-side check for a better UX.
 */
export const getServerSideProps = async () => {
  const { authenticated } = await authProvider.check();

  if (!authenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
`.trim();

const EditTsxCode = /* jsx */ `
import { HttpError } from "@refinedev/core";
import { Edit, useAutocomplete } from "@refinedev/mui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "@refinedev/react-hook-form";

import { Controller } from "react-hook-form";

import authProvider from "../../../src/auth-provider";

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

/**
 * Same check can also be done via \`<Authenticated />\` component.
 * But we're using a server-side check for a better UX.
 */
export const getServerSideProps = async () => {
  const { authenticated } = await authProvider.check();

  if (!authenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
`.trim();

const CreateTsxCode = /* jsx */ `
import { HttpError } from "@refinedev/core";
import { Create, useAutocomplete } from "@refinedev/mui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "@refinedev/react-hook-form";

import { Controller } from "react-hook-form";

import authProvider from "../../src/auth-provider";

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

/**
 * Same check can also be done via \`<Authenticated />\` component.
 * But we're using a server-side check for a better UX.
 */
export const getServerSideProps = async () => {
  const { authenticated } = await authProvider.check();

  if (!authenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
`.trim();
