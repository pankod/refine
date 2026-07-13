---
id: useInvalidate
title: useInvalidate
source: /packages/core/src/hooks/invalidate
---

> **refine** uses [TanStack Query](https://tanstack.com/query/latest) to fetch and manage the state of the data. More information about invalidation please read the TanStack Query's [invalidation](https://tanstack.com/query/v4/docs/react/guides/query-invalidation) docs.

<br/>

`useInvalidate` can be used to invalidate the state of a particular `resource` or [`dataProvider`][data-provider] (with dataProviderName).

This hook is used on mutation hooks. when a mutation is success, this hook will called. For example, creating a `Posts` with [useCreate](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCreate/) hook will invalidate the `list` ([useList](/core/docs/3.xx.xx/api-reference/core/hooks/data/useList/)) and `many` ([useMany](/core/docs/3.xx.xx/api-reference/core/hooks/data/useMany/)) state of the `Posts` resource.

:::info-tip

The hook is used internally by **refine**. In most of the cases, you won't need this hook, but we export it as it may be useful for some use-cases that may require customized invalidation.

:::

## Basic Usage

```ts
import { useInvalidate } from "@pankod/refine-core";

const invalidate = useInvalidate();

invalidate({
  resource: "posts",
  invalidates: ["list"],
});
```

## Examples

- To invalidate the `"list"` and `"many"` states of the Posts `resource`.

```ts
invalidate({
  resource: "posts",
  invalidates: ["list", "many"],
});
```

- To invalidate the state of a Posts with an id of `1`.

```ts
invalidate({
  resource: "posts",
  invalidates: ["detail"],
  id: 1,
});
```

- To invalidate the `"list"` and `"many"` states of the Posts `resource` of the [`dataProvider`][data-provider] named `"second-data-provider"`.

```ts
invalidate({
  resource: "posts",
  dataProviderName: "second-data-provider",
  invalidates: ["list"],
});
```

- To invalidate all states of the [`dataProvider`][data-provider] named `"second-data-provider"`.

```ts
invalidate({
  dataProviderName: "second-data-provider",
  invalidates: ["all"],
});
```

- To invalidate all states of the Posts.

```ts
invalidate({
  resource: "posts",
  invalidates: ["resourceAll"],
});
```

## Invalidation Parameters

### `resource`

A resource represents an entity in an endpoint in the API (e.g. https://api.fake-rest.refine.dev/posts). It is used to invalidate the state of a particular resource.

### `id`

The `id` to use when invalidating the `"detail"` state.

### `dataProviderName`

If there is more than one [`dataProvider`][data-provider], you should use the `dataProviderName` that you will use.

### `invalidates` <PropTag required />

> Type: `Array<"all", "resourceAll", "list", "many", "detail", "false">` | `false`

The states you want to invalidate. You can use the following values:

- `"all"`: Invalidates all states of the all resources.
- `"resourceAll"`: Invalidates all states of the given `resource`.
- `"list"`: Invalidates the `"list"` state of the given `resource`.
- `"detail"`: Invalidates the `"detail"` state of the given `resource` and `id`.
- `"many"`: Invalidates the `"many"` state of the given `resource`.

## API Reference

### Invalidation Parameters

| Property                                                                                              | Description                                                       | Type                                                                  | Default   |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------- | --------- |
| <div className="required-block"><div>invalidates</div> <div className="required">Required</div></div> | The states you want to invalidate.                                | `all`, `resourceAll`, `list`, `many`, `detail`, `false`               |           |
| resource                                                                                              | Resource name for State invalidation.                             | `string`                                                              |           |
| id                                                                                                    | The `id` to use when invalidating the "detail" state.             | [`BaseKey`](/core/docs/3.xx.xx/api-reference/core/interfaces#basekey) |           |
| dataProviderName                                                                                      | The name of the data provider whose state you want to invalidate. | `string`                                                              | `default` |

[data-provider]: /core/docs/3.xx.xx/api-reference/core/providers/data-provider/
