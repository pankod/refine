import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function UsageRemix() {
  return (
    <Sandpack
      showNavigator
      hidePreview
      showFiles
      dependencies={{
        "@refinedev/mantine": "^2.28.21",
        "@refinedev/core": "^4.45.1",
        "@refinedev/simple-rest": "^4.5.4",
        "@refinedev/react-table": "^5.6.4",
        "@tanstack/react-table": "^8.2.6",
        "@tabler/icons-react": "^3.1.0",
        "@emotion/react": "^11.8.2",
        "@mantine/core": "^5.10.4",
        "@mantine/hooks": "^5.10.4",
        "@mantine/form": "^5.10.4",
        "@mantine/notifications": "^5.10.4",
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

import { RefineThemes, ThemedLayoutV2, useNotificationProvider } from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";

import authProvider from "./auth-provider";

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MantineProvider
            theme={RefineThemes.Blue}
            withNormalizeCSS
            withGlobalStyles
        >
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                    authProvider={authProvider}
                    notificationProvider={useNotificationProvider}
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
            </NotificationsProvider>
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
`.trim();

const ProtectedTsxCode = /* jsx */ `
import { ThemedLayoutV2 } from "@refinedev/mantine";
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
import { AuthPage } from "@refinedev/mantine";

export default function LoginPage() {
  return <AuthPage type="login" />;
}

`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { List, ShowButton, EditButton, DeleteButton } from "@refinedev/mantine";

import { Box, Group, ScrollArea, Select, Table, Pagination } from "@mantine/core";

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
            id: "material",
            header: "Material",
            accessorKey: "material",
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
                      <Group spacing="xs" noWrap>
                          <ShowButton
                              hideText
                              recordItemId={getValue() as number}
                          />
                          <EditButton
                              hideText
                              recordItemId={getValue() as number}
                          />
                          <DeleteButton
                              hideText
                              recordItemId={getValue() as number}
                          />
                      </Group>
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
      <ScrollArea>
          <List>
              <Table highlightOnHover>
                  <thead>
                      {getHeaderGroups().map((headerGroup) => (
                          <tr key={headerGroup.id}>
                              {headerGroup.headers.map((header) => (
                                  <th key={header.id}>
                                      {flexRender(
                                          header.column.columnDef
                                              .header,
                                          header.getContext(),
                                      )}
                                  </th>
                              ))}
                          </tr>
                      ))}
                  </thead>
                  <tbody>
                      {getRowModel().rows.map((row) => (
                          <tr key={row.id}>
                              {row.getVisibleCells().map((cell) => (
                                  <td key={cell.id}>
                                      {flexRender(
                                          cell.column.columnDef.cell,
                                          cell.getContext(),
                                      )}
                                  </td>
                              ))}
                          </tr>
                      ))}
                  </tbody>
              </Table>
              <br />
              <Pagination
                  position="right"
                  total={pageCount}
                  page={current}
                  onChange={setCurrent}
              />
          </List>
      </ScrollArea>
  );
};
`.trim();

const ShowTsxCode = /* jsx */ `
import { useShow } from "@refinedev/core";
import { Show, TextField, NumberField, MarkdownField } from "@refinedev/mantine";

import { Title } from "@mantine/core";

export default function ProductShow() {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
          <Title order={5}>Id</Title>
          <TextField value={record?.id} />

          <Title mt="xs" order={5}>Name</Title>
          <TextField value={record?.name} />

          <Title mt="xs" order={5}>Material</Title>
          <TextField value={record?.material} />

          <Title mt="xs" order={5}>Description</Title>
          <MarkdownField value={record?.description} />

          <Title mt="xs" order={5}>Price</Title>
          <NumberField value={record?.price}  options={{ style: "currency", currency: "USD" }} />
      </Show>
  );
};
`.trim();

const EditTsxCode = /* jsx */ `
import { Edit, useForm } from "@refinedev/mantine";
import { TextInput, NumberInput } from "@mantine/core";

export default function ProductEdit() {
  const {
      saveButtonProps,
      getInputProps,
      errors,
      refineCore: { queryResult, autoSaveProps },
  } = useForm({
        initialValues: {
          name: "",
          material: "",
          price: 0,
        },
        refineCoreProps: {
            autoSave: {
                enabled: true,
            },
        },
  });

  return (
    <Edit saveButtonProps={saveButtonProps} autoSaveProps={autoSaveProps}>
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
        <NumberInput
          mt={8}
          id="price"
          label="Price"
          placeholder="Price"
          {...getInputProps("price")}
        />
      </form>
    </Edit>
  );
};
`.trim();

const CreateTsxCode = /* jsx */ `
import { Create, useForm } from "@refinedev/mantine";
import { TextInput, NumberInput } from "@mantine/core";

export default function ProductCreate() {
  const {
      saveButtonProps,
      getInputProps,
      errors,
  } = useForm({
        initialValues: {
          name: "",
          material: "",
          price: 0,
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
        <NumberInput
          mt={8}
          id="price"
          label="Price"
          placeholder="Price"
          {...getInputProps("price")}
        />
      </form>
    </Create>
  );
};
`.trim();
