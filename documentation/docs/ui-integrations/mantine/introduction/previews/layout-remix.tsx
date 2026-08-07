import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function LayoutRemix() {
  return (
    <Sandpack
      showNavigator
      hidePreview
      dependencies={{
        "@refinedev/mantine": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-table": "latest",
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
        },
        "/app/routes/_layout.tsx": {
          code: ProtectedTsxCode,
          active: true,
        },
        "/app/routes/_layout.products._index.tsx": {
          code: ListTsxCode,
          hidden: true,
        },
      }}
    />
  );
}

const RootTsxCode = /* jsx */ `
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

import { RefineThemes, ThemedLayout, useNotificationProvider } from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";

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
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "products",
                  list: "/products",
                },
              ]}
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
import { ThemedLayout } from "@refinedev/mantine";
import { Outlet } from "@remix-run/react";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";

/**
 * Routes starting with \`_layout\` will have their children rendered inside the layout.
 */
export default function Layout() {
    return (
        <ThemedLayout>
            <Outlet />
        </ThemedLayout>
    );
}
`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { List } from "@refinedev/mantine";

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
      ],
      [],
  );

  const {
      getHeaderGroups,
      getRowModel,
      setOptions,
      refineCore: {
          setCurrentPage,
          pageCount,
          currentPage,
          tableQuery: { data: tableData },
      },
  } = useTable({
      columns,
      refineCoreProps: {
          sorters: {
            initial: [
                {
                    field: "id",
                    order: "desc",
                },
            ],
          },
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
                  page={currentPage}
                  onChange={setCurrentPage}
              />
          </List>
      </ScrollArea>
  );
};
`.trim();
