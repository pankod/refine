---
title: "General Concepts Guide | Guides Concepts in Refine v5"
display_title: "General Concepts"
sidebar_label: "General Concepts"
description: "Set up General Concepts in Refine v5. Learn best practices. Learn provider and data for real-world React admin panels. Real-world snippets included."
---

Refine is an extensible framework designed for rapidly building web applications. It offers a modern, **hook-based architecture**, a **pluggable system of providers**, and a robust **state management** solution. This section provides an overview of the key concepts in Refine.

## Headless Concept

Instead of being limited to a set of pre-styled components, **Refine** provides collections of helper `hooks`, `components` and `providers` and more. Since business logic and UI are completely decoupled, you can customize UI without constraints.

It means, **Refine** just works _seamlessly_ with any _custom designs_ or _UI frameworks_. Thanks to its headless architecture, you can use popular CSS frameworks like [TailwindCSS](https://tailwindcss.com/) or even create your own styles from scratch.

Refine also provides integrations with [Ant Design](https://ant.design/), [Material UI](https://mui.com/material-ui/getting-started/overview/), [Mantine](https://mantine.dev/), and [Chakra UI](https://chakra-ui.com/) to get you started quickly. These libraries are set of components which are nicely integrated with headless `@refinedev/core` package.

## Resource Concept

In Refine, a **resource** is a central concept representing an **entity**, which ties together various aspects of your application.

It typically refers to a data entity, like `products`, `blogPosts`, or `orders`.

Resource definitions allow you to manage your application in a structured way, abstracting complex operations into simpler actions through various **providers** and **UI integrations**.

A typical resource definition looks like this:

```tsx title=App.tsx
import { Refine } from "@refinedev/core";

export const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "products",
          list: "/my-products",
          show: "/my-products/:id",
          edit: "/my-products/:id/edit",
          create: "/my-products/new",
        },
      ]}
    >
      {/* ... */}
    </Refine>
  );
};
```

## Provider Concept

Providers are the building blocks of Refine, used to manage different aspects of your application, such as data fetching, routing, access control, and more.

They are pluggable, which means you can use the **built-in providers** or **create your own**. This allows you to customize the behavior of your application to suit your needs.

- **Data Provider**: Communication with the backend data source, handling data operations such as fetching, creating, updating, deleting records, caching, and invalidation.
- **Authentication Provider**: Manages user authentication and authorization processes. Handles redirection, error cases.
- **Access Control Provider**: Handles authorization and access control. Used to hide/disable buttons and menu items, or to protect routes and components.
- **Notification Provider**: Enables notification features like showing notification after successful mutations or errors.
- **I18n Provider**: Enables i18n features such as rendering translated menu items, button texts, table columns, page titles, and more.
- **Live Provider**: Enables real-time updates to your application. For example, when a user creates a new record, other users can see the new record in the list page without refreshing the page.
- **Router Provider**: Matches routes to resources, enables navigation features like breadcrumbs, automatic redirections after CRUD operations, rendering menu items.
- **Audit Log Provider**: Handles sending Audit Logs for CRUD operations.

## Hook Concept

Refine adopts a hook-based architecture, a modern and powerful pattern in React development, which significantly enhances the development experience and application performance.

Refine's hooks are **headless**, which means they are library agnostic, provides **a unified interface** for your needs regardless of your library or framework of your choice.

For example, we have different built-in router providers for **React Router**, **Next.js**, **Remix**, **Expo** that handles routing in your application.

But we have a single `useGo` hook, exported from `@refinedev/core` package, can be used to navigate to a specific resource's page in your application **regardless of your routing solution**.

This is just one example, we have many other hooks for data fetching, authentication, access control, notifications, i18n and more.

They are all **headless**, **library agnostic**, and **unified**.

You might be using [Casbin](https://casbin.org) or [Cerbos](https://cerbos.dev) for authorization, we have a single `useCan` hook to control access in your components.

Or you may prefer either `next-i18next` or `react-i18next` for i18n, we have a single `useTranslate` hook to handle translation.

## Providers

### Data Provider <GuideBadge id="guides-concepts/data-fetching" />

The Data Provider is the bridge between your frontend and your backend data source. It is responsible for handling all data-related operations such as fetching, caching, creating, updating, and deleting records.

Each data operation in the Data Provider is typically associated with a specific resource. For example, when fetching data for a `products` resource, the Data Provider will know which endpoint to hit and how to handle the response.

```tsx title=data-provider.ts
import { DataProvider } from "@refinedev/core";

const myDataProvider: DataProvider = {
  getOne: async ({ resource, id }) => {
    const response = await fetch(
      `https://example.com/api/v1/${resource}/${id}`,
    );
    const data = await response.json();

    return { data };
  },
  // other methods...
};
```

> Refine offers various built-in data providers for popular data sources like REST, Strapi, AirTable, Supabase, GraphQL, and more. See the [Data Providers](/core/docs/data/data-provider/) page for more information.

#### Hooks

You can use `useList`, `useOne`, `useCreate`, `useEdit`, `useShow` hooks to fetch data in your components.

```tsx title=show.tsx
import { useOne } from "@refinedev/core";

