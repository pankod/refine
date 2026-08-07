import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function ServerSideValidationMui() {
  return (
    <Sandpack
      height={460}
      showOpenInCodeSandbox={false}
      dependencies={{
        "@refinedev/mui": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "@refinedev/react-hook-form": "^4.8.12",
        "@emotion/react": "^11.8.2",
        "@emotion/styled": "^11.8.1",
        "@mui/lab": "^6.0.0-beta.14",
        "@mui/material": "^6.1.7",
        "@mui/system": "^6.4.11",
        "@mui/utils": "^7.1.0",
        "@mui/x-data-grid": "7.23.5",
        "react-router": "^7.0.2",
        "react-hook-form": "^7.57.0",
      }}
      startRoute="/products/create"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          hidden: true,
        },
        "/data-provider.tsx": {
          code: DataProviderTsxCode,
          active: true,
        },
        "/create.tsx": {
          code: CreateTsxCode,
        },
      }}
    />
  );
}

const DataProviderTsxCode = /* jsx */ `
import type { HttpError } from "@refinedev/core";
import baseDataProvider from "@refinedev/simple-rest";

const dataProvider = {
    ...baseDataProvider("https://api.fake-rest.refine.dev"),
    create: async () => {
        // For demo purposes, we're hardcoding the error response.
        // In a real-world application, the error of the server should match the \`HttpError\` interface
        // or should be transformed to match it.
        return Promise.reject({
            message: "This is an error from the server",
            statusCode: 400,
            errors: {
                name: "Name should be at least 3 characters long",
                material: "Material should start with a capital letter",
                description: "Description should be at least 10 characters long",
            },
        } as HttpError);
    }
};

export default dataProvider;
`.trim();

const AppTsxCode = /* jsx */ `
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router";

import {
  ThemedLayoutV2,
  ErrorComponent,
  RefineThemes,
  useNotificationProvider,
  RefineSnackbarProvider,
  AuthPage,
} from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

import dataProvider from "./data-provider";

import { ProductCreate } from "./create";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles
            styles={{ html: { WebkitFontSmoothing: "auto" } }}
        />
        <RefineSnackbarProvider>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider}
                notificationProvider={useNotificationProvider}
                resources={[
                    {
                        name: "products",
                        create: "/products/create",
                    },
                ]}
                options={{ mutationMode: "pessimistic", syncWithLocation: true, redirect: { afterCreate: false } }}
            >
                <Routes>
                    <Route
                        element={
                            <ThemedLayoutV2>
                                <Outlet />
                            </ThemedLayoutV2>
                        }
                    >
                        <Route path="/products" element={<Outlet />}>
                          <Route path="create" element={<ProductCreate />} />
                        </Route>
                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                </Routes>
            </Refine>
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
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
            {...register("name")}
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
            {...register("material")}
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
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          margin="normal"
          label="Description"
          multiline
          rows={4}
        />
      </Box>
  </Create>
  );
};
`.trim();
