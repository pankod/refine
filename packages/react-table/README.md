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

<div align="center">refine is an open-source, headless React framework for developers building enterprise internal tools, admin panels, dashboards, B2B applications.

<br/>

It eliminates repetitive tasks in CRUD operations and provides industry-standard solutions for critical project components like **authentication**, **access control**, **routing**, **networking**, **state management**, and **i18n**.

</div>

# Tanstack React Table integration for refine

[Tanstack React Table](https://tanstack.com/table/v8) is a headless table library, which means it does not ship with components, markup or styles

[refine](https://refine.dev/) is **headless by design**, offering unlimited styling and customization options. Moreover, refine ships with ready-made integrations for [Ant Design](https://ant.design/), [Material UI](https://mui.com/material-ui/getting-started/overview/), [Mantine](https://mantine.dev/), and [Chakra UI](https://chakra-ui.com/) for convenience.

refine has connectors for 15+ backend services, including REST API, [GraphQL](https://graphql.org/), and popular services like [Airtable](https://www.airtable.com/), [Strapi](https://strapi.io/), [Supabase](https://supabase.com/), [Firebase](https://firebase.google.com/), and [NestJS](https://nestjs.com/).

## Installation & Usage

```
npm install @refinedev/react-table @tanstack/react-table
```

```tsx
import { useTable } from "@refinedev/react-table";

import { ColumnDef, flexRender } from "@tanstack/react-table";

const EditPost = () => {
  const columns =
    React.useMemo <
    ColumnDef <
    IPost >
    [] >
    (() => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "title",
        header: "Title",
        accessorKey: "title",
        meta: {
          filterOperator: "contains",
        },
      },
    ],
    []);

  const tableInstance = useTable({
    columns,
    refineCoreProps: {
      resource: "posts",
    },
  });

  return; /* ... */
};
```

## Documentation

- For more detailed information and usage, refer to the [refine TanStack React Table documentation](https://refine.dev/docs/packages/documentation/tanstack-table/introduction)).
- [Refer to TanStack React Table example with refine](https://refine.dev/docs/examples/table/tanstack/advanced-react-table/).
- [Refer to documentation for more info about refine](https://refine.dev/docs/).
- [Step up to refine tutorials](https://refine.dev/docs/tutorial/introduction/index/).