export const MyPage = () => {
  const {
    result,
    query: { isLoading },
  } = useOne({ resource: "products", id: 1 });

  if (isLoading) {
    return <>Loading...</>;
  }

  return <>{result?.name}</>;
};
```

### Authentication Provider <GuideBadge id="guides-concepts/authentication" />

The Authentication Provider centralizes the authentication and authorization processes in Refine applications.

It handles authentication and authorization processes such as login, logout, redirection, error handling, and more.

```tsx title=auth-provider.ts
import { AuthProvider } from "@refinedev/core'";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { status } = handleLogin(email, password);

    if (status === 200) {
      return { success: true, redirectTo: "/dashboard" };
    } else {
      return {
        success: false,
        error: { name: "Login Error", message: "Invalid credentials" },
      };
    }
  },
  check: async (params) => ({}),
  logout: async (params) => ({}),
  onError: async (params) => ({}),
  register: async (params) => ({}),
  forgotPassword: async (params) => ({}),
  updatePassword: async (params) => ({}),
  getPermissions: async (params) => ({}),
  getIdentity: async (params) => ({}),
};
```

#### Components

You can use `Authenticated` component from `@refinedev/core` to protect your routes, components with authentication.

```tsx title=my-page.tsx
import { Authenticated } from "@refinedev/core";

const MyPage = () => (
  <Authenticated>
    // Only authenticated users can see this.
    <MyComponent />
  </Authenticated>
);
```

> See the [Authentication Components](/core/docs/guides-concepts/authentication#components) page for more information.

#### Hooks

You can use `useGetIdentity` hook to get current user.

```tsx title=show.tsx
import { useGetIdentity } from "@refinedev/core";

export const DashboardPage = () => {
  const {
    data: { name },
  } = useGetIdentity();

  return <>Welcome {name}!</>;
};
```

> See the [Authentication Hooks](/core/docs/guides-concepts/authentication#hooks) page for more information.

#### UI Integrations

We have pre-built components which work with Auth Provider out-of-the-box.

When provided, their Layout components can automatically render current user information on the header and add logout button to appropriate places.

You can also use `AuthPage` component of these integrations for `Login`, `Register`, `Forgot Password`, `Reset Password` pages.

See the [Auth Pages](#auth-pages) section below for live examples.

### Access Control Provider <GuideBadge id="guides-concepts/authorization" />

The Access Control Provider manages what users can access or perform within the application based on their permissions.

It uses the resource definition to determine access rights. For instance, it can decide whether a user can edit or delete record for `products` resource based on the resource definition.

```tsx title=App.tsx
import { AccessControlProvider, Refine } from "@refinedev/core";

const myAccessControlProvider: AccessControlProvider = {
  can: async ({ resource, action }) => {
    if (resource === "users" && action === "block") {
      return { can: false };
    }

    return { can: true };
  },
};

export const App = () => {
  return (
    <Refine accessControlProvider={myAccessControlProvider}>{/* ... */}</Refine>
  );
};
```

#### Components

You can wrap `CanAccess` component to wrap relevant parts of your application to control access.

```tsx title=my-page.tsx
import { CanAccess } from "@refinedev/core";

export const MyPage = () => {
  return (
    <CanAccess resource="users" action="show" params={{ id: 1 }}>
      <>
        My Page
        <CanAccess
          resource="users"
          action="block"
          params={{ id: 1 }}
          fallback={"You are not authorized."}
        >
          // Only authorized users can see this button.
          <BlockUserButton />
        </CanAccess>
      </>
    </CanAccess>
  );
};
```

#### Hooks

You can use `useCan` hook to control access in your components.

```tsx title=my-page.tsx
import { ErrorComponent, useCan } from "@refinedev/core";

