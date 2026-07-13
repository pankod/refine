---
id: useCan
title: useCan
siderbar_label: useCan
---

`useCan` uses the [Access Control Provider's][access-control-provider] `can` function as the query function for [TanStack Query's][tanstack-query] [`useQuery`][use-query]. It takes the [parameters][can-params] that `can` takes. It can also be configured with [`queryOptions`][query-options] for [`useQuery`][use-query]. Returns the result of [`useQuery`][use-query].

## Basic Usage

```tsx
import { useCan } from "@pankod/refine-core";

const { data } = useCan({
  resource: "resource-you-ask-for-access",
  action: "action-type-on-resource",
  params: { foo: "optional-params" },
});
```

## Performance

As the number of points that checks for access control in your app increases the performance of your app may take a hit especially if its access control involves remote endpoints. Caching the access control checks helps a great deal. Since **refine** uses [TanStack Query][tanstack-query] it can be easily done configuring [`staleTime` and `cacheTime`][query-options] properties.

```ts
import { useCan } from "@pankod/refine-core";

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

### `resource` <PropTag required />

Passes to [Access Control Provider's][access-control-provider] `can` function's `resource` parameter

```ts
useCan({
  resource: "resource-you-ask-for-access",
});
```

### `action` <PropTag required />

Passes to [Access Control Provider's][access-control-provider] `can` function's `action` parameter

```ts
useCan({
  action: "resource-you-ask-for-access",
});
```

### `params`

Passes to [Access Control Provider's][access-control-provider] `can` function's `params` parameter

```ts
useCan({
  params: { foo: "optional-params" },
});
```

### `queryOptions`

Query options for [TanStack Query's][tanstack-query] [`useQuery`][use-query].

```ts
useCan({
  queryOptions: {
    staleTime: 5 * 60 * 1000, // 5 minutes
  },
});
```

## Return values

Query result of [TanStack Query's][tanstack-query] [`useQuery`][use-query].

For example if you want to check if the user can create a post return value will be:

```tsx
<Refine
  accessControlProvider={{
    can: async ({ resource, action }) => {
      if (resource === "post" && action === "create") {
        return Promise.resolve({
          can: false,
          reason: "Unauthorized",
        });
      }

      return Promise.resolve({ can: true });
    },
  }}

  // ...
/>;

// inside your component
const { data: canCreatePost } = useCan({
  action: "create",
  resource: "post",
});

console.log(canCreatePost); // { can: false, reason: "Unauthorized" }
```

## API

### Properties

<PropsTable module="@pankod/refine-core/useCan"  />

### Type Parameters

| Property                                                                        | Desription                                                                                         |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [CanReturnType](/core/docs/3.xx.xx/api-reference/core/interfaces#canreturntype) | Result data of the query [`HttpError`](/core/docs/3.xx.xx/api-reference/core/interfaces#httperror) |

### Return values

| Description                                                              | Type                                                             |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Result of the [TanStack Query's][tanstack-query] [`useQuery`][use-query] | [`QueryObserverResult<{ data: CanReturnType; }>`][query-options] |

[access-control-provider]: /core/docs/3.xx.xx/api-reference/core/providers/accessControl-provider/
[use-query]: https://tanstack.com/query/latest/docs/react/guides/queries
[tanstack-query]: https://tanstack.com/query/latest
[query-options]: https://tanstack.com/query/v4/docs/react/reference/useQuery
[can-params]: /core/docs/3.xx.xx/api-reference/core/interfaceReferences/#canparams
