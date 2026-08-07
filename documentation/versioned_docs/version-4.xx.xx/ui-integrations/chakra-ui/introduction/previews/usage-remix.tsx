import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function UsageRemix() {
  return (
    <Sandpack
      showNavigator
      hidePreview
      showFiles
      dependencies={{
        "@refinedev/chakra-ui": "^2.26.17",
        "@tabler/icons-react": "^3.1.0",
        "@refinedev/core": "^4.45.1",
        "@refinedev/react-router": "latest",
        "@refinedev/simple-rest": "^4.5.4",
        "@refinedev/react-table": "^5.6.4",
        "@tanstack/react-table": "^8.2.6",
        "@refinedev/react-hook-form": "^4.8.12",
        "@chakra-ui/react": "^2.5.1",
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

import { notificationProvider, RefineThemes } from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";

import authProvider from "./auth-provider";

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ChakraProvider theme={RefineThemes.Blue}>
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
        </ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
`.trim();

const ProtectedTsxCode = /* jsx */ `
import { ThemedLayoutV2 } from "@refinedev/chakra-ui";
import { Outlet } from "@remix-run/react";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";

import authProvider from "../auth-provider";

export default function AuthenticatedLayout() {
    // \`<ThemedLayoutV2>\` is only applied to the authenticated users
    return (
        <ThemedLayoutV2>
            <Outlet />
        </ThemedLayoutV2>
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
import { AuthPage } from "@refinedev/chakra-ui";

export default function LoginPage() {
  return <AuthPage type="login" />;
}

`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { GetManyResponse, useMany } from "@refinedev/core";
import {
    List,
    ShowButton,
    EditButton,
    DeleteButton,
    DateField,
} from "@refinedev/chakra-ui";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Text,
} from "@chakra-ui/react";

import { Pagination } from "~/components/pagination";

export default function ProductList() {
    const columns = React.useMemo(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "name",
                header: "Name",
                accessorKey: "name",
                meta: {
                    filterOperator: "contains",
                },
            },
            {
                id: "price",
                header: "Price",
                accessorKey: "price",
            },
            {
                id: "actions",
                header: "Actions",
                accessorKey: "id",
                enableColumnFilter: false,
                enableSorting: false,
                cell: function render({ getValue }) {
                    return (
                        <HStack>
                            <ShowButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                            <EditButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                            <DeleteButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                        </HStack>
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQuery: { data: tableData },
        },
    } = useTable({
        columns,
        refineCoreProps: {
            initialSorter: [
                {
                    field: "id",
                    order: "desc",
                },
            ],
        },
    });

    return (
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        <Text>
                                            {flexRender(
                                                header.column.columnDef
                                                    .header,
                                                header.getContext(),
                                            )}
                                        </Text>
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Pagination
                current={current}
                pageCount={pageCount}
                setCurrent={setCurrent}
            />
        </List>
    );
};
`.trim();

const ShowTsxCode = /* jsx */ `
import { useShow } from "@refinedev/core";
import { Show, TextField, NumberField, MarkdownField } from "@refinedev/chakra-ui";

import { Heading } from "@chakra-ui/react";

export default function ProductShow() {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
          <Heading as="h5" size="sm">
              Id
          </Heading>
          <TextField value={record?.id} />

          <Heading as="h5" size="sm" mt={4}>
              Name
          </Heading>
          <TextField value={record?.name} />

          <Heading as="h5" size="sm" mt={4}>
              Material
          </Heading>
          <TextField value={record?.material} />

          <Heading as="h5" size="sm" mt={4}>
              Description
          </Heading>
          <MarkdownField value={record?.description} />

          <Heading as="h5" size="sm" mt={4}>
              Price
          </Heading>
          <NumberField value={record?.price}  options={{ style: "currency", currency: "USD" }} />
      </Show>
  );
};
`.trim();

const EditTsxCode = /* jsx */ `
import { Edit } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Textarea,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export default function ProductEdit() {
  const {
    refineCore: { formLoading, queryResult, autoSaveProps },
    saveButtonProps,
    register,
    formState: { errors },
    setValue,
} = useForm({
    refineCoreProps: {
        autoSave: {
            enabled: true,
        },
    },
});

return (
    <Edit
        isLoading={formLoading}
        saveButtonProps={saveButtonProps}
        autoSaveProps={autoSaveProps}
    >
          <FormControl mb="3" isInvalid={!!errors?.name}>
              <FormLabel>Name</FormLabel>
              <Input
                  id="name"
                  type="text"
                  {...register("name", { required: "Name is required" })}
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
                  {...register("material", { required: "Material is required" })}
              />
              <FormErrorMessage>
                  {\`$\{errors.material?.message}\`}
              </FormErrorMessage>
          </FormControl>
          <FormControl mb="3" isInvalid={!!errors?.description}>
              <FormLabel>Description</FormLabel>
              <Textarea
                  id="description"
                  {...register("description", {
                      required: "Description is required",
                  })}
              />
              <FormErrorMessage>
                  {\`$\{errors.description?.message}\`}
              </FormErrorMessage>
          </FormControl>
          <FormControl mb="3" isInvalid={!!errors?.price}>
              <FormLabel>Price</FormLabel>
              <Input
                  id="price"
                  type="number"
                  {...register("price", { required: "Price is required" })}
              />
              <FormErrorMessage>
                  {\`$\{errors.price?.message}\`}
              </FormErrorMessage>
          </FormControl>
      </Edit>
  );
};
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

export default function ProductCreate() {
  const {
      refineCore: { formLoading },
      saveButtonProps,
      register,
      formState: { errors },
  } = useForm<IPost>();

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
        <FormControl mb="3" isInvalid={!!errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input
                id="name"
                type="text"
                {...register("name", { required: "Name is required" })}
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
                {...register("material", { required: "Material is required" })}
            />
            <FormErrorMessage>
                {\`$\{errors.material?.message}\`}
            </FormErrorMessage>
        </FormControl>
        <FormControl mb="3" isInvalid={!!errors?.description}>
            <FormLabel>Description</FormLabel>
            <Textarea
                id="description"
                {...register("description", {
                    required: "Description is required",
                })}
            />
            <FormErrorMessage>
                {\`$\{errors.description?.message}\`}
            </FormErrorMessage>
        </FormControl>
        <FormControl mb="3" isInvalid={!!errors?.price}>
            <FormLabel>Price</FormLabel>
            <Input
                id="price"
                type="number"
                {...register("price", { required: "Price is required" })}
            />
            <FormErrorMessage>
                {\`$\{errors.price?.message}\`}
            </FormErrorMessage>
        </FormControl>
    </Create>
  );
};
`.trim();
