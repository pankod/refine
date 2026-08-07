import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function LayoutRemix() {
  return (
    <Sandpack
      showNavigator
      hidePreview
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
            notificationProvider={notificationProvider}
            resources={[
              {
                name: "products",
                list: "/products",
              },
            ]}
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
import { ThemedLayout } from "@refinedev/chakra-ui";
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
import { GetManyResponse, useMany } from "@refinedev/core";
import {
    List,
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

import { Pagination } from "../components/pagination";

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
        ],
        [],
    );

    const {
        reactTable: { getHeaderGroups, getRowModel, setOptions },
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
                currentPage={currentPage}
                pageCount={pageCount}
                setCurrentPage={setCurrentPage}
            />
        </List>
    );
};
`.trim();