export const MyPage = () => {
  const { data: show } = useCan({
    resource: "users",
    action: "show",
    params: { id: 1 },
  });
  const { data: block } = useCan({
    resource: "users",
    action: "block",
    params: { id: 1 },
  });

  if (!show?.can) {
    return <ErrorComponent />;
  }

  return (
    <>
      My Page
      {block?.can && <BlockUserButton />}
      {!block?.can && "You are not authorized."}
    </>
  );
};
```

#### UI Integrations

When provided, our UI Integrations work out-of-the-box with Access Control Provider.

For example if user isn't authorized to see `orders` resource, it will be hidden on the sidebar menu automatically.

Or if the current user isn't authorized to delete a product, the delete button will be disabled or hidden automatically.

```tsx title=my-page.tsx
import { DeleteButton } from "@refinedev/antd"; // or @refinedev/mui, @refinedev/chakra-ui, @refinedev/mantine

export const MyPage = () => {
  return (
    <>
      My Page
      {/* Only authorized users can see this button. */}
      <DeleteButton resource="users" recordItemId={1} />
    </>
  );
};
```

This applies to all buttons like `CreateButton`, `EditButton`, `ShowButton`, `ListButton`.

### Notification Provider <GuideBadge id="guides-concepts/notifications" />

Refine can automatically show notifications for CRUD operations and errors.

For example, after creating, updating, or deleting a record for `products` resource, or when an error occurs on form submission.

Refine has out-of-the-box notification providers for popular UI libraries like **Ant Design**, **Material UI**, **Chakra UI**, and **Mantine**.

#### Hooks

Our **data hooks**, **mutation hooks**, and **auth hooks** can automatically show notifications for actions and errors.

It's also possible to modify these notifications per hook.

```tsx title=my-page.tsx
import { useDelete } from "@refinedev/core";

export const MyPage = () => {
  const { mutate } = useDelete();

  return (
    <Button
      onClick={() => {
        mutate({
          resource: "products",
          id: 1,
          successNotification: () => ({
            message: "Product Deleted",
            description: "Product has been deleted successfully.",
            type: "success",
          }),
          errorNotification: () => ({
            message: "Product Delete Error",
            description: "An error occurred while deleting the product.",
            type: "error",
          }),
        });
      }}
    >
      Delete Product
    </Button>
  );
};
```

If you have a use-case that isn't covered, you can use `useNotification` hook to show notifications in your application.

```tsx title=my-page.tsx
import { useNotification } from "@refinedev/core";

export const MyPage = () => {
  const { open, close } = useNotification();

  return (
    <>
      <Button
        onClick={() => {
          open?.({
            key: "my-notification",
            message: "Test Notification",
            description: "This is a test notification.",
            type: "success", // success | error | progress
          });
        }}
      >
        Show notification
      </Button>
      <Button
        onClick={() => {
          close?.("my-notification");
        }}
      >
        Close Notification
      </Button>
    </>
  );
};
```

### I18n Provider <GuideBadge id="guides-concepts/i18n" />

I18n provider centralizes localization process in Refine applications.

```tsx title=App.tsx
import { Refine, I18nProvider } from "@refinedev/core";

const i18nProvider: I18nProvider = {
    translate: (key: string, options?: any, defaultMessage?: string) => string,
    changeLocale: (lang: string, options?: any) => Promise,
    getLocale: () => string,
};

export const App = () => {
  return (
    <Refine i18nProvider={i18nProvider} {/* ...*/}>
      {/* ... */}
    </Refine>
  )
}
```

#### Hooks

You can use `useTranslate`, `useSetLocale`, `useGetLocale` hooks to handle i18n in your components.

```tsx title=my-page.tsx
import { useTranslate, useSetLocale, useGetLocale } from "@refinedev/core";

