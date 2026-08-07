import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function LayoutNextjs() {
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
          hidden: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* jsx */ `
import React from "react";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/pages";
import dataProvider from "@refinedev/simple-rest";
import type { AppProps } from "next/app";

import { RefineThemes, ThemedLayout, notificationProvider } from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";

function App({ Component, pageProps }: AppProps) {
    return (
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
            <ThemedLayout>
              <Component {...pageProps} />
            </ThemedLayout>
          </Refine>
        </ChakraProvider>
    );
}

export default App;
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

import { Pagination } from "../../components/pagination";

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
