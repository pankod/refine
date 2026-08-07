---
title: "Refine v4 FAQ | Frequently Asked Questions"
display_title: "Frequently Asked Questions"
description: "Get answers to common questions about Refine v4. Find solutions for typical challenges in React development and framework usage."
sidebar_label: FAQ
---

## How can I change the form data before submitting it to the API?

You may need to modify the form data before it is sent to the API for various reasons. For example, you may want to add a field to the form data or change the value of a field before submitting it to the API. This can be achieved easily by Refine's `useForm` implementations.

Check out the [Modifying Data Before Submission section in Forms guide](/core/docs/guides-concepts/forms/#modifying-data-before-submission) to learn how to achieve this.

## How can I refetch data?

Refine automatically invalidates the affected resources after mutations. However, in some cases you may want to refetch manually.

<Tabs
defaultValue="refetch"
values={[
{label: 'React Query Refetch', value: 'refetch'},
{label: 'useInvalidate Hook', value: 'useinvalidate'},
]}>
<TabItem value="refetch">

```tsx
import { useTable, useForm, useShow } from "@refinedev/core";

// All "data" related hooks provided by Refine can use query' refetch function
const { tableQuery: { refetch } } = useTable();
const { tableQueryResult: { refetch } } = useTable();
const { query: { refetch } } = useForm();
...
...
const { query: { refetch } } = useShow();
...
...
```

</TabItem>
<TabItem value="useinvalidate">

```tsx
import { useInvalidate } from "@refinedev/core";

const invalidate = useInvalidate();

// To invalidate the list and many states of the Posts resource
invalidate({
  resource: "posts",
  invalidates: ["list", "many"],
});

// To invalidate the state of a Posts with an id of 1
invalidate({
  resource: "posts",
  invalidates: ["detail"],
  id: 1,
});

// To invalidate the list and many states of the Posts resource of the dataProvider named "second-data-provider"
invalidate({
  resource: "posts",
  dataProviderName: "second-data-provider",
  invalidates: ["list"],
});

// To invalidate all states of dataprovider named "second-data-provider"
invalidate({
  dataProviderName: "second-data-provider",
  invalidates: ["all"],
});
```

[Refer to the Refine useInvalidate hook documentation for more information. →](/core/docs/data/hooks/use-invalidate)

</TabItem>
</Tabs>

## How can I request an API with nested route?

Refine's way of doing this is with the `resource` property on all data hooks. You can think of the `resource` property as the URL.

For example, If you want to make a request of the URL `/user/1/posts`.

```tsx
import { useTable, useOne } from "@refinedev/core";

useTable({
  resource: "/users/1/posts",
});
```

## How can I ensure a query is only run after a certain variable is available and not on load?

Note that `data` related hooks (`useMany`, `useOne`, etc.) can also accept all `useQuery` options, which allows you to implement dependent queries whereby a query is only run after a certain data is available. This is particularly useful if you want `useMany` to only run after a certain data is available and not on load.

[Refer to react-query docs on **dependent queries** for more information → ](https://react-query.tanstack.com/guides/dependent-queries)

- Suppose you want this query to run after `categoryIds` is fetched by a preceding query, you can set `enabled` to `categoryIds.length > 0`. This will ensure that `useMany` is only run after `categoryIds` is fetched.

```tsx
useMany({
  resource: "categories",
  ids: categoryIds,
  // highlight-next-line
  queryOptions: { enabled: categoryIds.length > 0 },
});
```

## Can I work with JavaScript?

Although Refine is written in TypeScript and it is recommended to use TypeScript, you can also work with Javascript without any problems. Check out the [Refine with Javascript example →](https://github.com/refinedev/refine/tree/main/examples/with-javascript)

## How I can override specific function of Data Providers?

In some cases, you may need to override functions of Refine data providers. The simplest way to do this is to use the [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

Below code sample, overrides the `update` function of the [`@refinedev/simple-rest`](https://github.com/refinedev/refine/tree/main/packages/simple-rest). You can apply custom logic to the data provider methods or handle a custom `meta` property for your needs.

```tsx
import dataProvider from "@refinedev/simple-rest";

const simpleRestProvider = dataProvider("API_URL");
const myDataProvider = {
  ...simpleRestProvider,
  update: async ({ resource, id, variables, meta }) => {
    console.log("Overriding the update function");

    // You can either send a request from scratch or use the original function
    return await simpleRestProvider.update({ resource, id, variables, meta });
  },
};

<Refine dataProvider={myDataProvider} />;
```

## Why are API calls triggering twice?

This is the expected behavior if you use [`<React.StrictMode>`][https://react.dev/reference/react/StrictMode]. In this mode, React will render the components twice in **development mode** to identify unsafe life cycles, unexpected side effects, and legacy or deprecated APIs. It's used for highlighting possible problems. You can also check out the related issue on the [TanStack Query repository](https://github.com/TanStack/query/issues/3633).

## How can I add an item to the Sider component?

`<Sider />` components use the `resources` property of the `<Refine>` component to render the navigation links. If a resource has a `list` property, it will be rendered as a navigation link in the sider. To add a custom item to the sider, you can use three different approaches:

#### Using Resource Definitions

The first and simplest way is to use the `resources` property on the `<Refine>` component. The `<Sider>` component shows the resources whose `list` property is set. So, you can have an extra navigation link by adding a resource with the `list` attribute.

```tsx
import { Refine } from "@refinedev/core";

<Refine
    ...
    resources={[
        {
            name: "dashboard",
            list: "/",
            meta: {
                label: "Dashboard",
                icon: "🏠",
            },
        },
    ]}
/>;
```

#### Using `render` property of `<Sider>` component

The second way is to use the `render` property of the `<Sider>` component. The `render` property is a function that receives an object with the `items` and `logout` properties. The `items` property is the list of navigation items and the `logout` property is the logout button.

<Tabs
defaultValue="antd"
values={[
{label: 'Ant Design', value: 'antd'},
{label: 'Material UI', value: 'mui'},
{label: 'Mantine', value: 'mantine'},
{label: 'Chakra UI', value: 'chakra-ui'},
]}>
<TabItem value="antd">

```tsx
import { Layout, Sider } from "@refinedev/antd";

const CustomSider = () => {
  return (
    <Sider
      render={({ items, logout }) => {
        return (
          <>
            <a href="https://refine.dev/">👋 Navigation Link</a>
            {items}
            {logout}
          </>
        );
      }}
    />
  );
};

const CustomLayout = () => {
  return <Layout Sider={CustomSider}>...</Layout>;
};
```

</TabItem>
<TabItem value="mui">

```tsx
import { Layout, Sider } from "@refinedev/mui";

const CustomSider = () => {
  return (
    <Sider
      render={({ items, logout }) => {
        return (
          <>
            <a href="https://refine.dev/">👋 Navigation Link</a>
            {items}
            {logout}
          </>
        );
      }}
    />
  );
};

const CustomLayout = () => {
  return <Layout Sider={CustomSider}>...</Layout>;
};
```

</TabItem>
<TabItem value="mantine">

```tsx
import { Layout, Sider } from "@refinedev/mantine";

const CustomSider = () => {
  return (
    <Sider
      render={({ items, logout }) => {
        return (
          <>
            <a href="https://refine.dev/">👋 Navigation Link</a>
            {items}
            {logout}
          </>
        );
      }}
    />
  );
};

const CustomLayout = () => {
  return <Layout Sider={CustomSider}>...</Layout>;
};
```

</TabItem>
<TabItem value="chakra-ui">

```tsx
import { Layout, Sider } from "@refinedev/chakra-ui";

const CustomSider = () => {
  return (
    <Sider
      render={({ items, logout }) => {
        return (
          <>
            <a href="https://refine.dev/">👋 Navigation Link</a>
            {items}
            {logout}
          </>
        );
      }}
    />
  );
};

const CustomLayout = () => {
  return <Layout Sider={CustomSider}>...</Layout>;
};
```

</TabItem>
</Tabs>

#### Using `swizzle` command

The third way is to use the `swizzle` command.

You can use the command to copy the default `Sider` component to your project. This will allow you to customize the sider as you want.

[Refer to the swizzle section of Development guide. &#8594](/core/docs/guides-concepts/development/#using-swizzle)

## How to hide items from the Sider component?

Refine's [`useMenu`](/core/docs/core/hooks/utilities/use-menu/) hook and `<Sider />` components use the `resources` property of the `<Refine>` component to render the navigation links. If a resource has a `list` property, it will be rendered as a navigation link in the sider. To hide a resource from the menu, you can use the `meta.hide` property of the resource.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";

const App = () => (
  <Refine
    ...
    resources={[
      {
        name: "posts",
        list: "/posts",
        meta: {
          label: "Posts",
          icon: "📝",
        },
      },
      {
        name: "users",
        list: "/users",
        meta: {
          // Users resource will be hidden from the menu but will be accessible via the URL
          hide: true,
        },
      },
    ]}
  />
);
```

## How can I remove GitHub Banner?

To remove the GitHub Banner, you need to find and remove the `<GitHubBanner />` component from your React application. The specific location of this component may vary depending on the React platform you are using.

Here are the locations where you can find and remove the `<GitHubBanner />` component based on different React platforms:

- Vite: `src/App.tsx` - [See an example](https://github.com/refinedev/refine/blob/main/examples/auth-antd/src/App.tsx#L161)
- Next.js: `src/app/layout.tsx` - [See an example](https://github.com/refinedev/refine/blob/main/examples/with-nextjs/src/app/layout.tsx#L37)
- Remix: `app/root.tsx` - [See an example](https://github.com/refinedev/refine/blob/main/examples/with-remix-antd/app/root.tsx#L37)

## How to solve "Module 'X' has no exported member 'Y'" error?

The error message "Module 'X' has no exported member 'Y'" typically occurs when using `pnpm` due to its cache system. We are aware of this issue and are actively working on resolving it by updating our peer dependencies with each version release. However, this is still a work in progress. In the meantime, you can resolve this error by using the `npm i <module-name>@latest` command.

Here are a couple of examples of reported errors and their corresponding fix:

1. Error: "Module '@refinedev/mantine' has no exported member 'HamburgerMenu'"

   - Solution: Run `npm i @refinedev/mantine@latest` to install the latest version of the `@refinedev/mantine` module.

2. Error: "Module '@refinedev/antd' has no exported member 'ThemedLayoutV2'"
   - Solution: Execute `npm i @refinedev/antd@latest` to install the latest version of the `@refinedev/antd` module.

By following these steps and updating to the latest module versions, you should be able to resolve the "not exported" error.

## How to use React Query DevTools with Refine?

Until `@refinedev/core`'s version `4.28.2`, Refine had the `@tanstack/react-query-devtools` package available by default. However, this package has been removed from the core package and is no longer available by default.

We're recommending [`@refinedev/devtools`](/core/docs/guides-concepts/development/#using-devtools) as an alternative to `@tanstack/react-query-devtools`. `@refinedev/devtools` is tailored for Refine and provides more detailed information about the queries and mutations with its monitoring panel and much more.

## How do invalidation works in queries?

Refine invalidates and refetches the related queries after a successful mutation. To have a better understanding of how invalidation works in Refine, check out the [State Management section of General Concepts guide.](/core/docs/guides-concepts/general-concepts/#state-management)

## How to handle filters and sorters when using client side pagination?

When you're implementing client side pagination with the `pagination.mode` set to "client," you might run into issues when applying client side filtering and sorting. This is due to the fact that client side filtering and sorting are applied to the sliced data, not the whole data. To ensure that the client side filtering and sorting are applied to the whole data, you need to use the `pagination.mode: "off"` prop.

## How to handle server side validation errors?

When working with forms and mutations, using only client side validation might not be enough. You may also need to validate the data on the server side. Refine provides an interface [`HttpError`](/core/docs/core/interface-references/#httperror) to propagate the server side validation errors to the form values. You can use this interface to handle server side validation errors.

To learn more about server side validation and see an example, check out the [Server Side Validation section of the Forms guide.](/core/docs/guides-concepts/forms/#server-side-validation-)

## How to work offline in local environment?

When working without a network connection, `@tanstack/query` prevents requests from being made until a successful connection is established. You might feel frustrated and wonder,

> Why can't I work with my own data? Must I use an internet connection to run this library?

Don't worry; according to the `@tanstack/query` [documentation](https://tanstack.com/query/latest/docs/react/guides/network-mode), you can simply add the `networkMode: "always"` option to the `reactQuery` props on the `<Refine/>` component.

```javascript
<Refine
  // ...
  options: {
    // ...
    reactQuery: {
      clientConfig: {
        defaultOptions: {
          queries: { // For fetching data
            networkMode: "always", // Apply this to mutations as well, as shown below
          },
          mutations: { // For posting data
            networkMode: "always" // It defaults to "online," preventing requests when there is no connection
          },
        },
      },
    },
  }
/>
```

## Why are there network errors showing in the console?

When working with Refine in development environment you may receive network errors in the console. Browsers will log network errors regardless of the status of the Promise. This is a common behavior in development environments and does not affect the functionality of the application.

Still, there two common errors that you may encounter when working with Refine in development environment but you can safely ignore them:

- `401 (Unauthorized) from :5001/api/.auth/sessions/whoami` - This error is related with the Refine's Devtools and logged if there are no active authentication sessions in Devtools. You can get rid of this error by logging in to the Devtools.

- Numerous `404 (Not Found)` errors when using Refine's Inferencer - These errors are related with the Inferencer component since the main logic behind Inferencer components are to infer the data structure from the API. When trying to infer the data structure, Inferencer may send requests to the API to determine relationships between resources. You can safely ignore these errors as they are not affecting the functionality of the application. To learn more about the functionality of Inferencer, check out the [How the fields are inferred? section in Inferencer docs](/core/docs/packages/inferencer/#how-the-fields-are-inferred).

If you have any other network errors thrown by Refine and have no relation with the above mentioned errors or not caused by your project's logic, please reach out to us via [GitHub Issues](https://github.com/refinedev/refine/issues) or our [Discord Community](https://discord.gg/refine).

[use-form-core]: /core/docs/core/hooks/use-form/
[use-form-react-hook-form]: /core/docs/packages/list-of-packages
[use-form-antd]: /core/docs/ui-integrations/ant-design/hooks/use-form
[edit-mui]: /core/docs/packages/list-of-packages
