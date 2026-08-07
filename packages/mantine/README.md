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

# Mantine UI integration for Refine

[Mantine](https://mantine.dev/) is a React components library focused on providing great user and developer experience.

[Refine](https://refine.dev/) is **headless by design**, offering unlimited styling and customization options. Moreover, Refine ships with ready-made integrations for [Ant Design](https://ant.design/), [Material UI](https://mui.com/material-ui/getting-started/overview/), [Mantine](https://mantine.dev/), and [Chakra UI](https://chakra-ui.com/) for convenience.

Refine has connectors for 15+ backend services, including REST API, [GraphQL](https://graphql.org/), and popular services like [Airtable](https://www.airtable.com/), [Strapi](https://strapi.io/), [Supabase](https://supabase.com/), [Firebase](https://firebase.google.com/), and [NestJS](https://nestjs.com/).

## Installation

To use Refine with Mantine, you need to install the following package `@refinedev/mantine` along with the Mantine packages:

```sh
npm install @refinedev/mantine @refinedev/react-table @mantine/core@5 @mantine/hooks@5 @mantine/form@5 @mantine/notifications@5 @emotion/react @tabler/icons
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

Here's Refine in action, the below code is an example of a simple CRUD application using Refine + React Router + Mantine:

```tsx
import React from "react";
import { Refine } from "@refinedev/core";
import {
  ErrorComponent,
  ThemedLayoutV2,
  useNotificationProvider,
  RefineThemes,
} from "@refinedev/mantine";
import dataProvider from "@refinedev/simple-rest";
import RouterProvider from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
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
        <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />{" "}
        <NotificationsProvider position="top-right">
          <Refine
            routerProvider={RouterProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={useNotificationProvider}
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
        </NotificationsProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}

// src/pages/products/list.tsx

import React from "react";
import { type GetManyResponse, useMany } from "@refinedev/core";
import { List } from "@refinedev/mantine";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import { Box, Group, ScrollArea, Table, Pagination } from "@mantine/core";

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
      setCurrentPage,
      pageCount,
      currentPage,
      result,
      tableQuery: { isLoading: tableIsLoading },
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

  const categoryIds = result?.data?.map((item) => item.category?.id) ?? [];
  const {
    result: categoriesData,
    query: { isLoading: categoriesIsLoading },
  } = useMany<ICategory>({
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
    <ScrollArea>
      <List>
        <Table highlightOnHover>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {!header.isPlaceholder && (
                        <Group spacing="xs" noWrap>
                          <Box>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </Box>
                        </Group>
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

[![Refine + Mantine Example](https://refine.ams3.cdn.digitaloceanspaces.com/assets/refine-mantine-example-screenshot.png)](https://github.com/refinedev/refine/tree/master/examples/base-mantine)

## Documentation

- For more detailed information and usage, refer to the [Refine Mantine documentation](https://refine.dev/docs/ui-integrations/mantine/introduction).
- [Refer to documentation for more info about Refine](https://refine.dev/docs).
- [Step up to Refine tutorial](https://refine.dev/tutorial).
