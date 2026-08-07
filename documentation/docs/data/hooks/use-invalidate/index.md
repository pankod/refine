---
title: "useInvalidate Hook | Options, Patterns & Edge Cases | Refine v5"
display_title: "useInvalidate"
sidebar_label: "useInvalidate"
description: "Secure Use Invalidate in Refine v5. Learn best practices. Learn scale invalidation and state for custom APIs and scalable data flows."
source: /packages/core/src/hooks/invalidate
---

`useInvalidate` is a hook that can be used to invalidate the state of a particular `resource` or [`dataProvider`][data-provider] (with dataProviderName).

This hook will be called when a mutation hook is successful. For example, creating a `Posts` with the [useCreate](/core/docs/data/hooks/use-create/) hook will invalidate the `list` ([useList](/core/docs/data/hooks/use-list/)) and `many` ([useMany](/core/docs/data/hooks/use-many/)) state of the `Posts` resource.

:::simple Good to know

- This hook is used internally by Refine. In most cases, you won't need this hook, but we export it as it may be useful for some use-cases that may require customized invalidation.
- Refine uses [TanStack Query](https://tanstack.com/query/latest) to fetch and manage the state of the data. For more information about invalidation, please read the TanStack Query's [invalidation](https://tanstack.com/query/v5/docs/react/guides/query-invalidation) docs.

:::

## Basic Usage

```ts
import { useInvalidate } from "@refinedev/core";

const invalidate = useInvalidate();

// `invalidate` function is async and returns a promise. If you want to wait for the invalidation process to complete, you can await it.
invalidate({
  resource: "posts",
  invalidates: ["list"],
});
```

## Examples

To invalidate the `"list"` and `"many"` states of the Posts `resource`.

```ts
invalidate({
  resource: "posts",
  invalidates: ["list", "many"],
});
```

To invalidate the state of a Posts with an id of `1`.

```ts
invalidate({
  resource: "posts",
  invalidates: ["detail"],
  id: 1,
});
```

To invalidate the `"list"` and `"many"` states of the Posts `resource` of the [`dataProvider`][data-provider] named `"second-data-provider"`.

```ts
invalidate({
  resource: "posts",
  dataProviderName: "second-data-provider",
  invalidates: ["list"],
});
```

To invalidate all states of the [`dataProvider`][data-provider] named `"second-data-provider"`.

```ts
invalidate({
  dataProviderName: "second-data-provider",
  invalidates: ["all"],
});
```

To invalidate all states of the Posts.

```ts
invalidate({
  resource: "posts",
  invalidates: ["resourceAll"],
});
```

## Invalidation Parameters

### resource

A `resource` represents an entity in an endpoint in the API (e.g. https://api.fake-rest.refine.dev/posts). It is used to invalidate the state of a particular resource.

### id

The `id` to use when invalidating the `"detail"` state.

### dataProviderName

If there is more than one [`dataProvider`][data-provider], you should specify which one to use by passing the `dataProviderName` prop.

### invalidates <PropTag required />

The scope of the invalidation process. These scopes can be provided in an array.

- `"all"`: Invalidates all states of the all resources.
- `"resourceAll"`: Invalidates all states of the given `resource`.
- `"list"`: Invalidates the `"list"` state of the given `resource`.
- `"detail"`: Invalidates the `"detail"` state of the given `resource` and `id`.
- `"many"`: Invalidates the `"many"` state of the given `resource`.

### invalidationFilters and invalidationOptions

The filters and options applied to the invalidation process when picking which queries to invalidate. By default Refine applies some filters and options to fine-tune the invalidation process.

By default settings, all the targeted queries are invalidated and the active ones are triggered for a refetch. If there are any ongoing queries, they are kept as they are.

## API Reference

### Invalidation Parameters

| Property                         | Description                                                       | Type                                                                                                                    | Default                                  |
| -------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| invalidated <PropTag asterisk /> | The states you want to invalidate.                                | `all`, `resourceAll`, `list`, `many`, `detail`, `false`                                                                 |                                          |
| resource                         | Resource name for State invalidation.                             | `string`                                                                                                                |                                          |
| id                               | The `id` to use when invalidating the "detail" state.             | [`BaseKey`](/core/docs/core/interface-references#basekey)                                                               |                                          |
| dataProviderName                 | The name of the data provider whose state you want to invalidate. | `string`                                                                                                                | `default`                                |
| invalidationFilters              | The filters to use when picking queries to invalidate             | [`InvalidateQueryFilters`](https://tanstack.com/query/v5/docs/react/reference/QueryClient#queryclientinvalidatequeries) | `{ type: "all", refetchType: "active" }` |
| invalidationOptions              | The options to use in the invalidation process                    | [`InvalidateOptions`](https://tanstack.com/query/v5/docs/react/reference/QueryClient#queryclientinvalidatequeries)      | `{ cancelRefetch: false }`               |

[data-provider]: /core/docs/data/data-provider
