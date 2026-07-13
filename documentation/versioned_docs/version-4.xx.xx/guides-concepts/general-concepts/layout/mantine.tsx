import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export function MantineLayout() {
  return (
    <Sandpack
      showNavigator
      previewOnly
      dependencies={{
        "@refinedev/mantine": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "@refinedev/inferencer": "latest",
        "@refinedev/react-table": "latest",
        "react-router": "^7.0.2",
        "@tabler/icons-react": "^3.1.0",
        "@emotion/react": "^11.8.2",
        "@mantine/core": "^5.10.4",
        "@mantine/hooks": "^5.10.4",
        "@mantine/notifications": "^5.10.4",
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

import { Global, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

import { Refine } from "@refinedev/core";
import {
  ErrorComponent,
  RefineThemes,
  ThemedLayoutV2,
} from "@refinedev/mantine";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { ProductList } from "./pages/products/list.tsx";
import { ProductShow } from "./pages/products/show.tsx";

export default function App() {
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
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route path="/my-products" element={<ProductList />} />
                <Route path="/my-products/:id" element={<ProductShow />} />
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
          </Refine>
        </NotificationsProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}
`.trim();

const ListTsxCode = `
import { Group, Pagination, ScrollArea, Table } from "@mantine/core";
import { List, ShowButton } from "@refinedev/mantine";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import React from "react";

export const ProductList = () => {
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "Id",
      },
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
      },

      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: function render({ getValue }) {
          return (
            <Group spacing="xs" noWrap>
              <ShowButton hideText recordItemId={getValue() as string} />
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
  });

  return (
    <List>
      <ScrollArea>
        <Table highlightOnHover>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </ScrollArea>
      <br />
      <Pagination
        position="right"
        total={pageCount}
        page={current}
        onChange={setCurrent}
      />
    </List>
  );
};
`.trim();

const ShowTsxCode = `
import { Title } from "@mantine/core";
import { useShow } from "@refinedev/core";
import {
  MarkdownField,
  NumberField,
  Show,
  TextField,
} from "@refinedev/mantine";

export const ProductShow = () => {
  const { query } = useShow();
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title my="xs" order={5}>
        Id
      </Title>
      <NumberField value={record?.id ?? ""} />
      <Title my="xs" order={5}>
        Name
      </Title>
      <TextField value={record?.name} />
      <Title my="xs" order={5}>
        Material
      </Title>
      <TextField value={record?.material} />
      <Title mt="xs" order={5}>
        Description
      </Title>
      <MarkdownField value={record?.description} />
      <Title my="xs" order={5}>
        Price
      </Title>
      <NumberField value={record?.price ?? ""} />
    </Show>
  );
};
`.trim();
