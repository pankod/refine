---
title: "useCan Hook | Authorization in Refine v5"
display_title: "useCan"
sidebar_label: "useCan"
description: "Learn to use the useCan hook in Refine v5. Learn how to secure RBAC, ABAC for secure enterprise React apps. Learn with code examples."
siderbar_label: useCan
---

`useCan` uses the [Access Control Provider's][access-control-provider] `can` function as the query function for [TanStack Query's][tanstack-query] [`useQuery`][use-query]. It takes the [parameters][can-params] that `can` takes. It can also be configured with [`queryOptions`][query-options] for `useQuery`. Returns the result of `useQuery`.

## Usage

```tsx
import { useCan } from "@refinedev/core";

const { data } = useCan({
  resource: "resource-you-ask-for-access",
  action: "action-type-on-resource",
  params: { foo: "optional-params" },
});
```

## Performance

As the number of points that check for access control in your app increases, the performance of your app may take a hit, especially if its access control involves remote endpoints. Caching the access control checks helps quite a bit, and since Refine uses [TanStack Query][tanstack-query], it can be easily done by confiruging the [`staleTime` and `cacheTime`][query-options] properties.

```ts
import { useCan } from "@refinedev/core";

// inside your component

const { data } = useCan({
    resource: "resource-you-ask-for-access",
    action: "action-type-on-resource",
    params: { foo: "optional-params" } },
    queryOptions: {
        staleTime: 5 * 60 * 1000, // 5 minutes
    }
});
```

## Properties

### resource <PropTag required />

Passes to [Access Control Provider's][access-control-provider] `can` function's `resource` parameter

```ts
useCan({
  resource: "resource-you-ask-for-access",
});
```

### action <PropTag required />

Passes to [Access Control Provider's][access-control-provider] `can` function's `action` parameter

```ts
useCan({
  action: "resource-you-ask-for-access",
});
```

### params

Passes to [Access Control Provider's][access-control-provider] `can` function's `params` parameter

```ts
useCan({
  params: { foo: "optional-params" },
});
```

### queryOptions

Query options for [TanStack Query's][tanstack-query] [`useQuery`][use-query].

```ts
useCan({
  queryOptions: {
    staleTime: 5 * 60 * 1000, // 5 minutes
  },
});
```

## Return values

`useCan` will return the Query result of [TanStack Query's][tanstack-query] [`useQuery`][use-query].

For example, if you want to check if the user can create a post based on the return value:

```tsx
const App = (
  <Refine
    // ...
    accessControlProvider={{
      can: async ({ resource, action }) => {
        if (resource === "post" && action === "create") {
          return {
            can: false,
            reason: "Unauthorized",
          };
        }

        return { can: true };
      },
    }}
  />
);

const MyComponent = () => {
  const { data: canCreatePost } = useCan({
    action: "create",
    resource: "post",
  });

  console.log(canCreatePost); // { can: false, reason: "Unauthorized" }
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/core/useCan"  />

### Type Parameters

| Property                                                        | Description                                                                            |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [CanResponse](/core/docs/core/interface-references#canresponse) | Result data of the query [`HttpError`](/core/docs/core/interface-references#httperror) |

### Return values

| Description                                                              | Type                                                             |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Result of the [TanStack Query's][tanstack-query] [`useQuery`][use-query] | [`QueryObserverResult<{ data: CanReturnType; }>`][query-options] |

[access-control-provider]: /core/docs/authorization/access-control-provider
[use-query]: https://tanstack.com/query/latest/docs/react/guides/queries
[tanstack-query]: https://tanstack.com/query/latest
[query-options]: https://tanstack.com/query/v5/docs/react/reference/useQuery
[can-params]: /core/docs/core/interface-references#canparams
