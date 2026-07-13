---
id: nextjs
title: Next.js
---

**refine** can be used with [**Next.js**][nextjs] to SSR your pages. It doesn't get in the way and follows Next.js conventions and also provides helper modules when necessary.

## Setup

[**nextjs-router**][nextjsrouter] package provided by **refine** must be used for the [`routerProvider`][routerprovider]

<InstallPackagesCommand args="@refinedev/nextjs-router"/>

:::tip
We recommend using `create refine-app` to initialize your refine projects. It configures the project according to your needs including SSR with Next.js.

<CreateRefineAppCommand args="-o refine-nextjs my-refine-nextjs-app" />

:::

:::caution
To make this example more visual, we used the [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/v3/packages/refine-antd) package. If you are using Refine headless, you need to provide the components, hooks or helpers imported from the [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/v3/packages/refine-antd) package.
:::

## Usage

[`<Refine>`][refine] must wrap your pages in a [custom App][nextjscustomapp] component. This way your [pages][nextjspages] are integrated to refine.

```tsx title="pages/_app.tsx"
import { AppProps } from "next/app";

import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ReadyPage,
  useNotificationProvider,
  ErrorComponent,
} from "@pankod/refine-antd";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

import { PostList, PostEdit, PostCreate, PostShow } from "pages/posts";
import { UserList, UserShow } from "pages/users";

const API_URL = "https://api.fake-rest.refine.dev";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    // highlight-start
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL)}
      Layout={Layout}
      ReadyPage={ReadyPage}
      notificationProvider={useNotificationProvider}
      catchAll={<ErrorComponent />}
      resources={[
        {
          name: "posts",
          list: PostList,
          create: PostCreate,
          edit: PostEdit,
          show: PostShow,
        },
        {
          name: "users",
          list: UserList,
          show: UserShow,
        },
      ]}
    >
      <Component {...pageProps} />
    </Refine>
    // highlight-end
  );
}

export default MyApp;
```

## Custom Page

Let's say we want to show a list of users in `/users`. After creating `users.tsx` under `pages` in your Nextjs app, we can use the `useTable` hook to list the users in a table:

```tsx title="pages/users.tsx"
import { LayoutWrapper } from "@pankod/refine-core";
import { useTable, List, Table } from "@pankod/refine-antd";

const API_URL = "https://api.fake-rest.refine.dev";
// highlight-start
export const UserList: React.FC = () => {
  const { tableProps } = useTable<IUser>({
    resource: "users",
  });

  return (
    <LayoutWrapper>
      <List title="Users">
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="ID" sorter />
          <Table.Column dataIndex="firstName" title="Name" />
        </Table>
      </List>
    </LayoutWrapper>
  );
};
// highlight-end
interface IUser {
  id: number;
  firstName: string;
}

export default UserList;
```

:::tip
If you want to handle your `resource` with a custom page or create a custom page with or without a resource, these will not be visible in the `<Sider />` component. You can trick the `<Sider/>` by passing an empty resource to show your custom route in it.

```tsx title="Example"
const App = () => (
  <Refine
    resources={[
      // This will add an item to `<Sider/>` with route `/my-custom-item`
      { name: "my-custom-item", list: () => null },
    ]}
  />
);
```

:::

