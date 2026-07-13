---
title: "Access Control Provider Guide | Best Practices in Refine v5"
display_title: "Access Control Provider"
sidebar_label: "Access Control Provider"
description: "Build Access Control Provider in Refine v5. Learn the key steps. Learn how to secure RBAC, ABAC for secure enterprise React apps. Hands-on examples included."
---

Access control is a broad topic with lots of advanced solutions that provide different sets of features.

Refine provides an agnostic API via the `accessControlProvider` to manage access control throughout your app, which allows you to integrate different methods, such as `RBAC`, `ABAC`, `ACL`, etc., and libraries, such as [Casbin](https://casbin.org/), [CASL](https://casl.js.org/v5/en/), [Cerbos](https://cerbos.dev/) and [AccessControl.js](https://onury.io/accesscontrol/).

To check if a desired access will be granted, the `accessControlProvider` should at least have an asynchronous method named `can` with the following interface:

:::simple Interface References

- [`CanParams`](/core/docs/core/interface-references#canparams): Arguments for the `can` method.
- [`CanResponse`](/core/docs/core/interface-references#canresponse): Return type of the `can` method.

:::

```ts
export interface IAccessControlContext {
  can?: ({ resource, action, params }: CanParams) => Promise<CanResponse>;
  options?: {
    buttons?: {
      enableAccessControl?: boolean;
      hideIfUnauthorized?: boolean;
    };
    queryOptions?: UseQueryOptions<CanReturnType>;
  };
}

const accessControlProvider: IAccessControlContext = {
  can: async ({
    resource,
    action,
    params,
  }: CanParams): Promise<CanResponse> => {
    return { can: true };
  },
  options: {
    buttons: {
      enableAccessControl: true,
      hideIfUnauthorized: false,
    },
    queryOptions: {
      // ... default global query options
    },
  },
};
```

It's possible to globally configure buttons' behavior by passing `options` to the `accessControlProvider`.
You can still change the behavior of the buttons independently; however, if no configuration is found, buttons will fallback to configuration defined in `options.buttons`.
By default, `enableAccessControl` is **true**, `hideIfUnauthorized` is **false**, and `queryOptions` is **undefined**.

## Usage

```tsx
const App: React.FC = () => {
  return (
    <Refine
      // other providers and props
      accessControlProvider={{
        can: async ({ resource, action, params }) => {
          if (resource === "posts" && action === "edit") {
            return {
              can: false,
              reason: "Unauthorized",
            };
          }

          return { can: true };
        },
        options: {
          buttons: {
            enableAccessControl: true,
            hideIfUnauthorized: false,
          },
          queryOptions: {
            // ... default global query options
          },
        },
      }}
    >
      {/* your app */}
    </Refine>
  );
};
```

:::caution

Providing `accessControlProvider` to the `<Refine />` component **won't enforce** access control by itself; you will need to wrap protected routes with the `<CanAccess />` component.

Refer to one of the following documentations, based on your preferred router:

- [React Router Access Control](/core/docs/packages/list-of-packages#usage-with-access-control-providers)
- [NextJS Router Access Control](/core/docs/packages/list-of-packages#access-control)
- [Remix Router Access Control](/core/docs/packages/list-of-packages#access-control)

:::

### Meta Access

In the `can` method, you'll have access to the `resource` object you passed to the `<Refine/>` component.

In the example below, the `can` function receives the `resource`([ResourceProps][iresourceitem]) object you pass to the `<Refine/>` component, which allows you to use Attribute Based Access Control (ABAC), which allows you to grant permissions based on the value of a field in the resource object.

```tsx
export const accessControlProvider = {
  can: async ({ resource, action, params }) => {
    const resourceName = params?.resource?.name;
    const anyUsefulMeta = params?.resource?.meta?.yourUsefulMeta;

    if (
      resourceName === "posts" &&
      anyUsefulMeta === true &&
      action === "edit"
    ) {
      return {
        can: false,
        reason: "Unauthorized",
      };
    }
  },
};
```

### Using `reason` property

If your response from the `can` method has a `reason` property, it will be shown at the tooltip of the buttons if they are disabled.

## Hooks and Components

Refine provides a hook and a component to use the `can` method from the `accessControlProvider`.

### useCan

`useCan` uses the `can` for the query function for **react-query**'s `useQuery`. It takes the parameters that `can` takes, can be configured with `queryOptions` of `useQuery` and returns the result of `useQuery`.

```tsx
const { data } = useCan({
  resource: "resource-you-ask-for-access",
  action: "action-type-on-resource",
  params: { foo: "optional-params" },
  queryOptions: {
    cacheTime: 5000,
    // ... other query options
  },
});
```

```ts
const useCan: ({
    action,
    resource,
    params,
    queryOptions,
}: CanParams) => UseQueryResult<CanReturnType*>
```

### `<CanAccess />`

`<CanAccess />` is a wrapper component that uses `useCan` to check for access control. It takes the parameters that `can` method takes and also a `fallback`. If access control returns true, it renders its children; otherwise, it renders `fallback`, if it was provided.

```tsx
<CanAccess
  resource="posts"
  action="edit"
  params={{ id: 1 }}
  fallback={<CustomFallback />}
  queryOptions={{ cacheTime: 25000 }}
>
  <YourComponent />
</CanAccess>
```

## Performance

As the number of points that check for access control in your app increases, the performance of your app may take a hit, especially if its access control involves remote endpoints. Caching the access control checks helps quite a lot, which can be done easily by configuring the [`staleTime` and `cacheTime`](https://react-query.tanstack.com/reference/useQuery) properties since Refine uses react-query.

```ts
// inside your component

const { data } = useCan({
  resource: "resource-you-ask-for-access",
  action: "action-type-on-resource",
  params: { foo: "optional-params" },
  queryOptions: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    // ... other query options
  },
});
```

:::note

By default, Refine uses 5 minutes for `cacheTime` and 0 minutes for `staleTime` for its own access control points.

:::

## List of Default Access Control Points

Here is a list of components and pages Refine checks for access control:

### Sider

Sider is integrated, which means that unaccessible resources won't appear in the sider menu.

Menu items will check access control with `{ resource, action: "list" }`. For example, if your app has a resource called `posts`, it will be checked with `{ resource: "posts", action: "list" }`.

### Buttons

These buttons will be checked for access control.

Let's say they are rendered where `resource` is `posts` and `id` is `1` where applicable. The `can` function will receive the `resource`([ResourceProps][iresourceitem]) object you passed to the `<Refine/>` component, which allows you to use Attribute Based Access Control (ABAC), which allows you to grant permissions based on the value of a field in the resource object.

These buttons will be disabled if access control returns `{ can: false }`

<!-- prettier-ignore-start -->
```tsx title=my-page.tsx

import { EditButton, ShowButton, ListButton, CreateButton, CloneButton, DeleteButton } from "@refinedev/antd"; // or @refinedev/mui, @refinedev/chakra-ui, @refinedev/mantine

export const MyPage = () => {
  return (
    <>
      My Page
      {/* These buttons will be disabled if access control returns { can: false } */}
      <ListButton resource="posts" /> {/* { resource: "posts", action: "list", params: { *resource } } */}
      <CreateButton resource="posts" /> {/* { resource: "posts", action: "create", params: { *resource } } */}
      <CloneButton resource="posts" recordItemId={1} /> {/* { resource: "posts", action: "create", params: { id: 1, *resource } } */}
      <EditButton resource="posts" recordItemId={1} /> {/* { resource: "posts", action: "edit", params: { id: 1, *resource } } */}
      <DeleteButton resource="posts" recordItemId={1} /> {/* { resource: "posts, action: "delete", params: { id: 1, *resource } } */}
      <ShowButton resource="posts" recordItemId={1} /> {/* { resource: "posts", action: "show", params: { id: 1, *resource } } */}
    </>
  );
};

```
<!-- prettier-ignore-end -->

:::simple
If you want to hide buttons instead of disabling them, you can pass `hideIfUnauthorized: true` to the `options` of the `accessControlProvider`
:::

## Examples

This example is for **Casbin** access control provider. You can check our other access control provider, [**Cerbos**](/core/docs/examples/access-control/cerbos/) as well.
<CodeSandboxExample path="access-control-casbin" />

[iresourceitem]: /core/docs/core/interface-references#resourceprops
[basekey]: /core/docs/core/interface-references#basekey
[canparams]: /core/docs/core/interface-references#canparams
[canresponse]: /core/docs/core/interface-references#canresponse
