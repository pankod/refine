import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function UsageNextjs() {
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
import { AuthPage } from "@refinedev/mantine";
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

import { RefineThemes, ThemedLayoutV2, useNotificationProvider } from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";

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
          <ThemedLayoutV2>
              <Component {...pageProps} />
          </ThemedLayoutV2>
      );
  }

  return (
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
          notificationProvider={useNotificationProvider}
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
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { List, ShowButton, EditButton, DeleteButton } from "@refinedev/mantine";

import { Box, Group, ScrollArea, Select, Table, Pagination } from "@mantine/core";

import authProvider from "../../src/auth-provider";

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
import { useShow } from "@refinedev/core";
import { Show, TextField, NumberField, MarkdownField } from "@refinedev/mantine";

import { Title } from "@mantine/core";

import authProvider from "../../src/auth-provider";

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
import { Edit, useForm } from "@refinedev/mantine";
import { TextInput, NumberInput } from "@mantine/core";

import authProvider from "../../../src/auth-provider";

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
import { Create, useForm } from "@refinedev/mantine";
import { TextInput, NumberInput } from "@mantine/core";

import authProvider from "../../src/auth-provider";

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