:::caution
Notice how we passed `resource` prop to [`useTable`][usetable]. This is necessary since for `useTable` to be able to get `resource` name from route, it needs to be a route parameter in a dynamic route. [Refer here](#standard-crud-page) where standard CRUD pages can be built with dynamic routing.
:::

:::caution
We also used `<LayoutWrapper>` to show the page in the layout provided to [`<Refine>`][refine]. This is deliberately opt-in to provide flexibility. [If you're building a standard CRUD page layout can be baked in automatically](#standart-crud-page).
:::

### SSR

**refine** uses [react-query][reactquery] in its hooks for data management. [Following react-query's guide][reactqueryssr], SSR can be achieved like this:

```tsx title="pages/users.tsx"
// highlight-next-line
import { GetServerSideProps } from "next";
import dataProvider from "@pankod/refine-simple-rest";
import {
  LayoutWrapper,
  // highlight-next-line
  GetListResponse,
} from "@pankod/refine-core";
import { useTable, List, Table } from "@pankod/refine-antd";

const API_URL = "https://api.fake-rest.refine.dev";
// highlight-start
export const UserList: React.FC<{ users: GetListResponse<IUser> }> = ({
  users,
}) => {
  // highlight-end
  const { tableProps } = useTable<IUser>({
    resource: "users",
    // highlight-start
    queryOptions: {
      initialData: users,
    },
    // highlight-end
  });

  return (
    <LayoutWrapper>
      <List title="Users">
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="ID" sorter />
          <Table.Column dataIndex="firstName" title="Name" />
        </Table>
      </List>
    </LayoutWrapper>
  );
};

// highlight-start
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await dataProvider(API_URL).getList({
    resource: "users",
  });

  return {
    props: { users: data },
  };
};
// highlight-end

interface IUser {
  id: number;
  firstName: string;
}

export default UserList;
```

We use the [`getList`][getlist] method from our [`dataProvider`][dataprovider] to fetch `users` data and pass through `props` as conventionally done in Next.js. Then `users` data is available in the props of our `/users` page. [`useTable`][usetable] can take options for underlying react-query queries with `queryOptions`. Passing `users` data to its `initialData` loads the data on server side.

:::tip
We used `getList` from `dataProvider` but data can be fetched in any way you desire.
:::

## Standard CRUD Page

**nextjs-router** package provides `NextRouteComponent` for routing in **refine** resources. Simply export the component from the page and add a [data fetching function][datafetching]. While you can create pages with defined params like `[resource]/[action]/[id].tsx`, we recommend using a catch-all route to handle all **refine** routing in a single file. You can start by creating a `[[...refine]].tsx` file under `pages` in your Nextjs app:

```tsx title="pages/[[...refine]].tsx"
export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
```

:::info

You can also define routes without using `[[...refine]].tsx` file like below, but a catch-all route is an easier approach with nested route support.

Export `NextRouteComponent` as default in the following pages:

- `pages/[resource].tsx`
- `pages/[resource]/[action].tsx`
- `pages/[resource]/[action]/[id].tsx`
- `pages/index.tsx`

`NextRouteComponent` will use route parameters `resource` and `action` and render the associated component defined in [`resources`][refine].

- `list` component will be rendered for `/[resource]` route
- `create`, `edit` and `show` will be rendered for `/[resource]/[action]` and `/[resource]/[action]/[id]` routes
- For the root `/` route, it will render `DashboardPage` if it's defined and if not will navigate to the first resource in `resources`.

:::

:::caution
`NextRouteComponent` will wrap the page with `Layout` provided to [`<Refine>`][refine]
:::

### SSR

`NextRouteComponent` accepts a `initialData` prop for SSR data.

```ts
type NextRouteComponentProps = {
  initialData?: any;
};
```

`initialData` must be passed as props from `getServerSideProps`. `NextRouteComponent` will pass this data as `initialData` to the `list`, `create`, `edit`, and `show` components.

For example, for a `list` component that will be rendered for `/[resource]`, the page can use SSR like this:

```tsx title="pages/[[...refine]].tsx"
export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
import { handleRefineParams } from "@pankod/refine-nextjs-router";
import dataProvider from "@pankod/refine-simple-rest";

import { GetServerSideProps } from "next";

const API_URL = "https://api.fake-rest.refine.dev";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { resource, action, id } = handleRefineParams(context.params?.refine);

  try {
    if (resource && action === "show" && id) {
      const data = await dataProvider(API_URL).getOne({
        // we're slicing the resource param to get the resource name from the last part
        resource: resource.slice(resource.lastIndexOf("/") + 1),
        id,
      });

      return {
        props: {
          initialData: data,
        },
      };
    } else if (resource && !action && !id) {
      const data = await dataProvider(API_URL).getList({
        // we're slicing the resource param to get the resource name from the last part
        resource: resource.slice(resource.lastIndexOf("/") + 1),
      });

      return {
        props: {
          initialData: data,
        },
      };
    }
  } catch (error) {
    return { props: {} };
  }

  return { props: {} };
};
```

And in the `list` component for a `resource` e.g. "posts":

```tsx title="src/components/posts/list.tsx"
import { GetListResponse, IResourceComponentsProps } from "@pankod/refine-core";
import { useTable, List, Table } from "@pankod/refine-antd";

export const PostList: React.FC<
  IResourceComponentsProps<GetListResponse<IPost>>
  // highlight-next-line
> = ({ initialData }) => {
  const { tableProps } = useTable<IPost>({
    // highlight-start
    queryOptions: {
      initialData,
    },
    // highlight-end
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="status" title="Status" />
      </Table>
    </List>
  );
};

interface IPost {
  id: number;
  firstName: string;
}
```

:::tip

You can also achieve SSR with `getStaticProps` and `getStaticPaths` for static generation. All you need to do is to add the paths you want to statically generate to `getStaticPaths` and pass the data as `initialData` from `getStaticProps`.

:::

## Server Side Authentication

**nextjs-router** package provides `checkAuthentication` to easily handle server side authentication.

```tsx title="pages/[[...refine]].tsx"
export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
// highlight-next-line
import { checkAuthentication } from "@pankod/refine-nextjs-router";

import { GetServerSideProps } from "next";

import { authProvider } from "../../src/authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // highlight-start
  const { isAuthenticated, ...props } = await checkAuthentication(
    authProvider,
    context,
  );

  if (!isAuthenticated) {
    return props;
  }
  // highlight-end

  return {
    props: {},
  };
};
```

`checkAuthentication` expects your `authProvider` and **getServerSideProps**'s `context`. It uses the `checkAuth` from the `authProvider` to check for authentication and returns `isAuthenticated` accordingly. It also returns a `redirect` object to handle unauthenticated case. It redirects to `/login` while keeping the original route to be navigated to after successful login.

## `syncWithLocation` and Query Parameters in SSR

If `syncWithLocation` is enabled, query parameters must be handled while doing SSR.

```tsx title="pages/users.tsx"
import { GetServerSideProps } from "next";
// highlight-next-line
import { parseTableParamsFromQuery } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // highlight-start
  const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
    parseTableParamsFromQuery(context.query);
  // highlight-end
  const data = await dataProvider(API_URL).getList({
    resource: "users",
    // highlight-start
    filters: parsedFilters,
    pagination: {
      current: parsedCurrent || 1,
      pageSize: parsedPageSize || 10,
    },
    sort: parsedSorter,
    // highlight-end
  });

  return {
    props: { users: data },
  };
};
```

`parseTableParams` parses the query string and returns query parameters([refer here for their interfaces][interfaces]). They can be directly used for `dataProvider` methods that accepts them.

## `appDir` Support

Next.js introduced a new way of defining pages within the `app/` directory. _This new directory has support for layouts, nested routes, and uses Server Components by default._ To learn more about the feature check out [Next.js Beta docs](https://beta.nextjs.org/docs/upgrade-guide)

**refine** also follows this feature and provides a way to use `appDir` with your **refine** apps.

:::caution

`app/` is currently in beta and is **not recommended** for production use in Next.js. In **refine**, we're providing the `app/` support as experimental and not recommended for production use.

:::

To start using `app/` with **refine**, you need to set create the **refine** routes in your `/app` directory with the following convention:

```bash

your-project
└── app
    └── [[...refine]]
        ├── layout.tsx
        └── page.tsx

```

**Initializing `<Refine/>` in `layout.tsx`**

```tsx title="app/[[...refine]]/layout.tsx"
"use client";

import routerProvider from "@pankod/refine-nextjs-router/app";

export default function RefineLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Record<"refine", string[]>;
}) {
  return (
    <Refine
      routerProvider={routerProvider.call({ params })}
      /* ... */
    >
      {children}
    </Refine>
  );
}
```

We need to bind the `params` to the `routerProvider` and call it to initialize the `routerProvider`. This is because the `params` are not available via hooks for **refine** to use.

**Creating `page.tsx`**

```tsx title="app/[[...refine]]/page.tsx"
"use client";

import { NextRouteComponent } from "@pankod/refine-nextjs-router/app";

export default NextRouteComponent;
```

Note that we're importing `NextRouteComponent` from `@pankod/refine-nextjs-router/app` instead of `@pankod/refine-nextjs-router`. This is because we're using the `app/` directory and we need to import the `app` version of the `NextRouteComponent`.

:::note
`"use client";` is a directive that instructs Next.js to opt-out from Server Components. This is because **refine** and dependencies are not yet compatible with Server Components. That's why we're using it in both `layout.tsx` and `page.tsx` files.
:::

:::note
`checkAuthentication` does not work with `app/` directory. You need to handle the authentication of your views while using `app/` directory.

**refine** aims to provide a middleware for `app/` directory to substitute `checkAuthentication` but it's not available yet.
:::

:::info
You can find the `app/` directory example with **refine** in [examples/nextjs/appdir](https://github.com/refinedev/refine/tree/v3/examples/remix/antd)
:::

## Example

<CodeSandboxExample path="with-nextjs" />

[nextjs]: https://nextjs.org/docs/getting-started
[nextjsrouter]: https://www.npmjs.com/package/@pankod/refine-nextjs-router
[routerprovider]: /core/docs/3.xx.xx/api-reference/core/providers/router-provider
[nextjscustomapp]: https://nextjs.org/docs/advanced-features/custom-app
[refine]: /core/docs/3.xx.xx/api-reference/core/components/refine-config
[nextjspages]: https://nextjs.org/docs/basic-features/pages
[usetable]: /core/docs/3.xx.xx/api-reference/core/hooks/useTable
[reactqueryssr]: https://react-query.tanstack.com/guides/ssr#using-initialdata
[reactquery]: https://react-query.tanstack.com/
[getlist]: /core/docs/3.xx.xx/api-reference/core/providers/data-provider/#getlist-
[dataprovider]: /core/docs/3.xx.xx/api-reference/core/providers/data-provider
[usetable]: /core/docs/3.xx.xx/api-reference/core/hooks/useTable
[interfaces]: /core/docs/3.xx.xx/api-reference/core/interfaces/#crudfilters
[autostaticopt]: https://nextjs.org/docs/advanced-features/automatic-static-optimization
[datafetching]: https://nextjs.org/docs/basic-features/data-fetching
