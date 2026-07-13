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

## Material UI integration for Refine

[Material UI](https://mui.com/material-ui/getting-started/) is a library of React UI components that implements Google's Material Design.

[Refine](https://refine.dev/) is **headless by design**, offering unlimited styling and customization options. Moreover, Refine ships with ready-made integrations for [Ant Design](https://ant.design/), [Material UI](https://mui.com/material-ui/getting-started/overview/), [Mantine](https://mantine.dev/), and [Chakra UI](https://chakra-ui.com/) for convenience.

Refine has connectors for 15+ backend services, including REST API, [GraphQL](https://graphql.org/), and popular services like [Airtable](https://www.airtable.com/), [Strapi](https://strapi.io/), [Supabase](https://supabase.com/), [Firebase](https://firebase.google.com/), and [NestJS](https://nestjs.com/).

## Installation

To use Refine with Material UI, you need to install the following package `@refinedev/mui` along with the Material UI packages:

```sh
npm install @refinedev/mui @mui/material @mui/lab @mui/x-data-grid @emotion/react @emotion/styled
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

Here's Refine in action, the below code is an example of a simple CRUD application using Refine + React Router + Material UI:

```tsx
import React from "react";
import { Refine, useMany } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/mui";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

import CssBaseline from "@mui/material/CssBaseline";

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Refine
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        routerProvider={routerProvider}
        resources={[
          {
            name: "products",
            list: "/products",
          },
        ]}
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
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}

// src/pages/products/list.tsx

import { List, useDataGrid, DateField } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const ProductList = () => {
  const { dataGridProps } = useDataGrid();

  const { data: categories, isLoading } = useMany({
    resource: "categories",
    ids:
      dataGridProps?.rows?.map((item) => item?.category?.id).filter(Boolean) ??
      [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", type: "number" },
      { field: "name", flex: 1, headerName: "Name" },
      {
        field: "category",
        flex: 1,
        headerName: "Category",
        display: "flex",
        renderCell: ({ value }) =>
          isLoading
            ? "Loading..."
            : categories?.data?.find((item) => item.id === value?.id)?.title,
      },
      {
        field: "createdAt",
        flex: 1,
        headerName: "Created at",
        display: "flex",
        renderCell: ({ value }) => <DateField value={value} />,
      },
    ],
    [categories?.data, isLoading],
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};
```

The result will look like this:

[![Refine + Material UI Example](https://refine.ams3.cdn.digitaloceanspaces.com/assets/refine-mui-simple-example-screenshot-rounded.webp)](https://refine.new/preview/c85442a8-8df1-4101-a09a-47d3ca641798)

## Documentation

- For more detailed information and usage, refer to the [Refine Material UI documentation](https://refine.dev/docs/ui-integrations/material-ui/introduction).
- [Refer to complete Refine tutorial with Material UI](https://refine.dev/tutorial).
- [Refer to documentation for more info about Refine](https://refine.dev/docs).