export const MyPage = () => {
  const translate = useTranslate();
  const setLocale = useSetLocale();
  const getLocale = useGetLocale();

  return (
    <>
      Current Locale: {getLocale()}
      <Button onClick={() => setLocale("en")}>Set Locale to English</Button>
      <Button onClick={() => setLocale("de")}>Set Locale to German</Button>

      <Button>{translate("Hello")</Button>
    </>
  );
};

```

#### UI Integrations

When provided, our UI Integrations work out-of-the-box with I18n Provider.

For example, it will automatically translate menu items, button texts, table columns, page titles, and more.

### Router Provider <GuideBadge id="guides-concepts/routing" />

Router provider helps Refine understand the relationship between resources and routes. Enables navigation features like breadcrumbs, automatic redirections after CRUD operations, rendering menu items, inferring hook parameters, and more.

We have built-in router integrations for the following packages:

- React Router
- Next.js
- Remix
- Expo Router (React Native)

#### Components

**UI Integration** components can infer resource information from the current URL.

For example, we are in the list page of `products` resource, we have `List` layout component and we are adding `CreateButton` from one of our UI Integrations to redirect user to the create page of the resource.

With **router provider** current resource information will be inferred from the current URL.

```tsx title=products.tsx
import { List, CreateButton } from "@refinedev/antd"; // or @refinedev/mui, @refinedev/chakra-ui, @refinedev/mantine

export const ProductsListPage = () => {
  return (
    // Instead of <List resource="products">
    <List>
      {/* Instead of <CreateButton resource="products" /> */}
      <CreateButton /> // Redirects to /products/new
    </List>
  );
};
```

#### Hooks

Refine hooks can synchronize **resource**, **id**, **action** parameters from the current URL. This eliminates the need to pass them manually.

For example, `useShow` hook can infer `resource` and `id` parameters from the current URL.

```tsx title=show.tsx
import { useShow } from "@refinedev/core";

export const ShowPage = () => {
  const {
    result: product,
    query: { isLoading },
    // useShow({ resource: "products", id: 1 });
    // We don't need to pass "resource" and "id" parameters manually.
  } = useShow();

  if (isLoading) {
    return <>Loading...</>;
  }

  return <>{product?.name}</>;
};
```

Another example is `useTable` hook. While it can infer **resource**, **pagination**, **filters**, and **sorters** parameters from the current route, it can also update the current route if any of these parameters changes.

### Audit Log Provider <GuideBadge id="guides-concepts/audit-logs" />

Audit Log Provider centralizes retrieving audit logs in Refine applications.

It can be useful to show previous changes to your resources.

```tsx title="App.tsx"
import { AuditLogProvider, Refine } from "@refinedev/core";

const auditLogProvider: AuditLogProvider = {
  get: async (params) => {
    const { resource, meta, action, author } = params;

    const response = await fetch(
      `https://example.com/api/audit-logs/${resource}/${meta.id}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    return data;
  },
};

export const App = () => {
  return <Refine auditLogProvider={auditLogProvider}>{/* ... */}</Refine>;
};
```

#### Hooks

You can use `useLogList` hook to retrieve audit logs for your resources in your components. It uses `AuditLogProvider`'s `get` method under the hood.

```tsx
import { useLogList } from "@refinedev/core";

const productsAuditLogResults = useLogList({
  resource: "products",
});
```

## UI Integrations <GuideBadge id="guides-concepts/ui-libraries" />

While Refine itself is headless, it offers UI Integrations for popular UI libraries:

- [Ant Design](/core/docs/ui-integrations/ant-design/introduction/)
- [Material UI](/core/docs/ui-integrations/material-ui/introduction/)
- [Chakra UI](/core/docs/ui-integrations/chakra-ui/introduction/)
- [Mantine](/core/docs/ui-integrations/mantine/introduction/)

These integrations use `@refinedev/core` under the hood, becomes a bridge between the UI library and the Refine framework.

<Tabs wrapContent={false}>

<TabItem value="Ant Design">

import { AntdLayout } from './layout/antd';

<AntdLayout />

</TabItem>

<TabItem value="Material UI">

import { MaterialUILayout } from './layout/mui';

<MaterialUILayout />

</TabItem>

<TabItem value="Chakra UI">

import { ChakraUILayout } from './layout/chakra';

<ChakraUILayout />

</TabItem>

<TabItem value="Mantine">

import { MantineLayout } from './layout/mantine';

<MantineLayout />

</TabItem>

</Tabs>

### Forms <GuideBadge id="guides-concepts/forms" />

Refine provides a set of hooks to handle form state, validation, submission, autosave, and more. These hooks seamlessly integrate with popular UI libraries, making it easier to use their form components.

- [React Hook Form](https://react-hook-form.com/) (for Headless, Material UI, Chakra UI) - [Documentation](/core/docs/packages/list-of-packages/) - [Example](/core/docs/examples/form/react-hook-form/useForm/)
- [Ant Design Form](https://ant.design/components/form/#header) - [Documentation](/core/docs/ui-integrations/ant-design/hooks/use-form/) - [Example](/core/docs/examples/form/antd/useForm/)
- [Mantine Form](https://mantine.dev/form/use-form) - [Documentation](/core/docs/ui-integrations/mantine/hooks/use-form/) - [Example](/core/docs/examples/form/mantine/useForm/)

### Tables <GuideBadge id="guides-concepts/tables" />

Refine offers seamless integration with several popular UI libraries, simplifying the use of their table component features such as pagination, sorting, filtering, and more.

- [TanStack Table](https://react-table.tanstack.com/) (for Headless, Chakra UI, Mantine) - [Documentation](/core/docs/packages/list-of-packages/) - [Example](/core/docs/examples/table/tanstack-table/basic-tanstack-table/)
- [Ant Design Table](https://ant.design/components/table/#header) - [Documentation](/core/docs/ui-integrations/ant-design/hooks/use-table/) - [Example](/core/docs/examples/table/antd/useTable/)
- [Material UI DataGrid](https://mui.com/x/react-data-grid/) - [Documentation](/core/docs/ui-integrations/material-ui/hooks/use-data-grid/) - [Example](/core/docs/examples/table/mui/useDataGrid/)

### Layout

UI Integrations provide a Layout component, which renders the **sidebar menu**, **header**, and **content** area of your application.

It automatically renders the sidebar menu based on the **resource definitions**, and the header based on the **current user**.

### CRUD Pages

`List`, `Create`, `Edit`, `Show` components.

These components provide layout views based on the resource information automatically like:

- Header with title
- Breadcrumb
- Translated texts
- CRUD Buttons

On top of that, Refine adds some features to these layouts:

- **Access Control**: If the current user isn't authorized to create a product, the create button will be disabled or hidden automatically.
- **Translation**: buttons, titles, columns will be translated to the current language of the user.

### Buttons

For example, our **UI Integrations** export `CreateButton`, for redirecting the user to the create page of the resource.

While the button itself is imported from underlying UI package, Refine adds some capabilities to it:

- **Routing**: when the button is clicked, the user will be redirected to the create page of the resource.
- **Access Control**: if current user isn't authorized, this button will be disabled or hidden automatically.
- **Translation**: the button's text will be translated to the current language of the user.

### Auth Pages

Common authentication pages like `Login`, `Register`, `Forgot Password`, `Reset Password` are integrated with `AuthProvider` automatically.

<Tabs wrapContent={false}>

<TabItem value="Headless">

import { HeadlessAuth } from './auth-pages/headless';

<HeadlessAuth/>

</TabItem>

<TabItem value="Ant Design">

import { AntdAuth } from "./auth-pages/antd";

<AntdAuth />

</TabItem>

<TabItem value="Material UI">

import { MaterialUIAuth } from "./auth-pages/mui";

<MaterialUIAuth />

</TabItem>

<TabItem value="Chakra UI">

import { ChakraUIAuth } from "./auth-pages/chakra";

<ChakraUIAuth />

</TabItem>

<TabItem value="Mantine">

import { MantineAuth } from "./auth-pages/mantine";

<MantineAuth />

</TabItem>

</Tabs>

### UI Integration Hooks

UI Integration hooks use `@refinedev/core` hooks under the hood, making it easier to use them in your UI specific components.

One example is, `useTable` hook from `@refinedev/antd` package. This hook uses `@refinedev/core`'s `useTable` under the hood, but returns props compatible with `Ant Design`'s `Table` component. So you don't need to manually map the props.

## Meta Concept

`meta` is a special property that can be used to provide additional information to **providers** and **UI Integrations**.

There are 3 ways to populate meta, they all will be **merged into a single meta property** and will be available to **providers** and **UI integrations**.

<Tabs>
<TabItem value="Meta from resource">

```tsx title=App.tsx
import { Refine } from "@refinedev/core";

export const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "products",
          list: "/my-products",
          // highlight-start
          meta: {
            fromResource: "Hello from resource.meta",
          },
          // highlight-end
        },
      ]}
    >
      {/* ... */}
    </Refine>
  );
};
```

</TabItem>
<TabItem value="Meta from hook">

```tsx title=show.tsx
import { useShow } from "@refinedev/core";

export const ShowPage = () => {
  const {
    query: { data, isLoading },
    /* or use useOne */
  } = useShow({
    resource: "posts",
    id: "1",
    // highlight-start
    meta: {
      fromHook: "Hello from hook.meta",
    },
    // highlight-end
  });
};
```

</TabItem>
<TabItem value="Meta from URL">

Navigate to the following URL:

```
https://example.com/products?fromURL=Hello%20from%20URL
```

</TabItem>
</Tabs>

Given the above examples, meta fields from **3 different sources** will be available in the providers:

```tsx title=providers.tsx
import { AccessControlProvider, DataProvider } from "@refinedev/core";

export const myDataProvider = {
  getOne: async ({ meta }) => {
    console.log(meta.fromResource); // "Hello from resource.meta"
    console.log(meta.fromHook); // "Hello from hook.meta"
    console.log(meta.fromURL); // "Hello from URL"
  },
};

export const myAccessControlProvider = {
  can: async ({ meta }) => {
    console.log(meta.fromResource); // "Hello from resource.meta"
    console.log(meta.fromHook); // "Hello from hook.meta"
    console.log(meta.fromURL); // "Hello from URL"
  },
};
```

### Example Use Cases

- **Global filters**: pass a filter to your **data provider**.
- **Multi-tenancy**: make current tenant available id to providers.
- **Advanced Access Control**: configuration per resource.
- **Customize UI**: manage sidebar label and icon per resource.

These are some but not all examples of how you can use the `meta` property.

> See the [Refine Component](/core/docs/core/refine-component/) page for more information.

## State Management

Refine leverages **React Query** for data fetching and caching, which enhances the performance and user experience of applications. React Query provides efficient data synchronization between your server and UI, making it easier to handle background updates, cache management, and data invalidation.

#### Data Fetching, Cache Management and Deduplication

Refine uses structured keys to identify and cache server responses for queries and mutations. These keys also help optimize performance by reusing cached data when needed. Using composable structured keys also allows for automatic deduplication of queries, which means that if there are multiple calls for the same query, only one request will be made and shared across all subscribers.

By default, Refine has 5 minutes of cache time and 0 seconds of stale time for queries. This means that if a query is re-used in 5 minutes, it will be populated with cached data and in the meantime, it will be refetched in the background. If the query is not re-used in 5 minutes, it will be refetched immediately.

To learn more about data fetching and caching, see the [Data Fetching](/core/docs/guides-concepts/data-fetching/) guide.

#### Invalidation and Refetching

Structured key based state management of Refine also help with invalidation of related queries when a mutation occurs. For example, when a user creates a new record, Refine will automatically invalidate the related queries meaning that the data your users interact with is always fresh and consistent with the backend.

By default, invalidation is done for every related query of a mutation but refetching is done only for the queries that are currently in use, this means that if a user is not on the list page of a resource, the list query will not be refetched but will be invalidated so that when the user navigates to the list page, the data will be freshly fetched. Invalidation and refetching behavior can be customized by providing an `invalidates` property to the mutation or globally via [`<Refine />`](/core/docs/core/refine-component/) component.

To learn more about invalidation, see the [Invalidation section of Forms](/core/docs/guides-concepts/forms#invalidation-) guide.

#### Optimistic Updates and Rollbacks

It's almost crucial to provide instant feedback to your users when they perform a mutation. Refine allows you to do this by providing **optimistic updates**. When a mutation occurs, Refine will automatically update the related queries with the new data, this means that your users will see the changes instantly. If the mutation fails, Refine will automatically rollback the changes and re-fetch the related queries.

Refine offers 3 different mutation modes, **pessimistic**, **optimistic**, and **undoable**. Optimistic updates will be done for **optimistic** and **undoable** modes. Additionally, **undoable** mode will allow your users to undo the changes they made for a certain period of time by showing a notification.

By default,

- **Update** mutations will perform optimistic updates to the related list, many and detail queries of the target resource.
- **Create** mutations will perform optimistic updates to the related list and many queries of the target resource.
- **Delete** mutations will perform optimistic updates to the related list and many queries of the target resource.

You can customize the optimistic update behavior and mutation modes through `optimisticUpdateMap` and `mutationMode` properties of the hooks or globally via [`<Refine />`](/core/docs/core/refine-component/) component.

To learn more about optimistic updates, see the [Optimistic Updates section of Forms](/core/docs/guides-concepts/forms#optimistic-updates) guide.

#### Key Structure

Keys are used to identify and cache server responses for queries and mutations. Refine uses a structured key format which can be re-composed with the same parameters to get the same key. This allows Refine users to have full control over the cache and invalidation behavior of their applications. All the query cache and mutations can be tracked and managed by using these keys.

`@refinedev/core` exposes a `keys` method which can be used to generate keys for queries and mutations. If you are willing to perform some advanced operations on the cache, you can use this method to generate keys and use them to get the related query or mutation cache.

:::simple Structural Order of Keys

- Refine's query keys are structured to go from general to specific. At the outmost level, the key contains the information about the operation type (It can be `"auth"`, `"data"`, `"audit"` or `"access"`).

- If it's the `"data"` type, the next level contains the information about the data provider it uses.

- Then the next level contains the information about the resource it operates on.

- After the resource information, the next level contains the information about the operation type (It can be `"list"`, `"infinite"`, `"many"`, `"one"`).

- Then the next level contains the information about the operation parameters (It can be `"filters"`, `"sorters"`, `"pagination"`, `"id"` etc.) and also the content of the `meta` property.

- Keep in mind, Refine will treat `meta` properties as a part of the keys and differentiate the queries based on the `meta` properties.

:::

An example key for a list query of the `products` resource with `filters` would be generated as follows:

```tsx
import { useList, keys } from "@refinedev/core";

const Component = () => {
  const response = useList({
    resource: "products",
    filters: [
      {
        field: "title",
        operator: "contains",
        value: "test",
      },
    ],
  });

  // This key will be generated by useList and used to identify the query and cache the response.
  const generatedKey = keys()
    .data("default") // Name of the data provider
    .resource("products") // Identifier of the resource
    .action("list") // Type of the operation
    .params({
      filters: [{ field: "title", operator: "contains", value: "test" }],
    }) // Parameters of the operation
    .get();

  console.log(generatedKey);
  // ^ ["data", "default", "products", "list", { filters: [{ field: "title", operator: "contains", value: "test" }] }]
};
```

## Developer Experience

### CLI

Refine CLI allows you to interact with your Refine project and perform certain tasks such as creating a new resource, managing version updates, swizzling components, running your project (build, start, dev).

> See the [CLI](/core/docs/packages/list-of-packages/) page for more information.

### Devtools

**Refine Devtools** is designed to help you debug and develop your Refine apps. It will be a collection of features including monitoring queries and mutations, testing out inferencer generated codes, adding and updating Refine packages from the UI and more.

> See the [Devtools](https://github.com/refinedev/refine/tree/main/packages/devtools) package for more information.

### Inferencer

`@refinedev/inferencer` is a package that automatically generates basic boilerplate code for your application based on API responses, serving as a starting point to save time. However, it's not always reliable for all cases and isn't intended for production use.

> See the [Inferencer](/core/docs/packages/list-of-packages/) page for more information.

For example, the following code:

```tsx title="list.tsx"
import { AntdInferencer } from "@refinedev/inferencer/antd";
// or @refinedev/inferencer/mui, @refinedev/inferencer/chakra, @refinedev/inferencer/mantine, @refinedev/inferencer/headless

export const ProductList = () => {
  // Scaffolds List page.
  return <AntdInferencer />;
};

export const ProductShow = () => {
  // Scaffolds Show page.
  return <AntdInferencer />;
};

export const ProductEdit = () => {
  // Scaffolds Edit page with form.
  return <AntdInferencer />;
};

export const ProductCreate = () => {
  // Scaffolds Create page with form.
  return <AntdInferencer />;
};
```

An example of **List Page** scaffolded by inferencer looks like this;

```tsx title="generated-list.tsx"
import { List, ShowButton, useTable } from "@refinedev/antd";
import { BaseRecord } from "@refinedev/core";
import { Space, Table } from "antd";
import React from "react";

export const ProductList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
```
