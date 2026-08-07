<div align="center" style="margin: 30px;">
    <a href="https://refine.dev">
    <img alt="refine logo" src="https://refine.ams3.cdn.digitaloceanspaces.com/readme/refine-readme-banner.png">
    </a>
</div>

<br/>

<div align="center">
    <a href="https://refine.dev">Home Page</a> |
    <a href="https://discord.gg/refine">Discord</a> |
    <a href="https://refine.dev/examples/">Examples</a> |
    <a href="https://refine.dev/blog/">Blog</a> |
    <a href="https://refine.dev/docs/">Documentation</a>

<br/>
<br/>

[![Discord](https://img.shields.io/discord/837692625737613362.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/refine)
[![Twitter Follow](https://img.shields.io/twitter/follow/refine_dev?style=social)](https://twitter.com/refine_dev)

<a href="https://www.producthunt.com/posts/refine-3?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-refine&#0045;3" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=362220&theme=light&period=daily" alt="refine - 100&#0037;&#0032;open&#0032;source&#0032;React&#0032;framework&#0032;to&#0032;build&#0032;web&#0032;apps&#0032;3x&#0032;faster | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

</div>

<br/>

<div align="center">Refine is an open-source, headless React framework for developers building enterprise internal tools, admin panels, dashboards, B2B applications.

<br/>

It eliminates repetitive tasks in CRUD operations and provides industry-standard solutions for critical project components like **authentication**, **access control**, **routing**, **networking**, **state management**, and **i18n**.

</div>

## Chakra UI integration for Refine

[Chakra UI](https://chakra-ui.com/) is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.

[Refine](https://refine.dev/) is **headless by design**, offering unlimited styling and customization options. Moreover, refine ships with ready-made integrations for [Ant Design](https://ant.design/), [Material UI](https://mui.com/material-ui/getting-started/overview/), [Mantine](https://mantine.dev/), and [Chakra UI](https://chakra-ui.com/) for convenience.

Refine has connectors for 15+ backend services, including REST API, [GraphQL](https://graphql.org/), and popular services like [Airtable](https://www.airtable.com/), [Strapi](https://strapi.io/), [Supabase](https://supabase.com/), [Firebase](https://firebase.google.com/), and [NestJS](https://nestjs.com/).

## Installation

To use Refine with Chakra UI, you need to install the following package `@refinedev/chakra-ui` along with the Chakra UI packages:

```sh
npm install @refinedev/chakra-ui @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

## ⚡ Try Refine

Start a new project with Refine in seconds using the following command:

```sh
npm create refine-app@latest my-refine-app
```

Or you can create a new project on your browser:

<a href="https://refine.dev/?playground=true" target="_blank">
  <img height="48" width="245" src="https://refine.ams3.cdn.digitaloceanspaces.com/assets/try-it-in-your-browser.png" />
</a>

## Quick Start

Here's Refine in action, the below code is an example of a simple CRUD application using Refine + React Router + Chakra UI:

```tsx
import React from "react";
import { Refine } from "@refinedev/core";
import {
  ErrorComponent,
  ThemedLayoutV2,
  RefineThemes,
  useNotificationProvider,
} from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

import { ProductList } from "./pages/products/list";

export default function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          notificationProvider={useNotificationProvider()}
          resources={[
            {
              name: "products",
              list: "/products",
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route
              element={
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              <Route path="/products">
                <Route index element={<ProductList />} />
              </Route>

              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </ChakraProvider>
    </BrowserRouter>
  );
}

// src/pages/products/list.tsx

import React from "react";
import { type GetManyResponse, useMany } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { List } from "@refinedev/chakra-ui";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
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

export const ProductList = () => {
  const columns = React.useMemo<ColumnDef<IPost>[]>(
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
      },
      {
        id: "category",
        header: "Category",
        accessorKey: "category",
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as TableMeta;
          const loading = meta.loading;
          const categoriesData = meta.categoriesData;
          const category = categoriesData?.data.find(
            (item) => item?.id === getValue<IPost["category"]>()?.id,
          );

          if (loading) {
            return "Loading...";
          }

          return category?.title ?? "-";
        },
      },
    ],
    [],
  );

  const {
    reactTable: { getHeaderGroups, getRowModel, setOptions },
    refineCore: {
      tableQuery: { data: tableData, isLoading: tableIsLoading },
    },
  } = useTable({
    columns,
    meta: {
      categoriesData: [],
      loading: true,
    },
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

  const categoryIds = tableData?.data?.map((item) => item.category?.id) ?? [];
  const { data: categoriesData, isLoading: categoriesIsLoading } =
    useMany<ICategory>({
      resource: "categories",
      ids: categoryIds,
      queryOptions: {
        enabled: categoryIds.length > 0,
      },
    });

  const loading = tableIsLoading || categoriesIsLoading;

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      loading,
      categoriesData,
    },
  }));

  return (
    <List>
      <TableContainer whiteSpace="pre-line">
        <Table variant="simple">
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {!header.isPlaceholder && (
                      <HStack spacing="2">
                        <Text>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </Text>
                      </HStack>
                    )}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </List>
  );
};

type TableMeta = {
  loading: boolean;
  categoriesData: GetManyResponse<ICategory>;
};

type ICategory = {
  id: number;
  title: string;
};

type IPost = {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
};
```

The result will look like this:

[![Refine + Chakra UI Example](https://refine.ams3.cdn.digitaloceanspaces.com/assets/refine-chakra-ui-example-screenshot.png)](https://github.com/refinedev/refine/tree/master/examples/base-chakra-ui)

## Documentation

- For more detailed information and usage, refer to the [Refine Chakra UI documentation](https://refine.dev/docs/ui-integrations/chakra-ui/introduction).
- [Refer to documentation for more info about refine](https://refine.dev/docs).
- [Step up to refine tutorials](https://refine.dev/tutorial).
