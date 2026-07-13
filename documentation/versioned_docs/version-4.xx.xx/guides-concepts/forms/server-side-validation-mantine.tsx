import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function ServerSideValidationMantine() {
  return (
    <Sandpack
      height={460}
      showOpenInCodeSandbox={false}
      dependencies={{
        "@refinedev/mantine": "^2.28.21",
        "@refinedev/core": "^4.45.1",
        "@refinedev/react-router": "^latest",
        "@refinedev/simple-rest": "^4.5.4",
        "@refinedev/react-table": "^5.6.4",
        "@tanstack/react-table": "^8.2.6",
        "@tabler/icons-react": "^3.1.0",
        "@emotion/react": "^11.8.2",
        "@mantine/core": "^5.10.4",
        "@mantine/hooks": "^5.10.4",
        "@mantine/form": "^5.10.4",
        "@mantine/notifications": "^5.10.4",
        "react-router": "^7.0.2",
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
import {
    ErrorComponent,
    ThemedLayoutV2,
    RefineThemes,
    useNotificationProvider,
    AuthPage
} from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";
import routerProvider, {
    NavigateToResource,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";

import dataProvider from "./data-provider";

import { ProductCreate } from "./create";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <MantineProvider
                theme={RefineThemes.Blue}
                withNormalizeCSS
                withGlobalStyles
            >
                <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
                <NotificationsProvider position="top-right">
                    <Refine
                        notificationProvider={useNotificationProvider}
                        routerProvider={routerProvider}
                        dataProvider={dataProvider}
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
                </NotificationsProvider>
            </MantineProvider>
        </BrowserRouter>
    );
};

export default App;
`.trim();

const CreateTsxCode = /* jsx */ `
import { Create, useForm } from "@refinedev/mantine";
import { TextInput, Textarea, NumberInput } from "@mantine/core";

export const ProductCreate = () => {
  const {
      saveButtonProps,
      getInputProps,
      errors,
  } = useForm({
        initialValues: {
          name: "",
          material: "",
        },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          id="name"
          label="Name"
          placeholder="Name"
          {...getInputProps("name")}
        />
        <TextInput
          mt={8}
          id="material"
          label="Material"
          placeholder="Material"
          {...getInputProps("material")}
        />
        <Textarea
          mt={8}
          id="description"
          label="Description"
          placeholder="Description"
          {...getInputProps("description")}
        />
      </form>
    </Create>
  );
};
`.trim();
