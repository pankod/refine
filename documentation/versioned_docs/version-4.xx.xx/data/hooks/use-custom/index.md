---
title: "useCustom Hook | Refine v4"
display_title: "useCustom"
sidebar_label: "useCustom"
description: "Learn how to fetch data from custom endpoints in Refine v4 using useCustom. Ideal for external APIs and flexible query scenarios."
source: packages/core/src/data/hooks/useCustom.ts
---

`useCustom` is used to send custom query requests using the Tanstack Query advantages. It is an extended version of TanStack Query's [`useQuery`](https://tanstack.com/query/v4/docs/react/reference/useQuery) and not only supports all features of the mutation but also adds some extra features.

It uses the `custom` method as the **query function** from the [`dataProvider`](/core/docs/data/data-provider) which is passed to `<Refine>`.

:::caution Use Cases

`useCustom` should **not** be used when creating, updating, or deleting a resource. Following hooks should be used for these instead: [useCreate](/core/docs/data/hooks/use-create), [useUpdate](/core/docs/data/hooks/use-update) or [useDelete](/core/docs/data/hooks/use-delete)

This is because `useCustom`, unlike other data hooks, does not [invalidate queries](https://tanstack.com/query/latest/docs/react/guides/query-invalidation) and therefore will not update the application state either.

If you need to customize the mutation request, use the [useCustomMutation](/core/docs/data/hooks/use-custom-mutation) hook instead.

:::

## Basic Usage

The `useCustom` hook expects the `url` and `method` properties, which will be passed to the `custom` method from the `dataProvider` as parameters.

When properties are changed, the `useCustom` hook will trigger a new request.

```tsx
import { useCustom, useApiUrl } from "@refinedev/core";

interface PostUniqueCheckResponse {
  isAvailable: boolean;
}

const apiUrl = useApiUrl();

const { data, isLoading } = useCustom<PostUniqueCheckResponse>({
  url: `${apiUrl}/posts-unique-check`,
  method: "get",
  config: {
    headers: {
      "x-custom-header": "foo-bar",
    },
    query: {
      title: "Foo bar",
    },
  },
});
```

## Properties

### url <PropTag required />

This prop will be passed to the `custom` method from the `dataProvider` as a parameter. It is usually used to specify the endpoint of the request.

```tsx
useCustom({
  url: "www.example.com/api/get-products",
});
```

### method <PropTag required />

It will be passed to the `custom` method from the `dataProvider` as a parameter. It is usually used to specify the HTTP method of the request.

```tsx
useCustom({
  method: "get",
});
```

### config.headers

It will be passed to the `custom` method from the `dataProvider` as a parameter. It can be used to specify the headers of the request.

```tsx
useCustom({
  config: {
    headers: {
      "x-custom-header": "foo-bar",
    },
  },
});
```

### config.query

It will be passed to the `custom` method from the `dataProvider` as a parameter. It can be used to specify the query parameters of the request.

```tsx
useCustom({
  config: {
    query: {
      title: "Foo bar",
    },
  },
});
```

### config.payload

It will be passed to the `custom` method from the `dataProvider` as a parameter. It can be used to specify the payload of the request.

```tsx
useCustom({
  config: {
    payload: {
      title: "Foo bar",
    },
  },
});
```

### config.sorters

It will be passed to the `custom` method from the `dataProvider` as a parameter. It can be used to send the sort query parameters of the request.

```tsx
useCustom({
  config: {
    sorters: [
      {
        field: "title",
        order: "asc",
      },
    ],
  },
});
```

### config.filters

It will be passed to the `custom` method from the `dataProvider` as a parameter. It can be used to send the filter query parameters of the request.

```tsx
useCustom({
  config: {
    filters: [
      {
        field: "title",
        operator: "contains",
        value: "Foo",
      },
    ],
  },
});
```

### ~~`config.sort`~~ <PropTag deprecated />

Use `config.sorters` instead.

### queryOptions

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

> For more information, refer to the [`useQuery` documentation &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

```tsx
useCustom({
  queryOptions: {
    retry: 3,
    enabled: false,
  },
});
```

### meta

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

- Customizing the data provider methods for specific use cases.
- Generating GraphQL queries using plain JavaScript Objects (JSON).

In the following example, `meta` is passed to the `custom` method from the `dataProvider` as a parameter:

```tsx
useCustom({
  meta: {
    foo: "bar",
  },
});

const myDataProvider = {
  //...
  custom: async ({
    url,
    method,
    sort,
    filters,
    payload,
    query,
    headers,
    meta,
  }) => {
    const foo = meta?.foo;

    console.log(foo); // "bar"

    //...
  },
  //...
};
```

> For more information, refer to the [`meta` section of the General Concepts documentation&#8594](/core/docs/guides-concepts/general-concepts/#meta-concept)

### dataProviderName

This prop allows you to specify which `dataProvider` if you have more than one. Just pass it like in the example:

```tsx
useCustom({
  dataProviderName: "second-data-provider",
});
```

### successNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider) is required for this prop to work.

This prop allows you to customize the success notification that shows up when the data is fetched successfully and `useCustom` calls the `open` function from `NotificationProvider`:

```tsx
useCustom({
  successNotification: (data, values) => {
    return {
      message: `${data.title} Successfully fetched.`,
      description: "Success with no errors",
      type: "success",
    };
  },
});
```

### errorNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider) is required for this prop to work.

This prop allows you to customize the error notification that shows up when the data fetching fails and the `useCustom` calls the `open` function from `NotificationProvider`

```tsx
useCustom({
  errorNotification: (data, values) => {
    return {
      message: `Something went wrong when getting ${data.id}`,
      description: "Error",
      type: "error",
    };
  },
});
```

### overtimeOptions

If you want loading overtime for the request, you can pass the `overtimeOptions` prop to the this hook. It is useful when you want to show a loading indicator when the request takes too long.
`interval` is the time interval in milliseconds. `onInterval` is the function that will be called on each interval.

Return `overtime` object from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useCustom({
  //...
  overtimeOptions: {
    interval: 1000,
    onInterval(elapsedInterval) {
      console.log(elapsedInterval);
    },
  },
});

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...

// You can use it like this:
{
  elapsedTime >= 4000 && <div>this takes a bit longer than expected</div>;
}
```

## FAQ

### How to invalidate the custom query?

To invalidate a query, you can use the `invalidateQueries` method from the `useQueryClient` hook provided by the `@tanstack/react-query` library:

```tsx
import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

queryClient.invalidateQueries(["custom-key"]);
```

Note that you'll need to know the query key to invalidate the query. If you don't know the query key, you can use the `queryOptions` property of the `useCustom` hook:

```tsx
import { useCustom } from "@refinedev/core";

useCustom({
  queryOptions: {
    queryKey: ["custom-key"],
  },
});
```

## API Reference

### Properties

<PropsTable module="@refinedev/core/useCustom" />

### Type Parameters

| Property     | Description                                                                                                                                                         | Type                       | Default                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError       | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TQuery       | Values for query params.                                                                                                                                            | `TQuery`                   | unknown                    |
| TPayload     | Values for params.                                                                                                                                                  | `TPayload`                 | unknown                    |
| TData        | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

### Return value

| Description                             | Type                                                                                                                |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Result of the TanStack Query's useQuery | [`QueryObserverResult<CustomResponse<TData>, TError>`](https://tanstack.com/query/v4/docs/react/reference/useQuery) |
| overtime                                | `{ elapsedTime?: number }`                                                                                          |

[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
