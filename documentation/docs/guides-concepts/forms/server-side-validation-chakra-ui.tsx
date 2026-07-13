import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function ServerSideValidationChakraUi() {
  return (
    <Sandpack
      height={460}
      showOpenInCodeSandbox={false}
      dependencies={{
        "@refinedev/chakra-ui": "latest",
        "@tabler/icons-react": "^3.1.0",
        "@refinedev/core": "latest",
        "@refinedev/react-router": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-table": "latest",
        "@tanstack/react-table": "^8.2.6",
        "@refinedev/react-hook-form": "latest",
        "@chakra-ui/react": "^2.5.1",
        "react-dom": "^18.0.0",
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
import { Refine } from "@refinedev/core";
import {
    ErrorComponent,
    ThemedLayout,
    RefineThemes,
    useNotificationProvider,
    AuthPage
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import routerProvider, {
    NavigateToResource,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";

import dataProvider from "./data-provider";

import { ProductCreate } from "./create";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ChakraProvider theme={RefineThemes.Blue}>
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
                                <ThemedLayout>
                                    <Outlet />
                                </ThemedLayout>
                            }
                        >
                            <Route path="/products" element={<Outlet />}>
                                <Route path="create" element={<ProductCreate />} />
                            </Route>
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                </Refine>
            </ChakraProvider>
        </BrowserRouter>
    );
};

export default App;
`.trim();

const CreateTsxCode = /* jsx */ `
import { Create } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Textarea,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const ProductCreate = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm();

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <FormControl mb="3" isInvalid={!!errors?.name}>
                <FormLabel>Name</FormLabel>
                <Input
                    id="name"
                    type="text"
                    {...register("name")}
                />
                <FormErrorMessage>
                    {\`$\{errors.name?.message}\`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.material}>
                <FormLabel>Material</FormLabel>
                <Input
                    id="material"
                    type="text"
                    {...register("material")}
                />
                <FormErrorMessage>
                    {\`$\{errors.material?.message}\`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.description}>
                <FormLabel>Description</FormLabel>
                <Textarea
                    id="description"
                    {...register("description")}
                />
                <FormErrorMessage>
                    {\`$\{errors.description?.message}\`}
                </FormErrorMessage>
            </FormControl>
        </Create>
    );
};
`.trim();
