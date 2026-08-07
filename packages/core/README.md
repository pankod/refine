<div align="center">
<a href="https://refine.dev/core">
    <img alt="refine logo" src="https://refine.ams3.cdn.digitaloceanspaces.com/readme/refine-readme-banner.png">
</a>

<br/>
<br/>

<div align="center">
    <a href="https://refine.dev/core/">Home Page</a> |
    <a href="https://refine.dev/core/docs/">Documentation</a> |
    <a href="https://refine.dev/core/templates/">Examples</a> |
    <a href="https://discord.gg/refine">Discord</a> |
    <a href="https://refine.dev/blog/">Blog</a> |
    <a href="https://refine.dev/">Refine</a>
</div>
</div>

<br/>
<br/>

<div align="center"><strong>The sweet spot between the low/no code and “starting from scratch” for CRUD-heavy applications.</strong><br>

Refine Core is an open source, React meta-framework for enterprise. It provides a headless solution for everything from admin panels to
dashboards and internal tools.
<br />

<strong>Refine CORE also powers <a href="https://refine.dev/">Refine's purpose built AI agent.</a></strong>
<br />

</div>

<div align="center">

[![Awesome](https://github.com/refinedev/awesome-refine/raw/main/images/badge.svg)](https://github.com/refinedev/awesome-refine)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/8101/badge)](https://www.bestpractices.dev/projects/8101)
[![npm version](https://img.shields.io/npm/v/@refinedev/core.svg)](https://www.npmjs.com/package/@refinedev/core)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](CODE_OF_CONDUCT.md)

[![Discord](https://img.shields.io/discord/837692625737613362.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/refine)
[![Twitter Follow](https://img.shields.io/twitter/follow/refine_dev?style=social)](https://twitter.com/refine_dev)

</div>

<br/>

[![how-refine-works](https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/diagram-3.png)](https://refine.dev/core)

## What is Refine CORE?

**Refine CORE** is a React meta-framework for CRUD-heavy web applications. It addresses a wide range of enterprise use cases including internal tools, admin panels, dashboards and B2B apps.

Refine CORE's hooks and components streamline the development process by offering industry-standard solutions for crucial aspects of a project, including **authentication**, **access control**, **routing**, **networking**, **state management**, and **i18n**.

Refine CORE's headless architecture enables the building of highly customizable applications by decoupling business logic from UI and routing. This allows integration with:

- Any custom designs or UI frameworks like [TailwindCSS](https://tailwindcss.com/), along with built-in support for [Ant Design](https://ant.design/), [Material UI](https://mui.com/material-ui/getting-started/overview/), [Mantine](https://mantine.dev/), and [Chakra UI](https://chakra-ui.com/).

- Various platforms, including Next.js, Remix, React Native, Electron, etc., by a simple routing interface without the need for additional setup steps.

## ⚡ Try Refine CORE

Start a new project with Refine CORE in seconds using the following command:

```sh
npm create refine-app@latest my-refine-app
```

Or you can create a new project on your browser:

<a href="https://refine.dev/core/?playground=true" target="_blank">
  <img height="48" width="245" src="https://refine.ams3.cdn.digitaloceanspaces.com/assets/try-it-in-your-browser.png" />
</a>

<br>

You can also try Refine's AI agent for free to create projects:

<a href="https://refine.dev/" target="_blank">
  <img height="48" width="245" src="https://refine.ams3.cdn.digitaloceanspaces.com/assets/try-out-refine-ai-2.png" />
</a>

## Quick Start

Here's Refine CORE in action, the below code is an example of a simple CRUD application using Refine CORE + React Router + Material UI:

```tsx
import React from "react";
import { Refine, useMany } from "@refinedev/core";
import { ThemedLayout } from "@refinedev/mui";
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
              <ThemedLayout>
                <Outlet />
              </ThemedLayout>
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

[![Refine CORE + Material UI Example](https://refine.ams3.cdn.digitaloceanspaces.com/assets/refine-mui-simple-example-screenshot-rounded.webp)](https://refine.new/preview/c85442a8-8df1-4101-a09a-47d3ca641798)

## Use cases

**Refine CORE** shines on _data-intensive⚡_ enterprise B2B applications like **admin panels**, **dashboards** and **internal tools**. Thanks to the built-in **SSR support**, it can also power _customer-facing_ applications like **storefronts**.

You can take a look at some live examples that can be built using **Refine CORE** from scratch:

- [Fully-functional CRM Application](https://refine.dev/templates/crm-application/)
- [Fully-functional Admin Panel](https://refine.dev/templates/react-admin-panel/)
- [Win95 Style Admin panel 🪟](https://refine.dev/templates/win-95-style-admin-panel/)
- [PDF Invoice Generator](https://refine.dev/templates/react-pdf-invoice-generator/)
- [Medium Clone - Real World Example](https://refine.dev/templates/react-crud-app/)
- [Multitenancy Example](https://refine.dev/templates/multitenancy-strapi/)
- [Storefront](https://refine.dev/templates/next-js-ecommerce-store/)
- [Refer to templates page for more examples](https://refine.dev/templates/)
- [More **Refine CORE** powered different usage scenarios can be found here](https://refine.dev/core/templates)

## Key Features

- Refine CORE Devtools - dive deeper into your app and provide useful insights
- Connectors for **15+ backend services** including [REST API](https://github.com/refinedev/refine/tree/main/packages/simple-rest), [GraphQL](https://github.com/refinedev/refine/tree/main/packages/graphql), [NestJs CRUD](https://github.com/refinedev/refine/tree/main/packages/nestjsx-crud), [Airtable](https://github.com/refinedev/refine/tree/main/packages/airtable), [Strapi](https://github.com/refinedev/refine/tree/main/packages/strapi), [Strapi v4](https://github.com/refinedev/refine/tree/main/packages/strapi-v4), [Supabase](https://github.com/refinedev/refine/tree/main/packages/supabase), [Hasura](https://github.com/refinedev/refine/tree/main/packages/hasura), [Appwrite](https://github.com/refinedev/refine/tree/main/packages/appwrite), [Nestjs-Query](https://github.com/refinedev/refine/tree/main/packages/nestjs-query), [Firebase](https://firebase.google.com/), [Sanity](https://www.sanity.io/), and [Directus](https://directus.io/).
- SSR support with Next.js & Remix and Advanced routing with any router library of your choice
- Auto-generation of CRUD UIs based on your API data structure
- Perfect state management & mutations with React Query
- Providers for seamless authentication and access control flows
- Out-of-the-box support for live / real-time applications
- Easy audit logs & document versioning

## Learning Refine CORE

- Navigate to the [Tutorial](https://refine.dev/core/tutorial/essentials/intro/) on building comprehensive CRUD application guides you through each step of the process.
- Visit the [Guides & Concepts](https://refine.dev/core/docs/guides-concepts/general-concepts/) to get informed about the fundamental concepts.
- Read more on [Advanced Tutorials](https://refine.dev/core/docs/advanced-tutorials/) for different usage scenarios.

## Contribution

[Refer to the contribution docs for more information.](https://refine.dev/core/docs/guides-concepts/contributing/#ways-to-contribute)

If you have any doubts related to the project or want to discuss something, then join our [Discord server](https://discord.gg/refine).

## Contributors ♥️ Thanks

We extend our gratitude to all our numerous contributors who create plugins, assist with issues and pull requests, and respond to questions on Discord and GitHub Discussions.

Refine CORE is a community-driven project, and your contributions continually improve it.

<br/>

<a href="https://github.com/refinedev/refine/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=refinedev/refine&max=400&columns=20" />
</a>

## License

Licensed under the MIT License, Copyright © 2021-present Refinedev
