import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function LayoutReactRouterDom() {
  return (
    <Sandpack
      showNavigator
      // hidePreview
      //   showFiles
      initialPercentage={35}
      dependencies={{
        "@refinedev/mantine": "^2.28.21",
        "@refinedev/core": "^4.45.1",
        "@refinedev/react-router": "latest",
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
      startRoute="/products"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          active: true,
        },
        "/pages/products/list.tsx": {
          code: ListTsxCode,
          hidden: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* jsx */ `
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Route, Routes, Outlet } from "react-router";

import {
    ErrorComponent,
    ThemedLayoutV2,
    RefineThemes,
    useNotificationProvider,
    AuthPage
} from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";

import { ProductList } from "./pages/products/list";

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
                    notificationProvider={useNotificationProvider}
                    resources={[
                        {
                            name: "products",
                            list: "/products",
                        }
                    ]}
                >
                    <Routes>
                        <Route
                            // The layout will wrap all the pages inside this route
                            element={
                            <ThemedLayoutV2>
                                <Outlet />
                            </ThemedLayoutV2>
                            }
                        >
                            <Route path="/products" element={<ProductList />} />
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                </Refine>
            </NotificationsProvider>
        </MantineProvider>
    </BrowserRouter>
  );
};
`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { List } from "@refinedev/mantine";

import { Box, Group, ScrollArea, Table, Pagination } from "@mantine/core";

export const ProductList = () => {
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
