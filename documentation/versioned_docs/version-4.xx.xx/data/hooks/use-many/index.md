---
title: "useMany Hook | Refine v4"
display_title: "useMany"
sidebar_label: "useMany"
description: "Learn how to fetch multiple records by their IDs in Refine v4 and handle relational data efficiently using useMany."
siderbar_label: useMany
source: packages/core/src/data/hooks/useMany.ts
---

import BasicUsageLivePreview from "./\_basic-usage-live-preview.md";

`useMany` is an extended version of TanStack Query's [`useQuery`](https://tanstack.com/query/v4/docs/react/reference/useQuery) that supports all of its features and adds some more.

- It uses the `getMany` method as the **query function** from the [`dataProvider`](/core/docs/data/data-provider) which is passed to `<Refine>`.

- It uses a query key to cache the data. The **query key** is generated from the provided properties. You can see the query key by using the TanStack Query devtools.

It is useful when you want to fetch multiple records from the API. It will return the data and some functions to control the query.

If your data provider does not have a `getMany` method, `useMany` will use the `getOne` method instead. This is not recommended, as it will make requests one by one for each id. It is better to implement the `getMany` method in the data provider.

## Usage

The `useMany` hook expects a `resource` and `ids` property, which will be passed to the `getMany` method from the `dataProvider` as a parameter.

When these properties are changed, the `useMany` hook will trigger a new request.

<BasicUsageLivePreview />

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/realtime/live-provider).

When the `useMany` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

## Properties

### resource <PropTag required />

This parameter will be passed to the `getMany` method from the `dataProvider` as a parameter. t is usually used as an API endpoint path but it all depends on how you handle the `resource` in the `getMany` method.

```tsx
useMany({
  resource: "categories",
});
```

> For more information, refer to the [creating a data provider tutorial &#8594](/core/docs/data/data-provider)

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### ids <PropTag required />

This prop will be passed to the `getMany` method from the `dataProvider` as a parameter. It is used to determine which records to fetch.

```tsx
useMany({
  ids: [1, 2, 3],
});
```

### dataProviderName

This prop allows you to specify which `dataProvider` if you have more than one. Just pass it like in the example:

```tsx
useMany({
  dataProviderName: "second-data-provider",
});
```

### queryOptions

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

```tsx
useMany({
  queryOptions: {
    retry: 3,
    enabled: false,
  },
});
```

> For more information, refer to the [`useQuery` documentation&#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

### meta

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

- Customizing the data provider methods for specific use cases.
- Generating GraphQL queries using plain JavaScript Objects (JSON).

In the following example, we pass the `headers` property in the `meta` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
import { stringify } from "query-string";

useMany({
  // highlight-start
  meta: {
    headers: { "x-meta-data": "true" },
  },
  // highlight-end
});

const myDataProvider = {
  //...
  getMany: async ({
    resource,
    ids,
    // highlight-next-line
    meta,
  }) => {
    // highlight-next-line
    const headers = meta?.headers ?? {};
    const url = `${apiUrl}/${resource}?${stringify({ id: ids })}`;

    //...
    //...

    // highlight-next-line
    const { data } = await httpClient.get(`${url}`, { headers });

    return {
      data,
    };
  },
  //...
};
```

> For more information, refer to the [`meta` section of the General Concepts documentation&#8594](/core/docs/guides-concepts/general-concepts/#meta-concept)

### successNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider) is required for this prop to work.

After data is fetched successfully, `useMany` can call `open` function from `NotificationProvider` to show a success notification. With this prop, you can customize the success notification.

```tsx
useMany({
  successNotification: (data, ids, resource) => {
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

After data fetching is failed, `useMany` will call the `open` function from `NotificationProvider` to show an error notification. With this prop, you can customize the error notification.

```tsx
useMany({
  errorNotification: (data, ids, resource) => {
    return {
      message: `Something went wrong when getting ${data.id}`,
      description: "Error",
      type: "error",
    };
  },
});
```

### liveMode

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

Determines whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.

```tsx
useMany({
  liveMode: "auto",
});
```

### onLiveEvent

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

The callback function is executed when new events from a subscription have arrived.

```tsx
useMany({
  onLiveEvent: (event) => {
    console.log(event);
  },
});
```

### liveParams

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

Params to pass to liveProvider's [subscribe](/core/docs/realtime/live-provider#subscribe) method.

### overtimeOptions

If you want loading overtime for the request, you can pass the `overtimeOptions` prop to the this hook. It is useful when you want to show a loading indicator when the request takes too long.
`interval` is the time interval in milliseconds. `onInterval` is the function that will be called on each interval.

Return `overtime` object from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useMany({
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

## Return Values

Returns an object with TanStack Query's `useQuery` return values.

> For more information, refer to the [ `useQuery` documentation &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

### Additional Values

#### overtime

`overtime` object is returned from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useMany();

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...
```

## API Reference

### Properties

<PropsTable module="@refinedev/core/useMany"
successNotification-default='`false`'
errorNotification-default='"Error (status code: `statusCode`)"'
/>

### Type Parameters

| Property     | Description                                                                                                                                                         | Type                       | Default                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError       | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TData        | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

### Return values

| Description                               | Type                                                                                                                   |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Result of the TanStack Query's `useQuery` | [`QueryObserverResult<{ data: TData[]; error: TError }>`](https://tanstack.com/query/v4/docs/react/reference/useQuery) |
| overtime                                  | `{ elapsedTime?: number }`                                                                                             |

[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
